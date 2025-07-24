/** @jsxImportSource @emotion/react */
import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { DraftRoundPhaseCardSelectionRule } from '@gamepark/all-star-draft/rules/DraftRoundPhaseCardSelectionRule'
import { usePlayerId, useRules } from '@gamepark/react-game'
import { SimultaneousRuleHeaderComponent } from '../components/headers/SimultaneousRuleHeaderComponent'

export const DraftRoundPhaseCardSelectionHeader = () => {
  const rules = useRules<AllStarDraftRules>()
  const activePlayers = rules?.activePlayers ?? []
  const player = usePlayerId<PlayerColor>()
  const rulesStep = rules?.rulesStep as DraftRoundPhaseCardSelectionRule | undefined
  if (rulesStep?.is2playersClashGame()) {
    const draftCardsMaterial = rulesStep.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot)
    if (player !== undefined) {
      if (activePlayers.includes(player)) {
        const playerDraftCardsCount = draftCardsMaterial.player(player).length
        if (playerDraftCardsCount !== 7 && playerDraftCardsCount % 2 === 1) {
          return <SimultaneousRuleHeaderComponent translationGroupKey="header.draft.give" />
        }
      } else {
        const opponent = rulesStep.game.players.find((p) => p !== player)!
        const opponentDraftCardsCount = draftCardsMaterial.player(opponent).length
        if (opponentDraftCardsCount !== 7 && opponentDraftCardsCount % 2 === 1) {
          return <SimultaneousRuleHeaderComponent translationGroupKey="header.draft.give" />
        }
      }
    } else {
      if (activePlayers.length > 1) {
        if (rulesStep.game.players.every((p) => draftCardsMaterial.player(p).length !== 7 && draftCardsMaterial.player(p).length % 2 === 1)) {
          return <SimultaneousRuleHeaderComponent translationGroupKey="header.draft.give" />
        } else if (
          rulesStep.game.players.some((p) => draftCardsMaterial.player(p).length !== 7 && draftCardsMaterial.player(p).length % 2 === 1) &&
          rulesStep.game.players.some((p) => draftCardsMaterial.player(p).length === 7 || draftCardsMaterial.player(p).length % 2 === 0)
        ) {
          return <SimultaneousRuleHeaderComponent translationGroupKey="header.draft.selectOrGive" />
        }
      } else if (activePlayers.length === 1) {
        const activePlayer = activePlayers[0]
        if (draftCardsMaterial.player(activePlayer).length !== 7 && draftCardsMaterial.player(activePlayer).length % 2 === 1) {
          return <SimultaneousRuleHeaderComponent translationGroupKey="header.draft.give" />
        }
      }
    }
  }
  return <SimultaneousRuleHeaderComponent translationGroupKey="header.draft.select" />
}
