/** @jsxImportSource @emotion/react */

import { useLegalMove, PlayMoveButton, useRules } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'
import { CustomMoveType } from '@gamepark/all-star-draft/material/CustomMoveType'
import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { Memorize } from '@gamepark/all-star-draft/Memorize'

export const DraftRoundPhaseTeamExchangeHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<AllStarDraftRules>()
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  return (
    <>
      <Trans defaults="header.draft.exchange" values={{ teamNumber: rules?.remind(Memorize.CurrentTeamNumber) }} />
      <PlayMoveButton move={pass}>{t('header.pass')}</PlayMoveButton>
    </>
  )
}
