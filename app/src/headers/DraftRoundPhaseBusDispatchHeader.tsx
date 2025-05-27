/** @jsxImportSource @emotion/react */

import { useLegalMove, PlayMoveButton } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { CustomMoveType } from '@gamepark/all-star-draft/material/CustomMoveType'

export const DraftRoundPhaseBusDispatchHeader = () => {
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  return (
    <>
      <Trans defaults="header.DraftRoundPhaseBusDispatch" />
      <PlayMoveButton move={pass}>Pass</PlayMoveButton>
    </> // Todo : Button as component when translation ready
  )
}
