/** @jsxImportSource @emotion/react */
import { ArenaCard } from '@gamepark/all-star-draft/material/ArenaCard'
import { BusToken, KnownBusTokenId } from '@gamepark/all-star-draft/material/BusToken'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialRotation } from '@gamepark/all-star-draft/material/MaterialRotation'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType, Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { getBusValueComponent } from '../util/valueComponents'

const getArenaNumberFromBusId = (busId: KnownBusTokenId) => {
  switch (busId.front) {
    case BusToken.Black1:
    case BusToken.Blue1:
    case BusToken.Green1:
    case BusToken.Purple1:
    case BusToken.Red1:
    case BusToken.Yellow1:
      return 1
    case BusToken.Black2:
    case BusToken.Blue2:
    case BusToken.Green2:
    case BusToken.Purple2:
    case BusToken.Red2:
    case BusToken.Yellow2:
      return 2
    case BusToken.Black3:
    case BusToken.Blue3:
    case BusToken.Green3:
    case BusToken.Purple3:
    case BusToken.Red3:
    case BusToken.Yellow3:
      return 3
  }
}

export const BusRevealComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({ move, context }) => {
  const { t } = useTranslation()
  if (!isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken)(move) || move.location.rotation !== MaterialRotation.FaceUp) {
    return <></>
  }
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const busId =
    move.reveal === undefined
      ? new Material<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken, gameContext.game.items[MaterialType.BusToken])
          .index(move.itemIndex)
          .getItem<KnownBusTokenId>()!.id
      : (move.reveal.id as KnownBusTokenId)
  const arenaNumber = getArenaNumberFromBusId(busId)
  const arena = new Material<PlayerColor, MaterialType, LocationType>(MaterialType.ArenaCard, gameContext.game.items[MaterialType.ArenaCard])
    .location(LocationType.CurrentArenasRowSpot)
    .location((l) => l.x === arenaNumber - 1)
    .getItem<ArenaCard>()!.id
  const playerName = usePlayerName(move.location.player)
  return (
    <Trans
      defaults="history.draftPhase.busReveal"
      values={{ name: playerName, teamNumber: move.location.id, arena: t(`arena.${ArenaCard[arena]}`), arenaNumber: arenaNumber }}
      components={{ sup: <sup></sup>, bus: getBusValueComponent(busId) }}
    />
  )
}
