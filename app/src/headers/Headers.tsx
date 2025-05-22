/** @jsxImportSource @emotion/react */
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { ComponentType } from 'react'
import { DraftRoundSetupDrawCardsHeader } from './DraftRoundSetupDrawCardsHeader'

export const Headers: Partial<Record<RuleId, ComponentType>> = {
  [RuleId.DraftRoundSetupDrawCards]: DraftRoundSetupDrawCardsHeader
}
