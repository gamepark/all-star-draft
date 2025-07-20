/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { ComponentType } from 'react'
import { SimultaneousRuleHeaderComponent } from '../components/headers/SimultaneousRuleHeaderComponent'
import { DraftRoundPhaseCardSelectionHeader } from './DraftRoundPhaseCardSelectionHeader'
import { DraftRoundPhaseClashCardSelectionForOpponentHeader } from './DraftRoundPhaseClashCardSelectionForOpponentHeader'
import { DraftRoundPhaseMatchScoreHeader } from './DraftRoundPhaseMatchScoreHeader'
import { DraftRoundPhaseOpenMarketCardSelectionHeader } from './DraftRoundPhaseOpenMarketCardSelectionHeader'
import { DraftRoundPhaseTeamCreationHeader } from './DraftRoundPhaseTeamCreationHeader'
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
  [RuleId.DraftRoundPhaseTeamCreation]: DraftRoundPhaseTeamCreationHeader,
  [RuleId.DraftRoundPhaseTeamReveal]: DraftRoundTeamRevealHeader,
  [RuleId.DraftRoundPhaseMatchScore]: DraftRoundPhaseMatchScoreHeader,
  [RuleId.PlayoffRoundSetupPhase]: PlayoffRoundSetupPhaseHeader,
  [RuleId.PlayoffRoundPhaseTeamReveal]: PlayoffRoundPhaseTeamRevealHeader,
  [RuleId.PlayoffRoundPhaseMainMatch]: PlayoffRoundPhaseMainMatchHeader,
  [RuleId.PlayoffSubstitutePlayers]: () => <SimultaneousRuleHeaderComponent translationGroupKey="header.playoff.substitute" pass />,
  [RuleId.PlayoffRoundPhaseTieMatch]: PlayoffRoundPhaseTieMatchHeader,
  [RuleId.PlayoffRoundPhaseScore]: PlayoffRoundPhaseScoreHeader,
  [RuleId.DraftRoundPhaseOpenMarketCardSelection]: DraftRoundPhaseOpenMarketCardSelectionHeader,
  [RuleId.DraftRoundPhaseClashCardSelectionForOpponent]: DraftRoundPhaseClashCardSelectionForOpponentHeader
}
