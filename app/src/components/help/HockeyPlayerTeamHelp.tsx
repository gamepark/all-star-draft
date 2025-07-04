import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { HockeyPlayerCard } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { getIrregularAttributeTranslationKey, getTeamStrength, getTeamStrengthAttributeTranslationKey } from '@gamepark/all-star-draft/material/TeamStrength'
import { LocationHelpProps, MaterialComponent, pointerCursorCss, usePlay, useRules } from '@gamepark/react-game'
import { MaterialMoveBuilder } from '@gamepark/rules-api'
import { sortBy } from 'lodash'
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />
}

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
          <Trans defaults={'help.hockeyPlayerTeam.strength'} components={components} values={{ strength: teamStrength.strength }} />
        </p>
        <p>
          <Trans
            defaults={'help.hockeyPlayerTeam.attribute'}
            components={components}
            values={{ attribute: getTeamStrengthAttributeTranslationKey(teamStrength, t).attributeKind }}
          />
        </p>
        <p>
          <Trans
            defaults={'help.hockeyPlayerTeam.value'}
            components={components}
            values={{ value: getTeamStrengthAttributeTranslationKey(teamStrength, t).attributeValue }}
          />
        </p>
        {teamStrength.irregularsAttributes && teamStrength.irregularsAttributes.length > 0 && (
          <p>
            <Trans
              defaults={'help.hockeyPlayerTeam.additionalAttribute'}
              components={components}
              values={{
                additionalAttribute: teamStrength.irregularsAttributes
                  .map((irregularAttribute) => getIrregularAttributeTranslationKey(irregularAttribute, t))
                  .join(', ')
              }}
            />
          </p>
        )}
      </div>
    </div>
  )
}
