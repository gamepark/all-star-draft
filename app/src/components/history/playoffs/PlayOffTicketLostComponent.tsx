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
import { playoffTicketTokenDescription } from '../../../material/PlayoffTicketTokenDescription'
import { CardValueLogComponent } from '../util/CardValueLogComponent'
import { TeamStrengthLogComponent } from '../util/TeamStrengthLogComponent'

const getTranslationKey = (isShootOut: boolean, isLastPlayOffTicket: boolean) => {
  if (isShootOut) {
    return isLastPlayOffTicket ? 'history.playOffs.lastPlayOffTicketRemovedShootOut' : 'history.playOffs.playOffsTicketRemovedShootOut'
  }
  return isLastPlayOffTicket ? 'history.playOffs.lastPlayOffTicketRemoved' : 'history.playOffs.playOffsTicketRemoved'
}

export const PlayOffTicketLostComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({ move, context }) => {
  if (!isDeleteItemType<PlayerColor, MaterialType, LocationType>(MaterialType.PlayoffTicketToken)(move)) {
    return <></>
  }
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const shootOutCardsMaterial = new Material<PlayerColor, MaterialType, LocationType>(
    MaterialType.HockeyPlayerCard,
    gameContext.game.items[MaterialType.HockeyPlayerCard]
  )
    .location(LocationType.PlayerHockeyPlayerTeamSpot)
    .locationId(3)
  const isShootOut = shootOutCardsMaterial.length > 0
  const playOffTicket = gameContext.game.items[MaterialType.PlayoffTicketToken]![move.itemIndex]
  const isLastPlayOffTicket =
    (gameContext.game.items[MaterialType.PlayoffTicketToken]?.filter((ticket) => ticket.location.player === playOffTicket.location.player).length ?? 0) === 1
  const playerName = usePlayerName(playOffTicket.location.player)
  const playerNumber = gameContext.game.players.length
  const hockeyPlayerTeamsMaterial = new Material(MaterialType.HockeyPlayerCard, gameContext.game.items[MaterialType.HockeyPlayerCard]).location(
    LocationType.PlayerHockeyPlayerTeamSpot
  )
  const team = (
    isShootOut ? hockeyPlayerTeamsMaterial.locationId(3).player(playOffTicket.location.player) : hockeyPlayerTeamsMaterial.player(playOffTicket.location.player)
  )
    .getItems<HockeyPlayerCard>()
    .map((card) => card.id)
  const teamStrength = getTeamStrength(team, playerNumber)
  return (
    <Trans
      i18nKey={getTranslationKey(isShootOut, isLastPlayOffTicket)}
      values={{ name: playerName }}
      components={{
        ticket: <Picture src={playoffTicketTokenDescription.image} style={{ height: '2.5em' }} />,
        strength: isShootOut ? <CardValueLogComponent cardId={team[0]} /> : <TeamStrengthLogComponent teamStrength={teamStrength} playerNumber={playerNumber} />
      }}
    />
  )
}
