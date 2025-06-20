import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { HockeyPlayerCard } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { getIrregularAttributeTranslationKey, getTeamStrength, getTeamStrengthAttributeTranslationKey } from '@gamepark/all-star-draft/material/TeamStrength'
import { LocationHelpProps, MaterialComponent, pointerCursorCss, usePlay, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { sortBy } from 'lodash'
import { useTranslation } from 'react-i18next'

export const HockeyPlayerTeamHelp = ({ location }: LocationHelpProps) => {
  const { t } = useTranslation()
  const rules = useRules<AllStarDraftRules>()
  const cards = sortBy(
    rules?.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).locationId(location.id).player(location.player).entries,
    (card) => card[1].id
  )
  const play = usePlay()
  const team: HockeyPlayerCard[] = cards.filter((card) => card[1].id !== undefined).map((card) => card[1].id as HockeyPlayerCard)
  const teamStrength = getTeamStrength(team, rules?.game.players.length ?? 0)
  return (
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
        {cards.map(([index, card], i) => (
          <li
            key={index}
            style={{ marginLeft: i === 0 ? 0 : '1.5em' }} // ajuster le chevauchement ici
          >
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
        <h2 style={{ padding: '0em 2em' }}>{t('help.hockeyPlayerTeam.title', { teamNumber: location.id ?? 0 })}</h2>
        <p>
          <span style={{ fontWeight: 'bold' }}>{t('help.hockeyPlayerTeam.strength')}</span>
          {' ' + teamStrength.strength}
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>{t('help.hockeyPlayerTeam.attribute')}</span>
          {' ' + getTeamStrengthAttributeTranslationKey(teamStrength, t).attributeKind}
        </p>
        <p>
          <span style={{ fontWeight: 'bold' }}>{t('help.hockeyPlayerTeam.value')}</span>
          {' ' + getTeamStrengthAttributeTranslationKey(teamStrength, t).attributeValue}
        </p>
        {teamStrength.irregularsAttributes && teamStrength.irregularsAttributes.length > 0 && (
          <p>
            <span style={{ fontWeight: 'bold' }}>{t('help.hockeyPlayerTeam.additionalAttribute')}</span>
            {teamStrength.irregularsAttributes.map((irregularAttribute, index) => (
              <>
                {index > 0 ? ', ' : ' '}
                {getIrregularAttributeTranslationKey(irregularAttribute, t)}
              </>
            ))}
          </p>
        )}
      </div>
    </div>
  )
}
