/** @jsxImportSource @emotion/react */
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
import { Fragment } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { MedalIconComponent } from '../symbols/MedalIconComponent'
import { TeamStrengthIconComponent } from '../symbols/TeamStrengthIconComponent'
import { getSpeciesValueComponent, getSymbolValueComponent } from '../util/valueComponents'
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
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center' }}>
      <h2 style={{ padding: '0em 2em' }}>{t('help.hockeyPlayerTeam.title', { teamNumber: location.id ?? 0, name: playerName })}</h2>
      <div style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '100%', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'row', width: '40%', overflow: 'hidden', margin: '1em', gap: '1.3em', minWidth: '9.5em' }}>
          {cards.map((card, index) => (
            <div key={`player-${location.player}-team-${location.id}-list-item-${index}`} style={{ minWidth: '0em', width: '0em' }}>
              <MaterialComponent
                key={`player-${location.player}-team-${location.id}-card-item-${index}`}
                type={MaterialType.HockeyPlayerCard}
                itemId={card.id}
                css={pointerCursorCss}
                style={{ height: '9em', transform: card.id === undefined ? 'rotateY(180deg)' : '' }}
                onClick={() => play(MaterialMoveBuilder.displayMaterialHelp(MaterialType.HockeyPlayerCard, card, index), { local: true })}
              />
            </div>
          ))}
        </div>
        <div>
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
                        <Fragment key={`irregularAttribute-container-${index}`}>
                          <Picture
                            key={`irregularAttribute-picture-${index}`}
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
                        </Fragment>
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
    </div>
  ) : (
    <h2 style={{ padding: '0em 2em' }}>{t('help.hockeyPlayerTeam.title', { teamNumber: location.id ?? 0, name: playerName })}</h2>
  )
}
