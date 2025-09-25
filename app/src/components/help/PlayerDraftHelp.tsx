import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { LocationHelpProps, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />
}

export const PlayerDraftHelp = ({ location }: LocationHelpProps) => {
  const { t } = useTranslation()
  const rules = useRules<AllStarDraftRules>()
  const cardsNumber = rules?.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot).player(location.player).getQuantity()
  return (
    <div>
      <h2 style={{ padding: '0em 2em' }}>{t('help.playerDraft.title', { playerName: usePlayerName(location.player) })}</h2>
      <p>
        <Trans i18nKey={'help.playerDraft.cards'} components={components} values={{ cardsNumber }} />
      </p>
    </div>
  )
}
