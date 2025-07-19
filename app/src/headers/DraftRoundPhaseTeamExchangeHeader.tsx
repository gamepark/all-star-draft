/** @jsxImportSource @emotion/react */
// import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
// import { Memorize } from '@gamepark/all-star-draft/Memorize'
// import { useRules } from '@gamepark/react-game'
// import { uniq } from 'lodash'
import { SimultaneousRuleHeaderComponent } from '../components/headers/SimultaneousRuleHeaderComponent'

export const DraftRoundPhaseTeamExchangeHeader = () => {
  // const rules = useRules<AllStarDraftRules>()
  // const activePlayers = rules?.game.rule?.players ?? []
  const teamNumber = 1 //TODO adjust according to round number
  return <SimultaneousRuleHeaderComponent translationGroupKey="header.draft.exchange" interpolations={{ teamNumber: teamNumber }} pass />
}
