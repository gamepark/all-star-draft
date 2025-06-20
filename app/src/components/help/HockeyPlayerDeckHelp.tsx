import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { LocationHelpProps, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const HockeyPlayerDeckHelp = ({ location }: LocationHelpProps) => {
  const { t } = useTranslation()
  const rules = useRules<AllStarDraftRules>()
  const cardsLeft = rules?.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDeckSpot).getQuantity()
  return (
    <div>
      <h2 style={{ padding: '0em 2em' }}>{t('help.hockeyPlayerDeck.title', { teamNumber: location.id ?? 0 })}</h2>
      <p>
        <span style={{ fontWeight: 'bold' }}>{t('help.hockeyPlayerDeck.cardsLefts')}</span>
        {' ' + cardsLeft}
      </p>
    </div>
  )
}
