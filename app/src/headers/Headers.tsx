/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { ComponentType } from 'react'
import { SimultaneousRuleHeaderComponent } from '../components/headers/SimultaneousRuleHeaderComponent'
import { DraftRoundPhaseBusDispatchHeader } from './DraftRoundPhaseBusDispatchHeader'
import { DraftRoundPhaseCardSelectionHeader } from './DraftRoundPhaseCardSelectionHeader'
import { DraftRoundPhaseClashCardSelectionForOpponentHeader } from './DraftRoundPhaseClashCardSelectionForOpponentHeader'
import { DraftRoundPhaseDiscardCardOverflowHeader } from './DraftRoundPhaseDiscardCardOverflowHeader'
import { DraftRoundPhaseMatchMoveToStadiumHeader } from './DraftRoundPhaseMatchMoveToStadiumHeader'
import { DraftRoundPhaseMatchScoreHeader } from './DraftRoundPhaseMatchScoreHeader'
import { DraftRoundPhaseOpenMarketCardSelectionHeader } from './DraftRoundPhaseOpenMarketCardSelectionHeader'
import { DraftRoundPhaseTeamCreationHeader } from './DraftRoundPhaseTeamCreationHeader'
import { DraftRoundPhaseTeamExchangeHeader } from './DraftRoundPhaseTeamExchangeHeader'
import { DraftRoundSetupDrawCardsHeader } from './DraftRoundSetupDrawCardsHeader'
import { DraftRoundTeamRevealHeader } from './DraftRoundTeamRevealHeader'
import { PlayoffRoundPhaseMainMatchHeader } from './PlayoffRoundPhaseMainMatchHeader'
import { PlayoffRoundPhaseScoreHeader } from './PlayoffRoundPhaseScoreHeader'
import { PlayoffRoundPhaseTeamRevealHeader } from './PlayoffRoundPhaseTeamRevealHeader'
import { PlayoffRoundPhaseTieMatchHeader } from './PlayoffRoundPhaseTieMatchHeader'
import { PlayoffRoundSetupPhaseHeader } from './PlayoffRoundSetupPhaseHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.DraftRoundSetupDrawCards]: DraftRoundSetupDrawCardsHeader,
  [RuleId.DraftRoundPhaseCardSelection]: DraftRoundPhaseCardSelectionHeader,
  [RuleId.DraftRoundPhaseTeamExchange]: DraftRoundPhaseTeamExchangeHeader,
  [RuleId.DraftRoundPhaseTeamCreation]: DraftRoundPhaseTeamCreationHeader,
  [RuleId.DraftRoundPhaseBusDispatch]: DraftRoundPhaseBusDispatchHeader,
  [RuleId.DraftRoundPhaseTeamReveal]: DraftRoundTeamRevealHeader,
  [RuleId.DraftRoundPhaseMatchScore]: DraftRoundPhaseMatchScoreHeader,
  [RuleId.DraftRoundPhaseMatchMoveToStadium]: DraftRoundPhaseMatchMoveToStadiumHeader,
  [RuleId.PlayoffRoundSetupPhase]: PlayoffRoundSetupPhaseHeader,
  [RuleId.PlayoffRoundPhaseTeamReveal]: PlayoffRoundPhaseTeamRevealHeader,
  [RuleId.PlayoffRoundPhaseMainMatch]: PlayoffRoundPhaseMainMatchHeader,
  [RuleId.PlayoffSubstitutePlayers]: () => <SimultaneousRuleHeaderComponent translationGroupKey="header.playoff.substitute" pass />,
  [RuleId.PlayoffRoundPhaseTieMatch]: PlayoffRoundPhaseTieMatchHeader,
  [RuleId.PlayoffRoundPhaseScore]: PlayoffRoundPhaseScoreHeader,
  [RuleId.DraftRoundPhaseOpenMarketCardSelection]: DraftRoundPhaseOpenMarketCardSelectionHeader,
  [RuleId.DraftRoundPhaseDiscardCardOverflow]: DraftRoundPhaseDiscardCardOverflowHeader,
  [RuleId.DraftRoundPhaseClashCardSelectionForOpponent]: DraftRoundPhaseClashCardSelectionForOpponentHeader
}
