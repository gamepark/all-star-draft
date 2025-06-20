import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { LocationHelpProps, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'

export const ArenaDeckHelp = ({ location }: LocationHelpProps) => {
  const { t } = useTranslation()
  const rules = useRules<AllStarDraftRules>()
  const arenasLeft = rules?.material(MaterialType.ArenaCard).location(LocationType.ArenaDeckSpot).getQuantity()
  return (
    <div>
      <h2 style={{ padding: '0em 2em' }}>{t('help.arenaDeck.title', { teamNumber: location.id ?? 0 })}</h2>
      <p>
        <span style={{ fontWeight: 'bold' }}>{t('help.arenaDeck.cardsLefts')}</span>
        {' ' + arenasLeft}
      </p>
    </div>
  )
}
