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

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.DraftRoundSetupDrawCards]: DraftRoundSetupDrawCardsHeader,
  [RuleId.DraftRoundPhaseCardSelection]: DraftRoundPhaseCardSelectionHeader,
  [RuleId.DraftRoundPhaseTeamExchange]: DraftRoundPhaseTeamExchangeHeader,
  [RuleId.DraftRoundPhaseTeamCreation]: DraftRoundPhaseTeamCreationHeader,
  [RuleId.DraftRoundPhaseBusDispatch]: DraftRoundPhaseBusDispatchHeader,
  [RuleId.DraftRoundPhaseTeamReveal]: DraftRoundTeamRevealHeader,
  [RuleId.DraftRoundPhaseMatchScore]: DraftRoundPhaseMatchScoreHeader
}
