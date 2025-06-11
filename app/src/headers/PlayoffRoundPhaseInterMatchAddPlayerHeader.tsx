/** @jsxImportSource @emotion/react */

import { CustomMoveType } from '@gamepark/all-star-draft/material/CustomMoveType'
import { PlayMoveButton, useLegalMove } from '@gamepark/react-game'
import { isCustomMoveType } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'

export const PlayoffRoundPhaseInterMatchAddPlayerHeader = () => {
  const pass = useLegalMove(isCustomMoveType(CustomMoveType.Pass))
  return (
    <>
      <Trans defaults="header.PlayoffRoundPhaseInterMatchAddPlayer" />
      <PlayMoveButton move={pass}>Pass</PlayMoveButton>
    </> // Todo : Button as component when translation ready
  )
}
