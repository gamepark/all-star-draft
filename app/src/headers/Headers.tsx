/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { ComponentType } from 'react'
import { DraftRoundSetupDrawCardsHeader } from './DraftRoundSetupDrawCardsHeader'
import { DraftRoundPhaseCardSelectionHeader } from './DraftRoundPhaseCardSelectionHeader'
import { DraftRoundPhaseTeamExchangeHeader } from './DraftRoundPhaseTeamExchangeHeader'
import { DraftRoundPhaseTeamCreationHeader } from './DraftRoundPhaseTeamCreationHeader'
import { DraftRoundPhaseBusDispatchHeader } from './DraftRoundPhaseBusDispatchHeader'
import { DraftRoundTeamRevealHeader } from './DraftRoundTeamRevealHeader'
import { DraftRoundPhaseMatchScoreHeader } from './DraftRoundPhaseMatchScoreHeader'
import { DraftRoundPhaseMatchMoveToStadiumHeader } from './DraftRoundPhaseMatchMoveToStadiumHeader'
import { PlayoffRoundSetupPhaseHeader } from './PlayoffRoundSetupPhaseHeader'
import { PlayoffRoundPhaseMainMatchHeader } from './PlayoffRoundPhaseMainMatchHeader'
import { PlayoffRoundPhaseTeamRevealHeader } from './PlayoffRoundPhaseTeamRevealHeader'
import { PlayoffRoundPhaseScoreHeader } from './PlayoffRoundPhaseScoreHeader'
import { PlayoffRoundPhaseTieMatchHeader } from './PlayoffRoundPhaseTieMatchHeader'
import { PlayoffRoundPhaseInterMatchAddPlayerHeader } from './PlayoffRoundPhaseInterMatchAddPlayerHeader'
import { PlayoffRoundPhaseInterMatchDiscardPlayerHeader } from './PlayoffRoundPhaseInterMatchDiscardPlayerHeader'

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
  [RuleId.PlayoffRoundPhaseInterMatchAddPlayers]: PlayoffRoundPhaseInterMatchAddPlayerHeader,
  [RuleId.PlayoffRoundPhaseInterMatchDiscardPlayers]: PlayoffRoundPhaseInterMatchDiscardPlayerHeader,
  [RuleId.PlayoffRoundPhaseTieMatch]: PlayoffRoundPhaseTieMatchHeader,
  [RuleId.PlayoffRoundPhaseScore]: PlayoffRoundPhaseScoreHeader
}
