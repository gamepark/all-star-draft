/** @jsxImportSource @emotion/react */

import { CustomMoveType } from '@gamepark/all-star-draft/material/CustomMoveType'
import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans, useTranslation } from 'react-i18next'

export const PlayoffRoundPhaseInterMatchAddPlayerHeader = () => {
  const { t } = useTranslation()
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  return (
    <>
      <Trans defaults="header.playoff.addPlayer" />
      <PlayMoveButton move={pass}>{t('header.pass')}</PlayMoveButton>
    </>
  )
}
