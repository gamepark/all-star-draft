import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { HockeyPlayerCard } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import {
  AttributeKind,
  getAttributeKindPriority,
  getIrregularAttributeTranslationKey,
  getTeamStrength,
  getTeamStrengthAttributeTranslationKey,
  IrregularAttribute,
  TeamStrength
} from '@gamepark/all-star-draft/material/TeamStrength'
import { LocationHelpProps, MaterialComponent, Picture, pointerCursorCss, usePlay, usePlayerName, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { sortBy } from 'lodash'
import { Trans, useTranslation } from 'react-i18next'
import { MedalIconComponent } from '../symbols/MedalIconComponent'
import { TeamStrengthIconComponent } from '../symbols/TeamStrengthIconComponent'
import { getSpeciesValueComponent, getSymbolValueComponent } from './util/valueComponents'
import allGear from '../../images/Symbols/TeamStrengthAllGear.png'
import straight from '../../images/Symbols/TeamStrengthStraight.png'
import threeAndPair from '../../images/Symbols/TeamStrengthThreeAndPair.png'

const components = {
  bold: <strong />
}

const getValueComponent = (teamStrength: TeamStrength) => {
  switch (teamStrength.attribute.kind) {
    case AttributeKind.Number:
      return { valueComponent: undefined }
    case AttributeKind.Species:
      return { valueComponent: getSpeciesValueComponent(teamStrength.attribute.value) }
    case AttributeKind.Symbol:
      return { valueComponent: getSymbolValueComponent(teamStrength.attribute.value) }
  }
}
export const HockeyPlayerTeamHelp = ({ location }: LocationHelpProps) => {
  const { t } = useTranslation()
  const rules = useRules<AllStarDraftRules>()
  const locationCards = rules
    ?.material(MaterialType.HockeyPlayerCard)
    .location(LocationType.PlayerHockeyPlayerTeamSpot)
    .locationId(location.id)
    .player(location.player)
    .getItems<HockeyPlayerCard | undefined>()
  const cards = sortBy(locationCards, (card) => card.id)
  const numberOfPlayers = rules?.players.length ?? 2
  const play = usePlay()
  const playerName = usePlayerName(location.player)
  const team: HockeyPlayerCard[] = locationCards?.filter((card) => card.id !== undefined).map((card) => card.id!) ?? []
  const teamStrength = getTeamStrength(team, rules?.game.players.length ?? 0)
  const valueComponent = teamStrength.attribute.kind === AttributeKind.Number ? undefined : getValueComponent(teamStrength)
  return locationCards?.some((card) => card.id !== undefined) ? (
    <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', overflow: 'hidden' }}>
      <ol
        style={{
          display: 'flex',
          listStyle: 'none',
          width: `${4 + (cards.length - 1) * 2}em`,
          fontSize: '2em',
          padding: 0,
          margin: 0
        }}
      >
        {cards.map((card, index) => (
          <li key={index} style={{ marginLeft: index === 0 ? 0 : '1.5em' }}>
            <MaterialComponent
              type={MaterialType.HockeyPlayerCard}
              itemId={card.id}
              css={pointerCursorCss}
              style={{ height: '9em' }}
              onClick={() => play(MaterialMoveBuilder.displayMaterialHelp(MaterialType.HockeyPlayerCard, card, index), { local: true })}
            />
          </li>
        ))}
      </ol>
      <div>
        <h2 style={{ padding: '0em 2em' }}>{t('help.hockeyPlayerTeam.title', { teamNumber: location.id ?? 0, name: playerName })}</h2>
        <p>
          <Trans
            defaults={'help.hockeyPlayerTeam.strength'}
            components={{ ...components, strengthSymbol: <TeamStrengthIconComponent strength={teamStrength.strength} /> }}
            values={{ strength: teamStrength.strength }}
          />
        </p>
        <p>
          <Trans
            defaults={'help.hockeyPlayerTeam.attribute'}
            components={{
              ...components,
              medalIcon: <MedalIconComponent medalNumber={getAttributeKindPriority(numberOfPlayers).reverse().indexOf(teamStrength.attribute.kind) + 1} />
            }}
            values={{ attribute: getTeamStrengthAttributeTranslationKey(teamStrength, t).attributeKind }}
          />
        </p>
        <p>
          <Trans
            defaults={'help.hockeyPlayerTeam.value'}
            components={valueComponent === undefined ? components : { ...components, ...valueComponent }}
            values={{ value: getTeamStrengthAttributeTranslationKey(teamStrength, t).attributeValue }}
          />
        </p>
        {teamStrength.irregularsAttributes !== undefined && teamStrength.irregularsAttributes.length > 0 && (
          <p style={{ verticalAlign: 'middle' }}>
            <Trans
              defaults={'help.hockeyPlayerTeam.additionalAttribute'}
              components={{
                ...components,
                additionalAttributeListComponent: (
                  <>
                    {teamStrength.irregularsAttributes.map((irregularAttribute, index) => (
                      <>
                        <Picture
                          src={
                            irregularAttribute === IrregularAttribute.Straight
                              ? straight
                              : irregularAttribute === IrregularAttribute.FullHouse
                                ? threeAndPair
                                : allGear
                          }
                          height={50}
                          style={{ verticalAlign: 'middle' }}
                        />
                        {getIrregularAttributeTranslationKey(irregularAttribute, t) + (index !== teamStrength.irregularsAttributes!.length - 1 ? ', ' : '')}
                      </>
                    ))}
                  </>
                )
              }}
              values={{
                additionalAttributesCount: teamStrength.irregularsAttributes.length
              }}
            />
          </p>
        )}
      </div>
    </div>
  ) : (
    <h2 style={{ padding: '0em 2em' }}>{t('help.hockeyPlayerTeam.title', { teamNumber: location.id ?? 0, name: playerName })}</h2>
  )
}
