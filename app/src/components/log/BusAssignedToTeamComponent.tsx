/** @jsxImportSource @emotion/react */
import { BusTokenId } from '@gamepark/all-star-draft/material/BusToken'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType, Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { getBusValueComponent } from '../util/valueComponents'

export const BusAssignedToTeamComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({ move, context }) => {
  if (!isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken)(move) || move.location.type !== LocationType.PlayerBusTokenTeamSpot) {
    return <></>
  }
  const teamNumber = move.location.id as number
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const movedBus = new Material<PlayerColor, MaterialType, LocationType>(
    MaterialType.BusToken,
    gameContext.game.items[MaterialType.BusToken]
  ).getItem<BusTokenId>(move.itemIndex)
  const playerName = usePlayerName(move.location.player)
  return (
    <Trans
      defaults="history.draftPhase.busAssignedToTeam"
      values={{ name: playerName, teamNumber: teamNumber }}
      components={{ sup: <sup></sup>, bus: getBusValueComponent(movedBus.id) }}
    />
  )
}
