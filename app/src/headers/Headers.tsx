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
import { PlayoffRoundPhaseInterMatchHeader } from './PlayoffRoundPhaseInterMatchHeader'
import { PlayoffRoundPhaseMatchScoreHeader } from './PlayoffRoundPhaseMatchScoreHeader'
import { PlayoffRoundPhaseTeamRevealHeader } from './PlayoffRoundPhaseTeamRevealHeader'

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
  [RuleId.PlayoffRoundPhaseMatchScore]: PlayoffRoundPhaseMatchScoreHeader,
  [RuleId.PlayoffRoundPhaseInterMatch]: PlayoffRoundPhaseInterMatchHeader
}
