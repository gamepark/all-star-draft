/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { ComponentType } from 'react'
import { DraftRoundSetupDrawCardsHeader } from './DraftRoundSetupDrawCardsHeader'
import { DraftRoundPhaseCardSelectionHeader } from './DraftRoundPhaseCardSelectionHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.DraftRoundSetupDrawCards]: DraftRoundSetupDrawCardsHeader,
  [RuleId.DraftRoundPhaseCardSelection]: DraftRoundPhaseCardSelectionHeader
}
