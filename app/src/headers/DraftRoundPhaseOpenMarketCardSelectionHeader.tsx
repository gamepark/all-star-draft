/** @jsxImportSource @emotion/react */
import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { Trans } from 'react-i18next'

export const DraftRoundPhaseOpenMarketCardSelectionHeader = () => {
  const me = usePlayerId<PlayerColor>()
  const rules = useRules<AllStarDraftRules>()!
  const activePlayer = rules.activePlayer
  const name = usePlayerName(activePlayer)
  if (me === activePlayer) {
    return <Trans defaults={`header.draft.select.you`} />
  } else {
    return <Trans defaults={`header.draft.select.player`} values={{ name }} />
  }
}
