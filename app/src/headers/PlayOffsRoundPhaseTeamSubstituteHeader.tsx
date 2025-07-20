/** @jsxImportSource @emotion/react */
import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialRotation } from '@gamepark/all-star-draft/material/MaterialRotation'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { useLegalMoves, usePlayerId, useRules } from '@gamepark/react-game'
import { isMoveItemType, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { SimultaneousRuleHeaderComponent } from '../components/headers/SimultaneousRuleHeaderComponent'

export const PlayOffsRoundPhaseTeamSubstituteHeader: FC = () => {
  const rules = useRules<AllStarDraftRules>()
  const activePlayer = usePlayerId<PlayerColor>()
  const moves = useLegalMoves<MaterialMove<PlayerColor, MaterialType, LocationType>>()
  if (activePlayer !== undefined) {
    if (moves.every((move) => isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) && move.location.x === undefined)) {
      return <SimultaneousRuleHeaderComponent translationGroupKey="header.playoff.assembleTeam" />
    } else {
      return <SimultaneousRuleHeaderComponent translationGroupKey="header.playoff.substitute" pass />
    }
  }
  if (
    (rules
      ?.material(MaterialType.HockeyPlayerCard)
      .location(LocationType.PlayerHockeyPlayerTeamSpot)
      .locationId(2)
      .rotation((r) => r !== MaterialRotation.FaceDown).length ?? 0) > 0
  ) {
    return <SimultaneousRuleHeaderComponent translationGroupKey="header.playoff.substitue" />
  } else {
    return <SimultaneousRuleHeaderComponent translationGroupKey="header.playoff.assembleTeam" />
  }
}
