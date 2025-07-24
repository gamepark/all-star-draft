/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { ComponentType } from 'react'
import { DraftRoundPhaseCardSelectionHeader } from './DraftRoundPhaseCardSelectionHeader'
import { DraftRoundPhaseMatchScoreHeader } from './DraftRoundPhaseMatchScoreHeader'
import { DraftRoundPhaseOpenMarketCardSelectionHeader } from './DraftRoundPhaseOpenMarketCardSelectionHeader'
import { DraftRoundPhaseTeamCreationHeader } from './DraftRoundPhaseTeamCreationHeader'
import { DraftRoundSetupDrawCardsHeader } from './DraftRoundSetupDrawCardsHeader'
import { DraftRoundTeamRevealHeader } from './DraftRoundTeamRevealHeader'
import { PlayOffsRoundPhaseMainMatchHeader } from './PlayOffsRoundPhaseMainMatchHeader'
import { PlayOffsRoundPhaseScoreHeader } from './PlayOffsRoundPhaseScoreHeader'
import { PlayOffsRoundPhaseTeamRevealHeader } from './PlayOffsRoundPhaseTeamRevealHeader'
import { PlayOffsRoundPhaseTieMatchHeader } from './PlayOffsRoundPhaseTieMatchHeader'
import { PlayOffsRoundSetupPhaseHeader } from './PlayOffsRoundSetupPhaseHeader'
import { PlayOffsRoundPhaseTeamSubstituteHeader } from './PlayOffsRoundPhaseTeamSubstituteHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.DraftRoundSetupDrawCards]: DraftRoundSetupDrawCardsHeader,
  [RuleId.DraftRoundPhaseCardSelection]: DraftRoundPhaseCardSelectionHeader,
  [RuleId.DraftRoundPhaseTeamCreation]: DraftRoundPhaseTeamCreationHeader,
  [RuleId.DraftRoundPhaseTeamReveal]: DraftRoundTeamRevealHeader,
  [RuleId.DraftRoundPhaseMatchScore]: DraftRoundPhaseMatchScoreHeader,
  [RuleId.PlayoffRoundSetupPhase]: PlayOffsRoundSetupPhaseHeader,
  [RuleId.PlayoffRoundPhaseTeamReveal]: PlayOffsRoundPhaseTeamRevealHeader,
  [RuleId.PlayoffRoundPhaseMainMatch]: PlayOffsRoundPhaseMainMatchHeader,
  [RuleId.PlayoffSubstitutePlayers]: PlayOffsRoundPhaseTeamSubstituteHeader,
  [RuleId.PlayoffRoundPhaseTieMatch]: PlayOffsRoundPhaseTieMatchHeader,
  [RuleId.PlayoffRoundPhaseScore]: PlayOffsRoundPhaseScoreHeader,
  [RuleId.DraftRoundPhaseOpenMarketCardSelection]: DraftRoundPhaseOpenMarketCardSelectionHeader
}
