/** @jsxImportSource @emotion/react */
import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { LocationHelpProps, useRules } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />
}

export const HockeyPlayerDeckHelp = ({ location }: LocationHelpProps) => {
  const { t } = useTranslation()
  const rules = useRules<AllStarDraftRules>()
  const cardsLeft = rules?.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDeckSpot).getQuantity()
  return (
    <div>
      <h2 style={{ padding: '0em 2em' }}>{t('help.hockeyPlayerDeck.title', { teamNumber: location.id ?? 0 })}</h2>
      <p>
        <Trans defaults={'help.hockeyPlayerDeck.cardsLefts'} components={components} values={{ cardsLeft }} />
      </p>
    </div>
  )
}
