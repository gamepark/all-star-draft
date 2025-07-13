/** @jsxImportSource @emotion/react */
import { HockeyPlayerCard } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { CardValueLogComponent } from './CardValueLogComponent'

export const PlayerReceivedCardComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({ move, context }) => {
  if (!isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)) {
    return <></>
  }
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const receivedCardId = move.reveal!.id as HockeyPlayerCard
  const playerName = usePlayerName(move.location.player)
  const givingPlayer = gameContext.game.players.find((player) => player !== move.location.player)
  const givingPlayerName = usePlayerName(givingPlayer)
  return (
    <Trans
      defaults="history.draftPhase.cardReceived"
      values={{ name: playerName, givingPlayerName: givingPlayerName }}
      components={{ card: <CardValueLogComponent cardId={receivedCardId} /> }}
    />
  )
}
