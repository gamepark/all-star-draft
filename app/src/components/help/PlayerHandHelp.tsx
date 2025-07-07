import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { LocationHelpProps, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'

const components = {
  bold: <strong />
}

export const PlayerHandHelp = ({ location }: LocationHelpProps) => {
  const { t } = useTranslation()
  const rules = useRules<AllStarDraftRules>()
  const cardsNumber = rules?.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerHandSpot).player(location.player).getQuantity()
  return (
    <div>
      <h2 style={{ padding: '0em 2em' }}>{t('help.playerHand.title', { playerName: usePlayerName(location.player) })}</h2>
      <p>
        <Trans defaults={'help.playerHand.cards'} components={components} values={{ cardsNumber }} />
      </p>
    </div>
  )
}
