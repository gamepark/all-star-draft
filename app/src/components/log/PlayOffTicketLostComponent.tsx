/** @jsxImportSource @emotion/react */
import { HockeyPlayerCard } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { getTeamStrength } from '@gamepark/all-star-draft/material/TeamStrength'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps, Picture, usePlayerName } from '@gamepark/react-game'
import { isDeleteItemType, Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { playoffTicketTokenDescription } from '../../material/PlayoffTicketTokenDescription'
import { TeamStrengthLogComponent } from './TeamStrengthLogComponent'

export const PlayOffTicketLostComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({ move, context }) => {
  if (!isDeleteItemType<PlayerColor, MaterialType, LocationType>(MaterialType.PlayoffTicketToken)(move)) {
    return <></>
  }
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const playOffTicket = gameContext.game.items[MaterialType.PlayoffTicketToken]![move.itemIndex]
  const isLastPlayOffTicket =
    (gameContext.game.items[MaterialType.PlayoffTicketToken]?.filter((ticket) => ticket.location.player === playOffTicket.location.player).length ?? 0) === 1
  const playerName = usePlayerName(playOffTicket.location.player)
  const playerNumber = gameContext.game.players.length
  const team = new Material(MaterialType.HockeyPlayerCard, gameContext.game.items[MaterialType.HockeyPlayerCard])
    .location(LocationType.PlayerHockeyPlayerTeamSpot)
    .player(playOffTicket.location.player)
    .getItems<HockeyPlayerCard>()
    .map((card) => card.id)
  const teamStrength = getTeamStrength(team, playerNumber)
  return (
    <Trans
      defaults={isLastPlayOffTicket ? 'history.playOffs.lastPlayOffTicketRemoved' : 'history.playOffs.playOffsTicketRemoved'}
      values={{ name: playerName }}
      components={{
        ticket: <Picture src={playoffTicketTokenDescription.image} height={50} />,
        strength: <TeamStrengthLogComponent teamStrength={teamStrength} playerNumber={playerNumber} />
      }}
    />
  )
}
