/** @jsxImportSource @emotion/react */
import { HockeyPlayerCard } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { playoffFanPoint } from '@gamepark/all-star-draft/material/PlayoffPointCard'
import { getTeamStrength } from '@gamepark/all-star-draft/material/TeamStrength'
import { Memorize } from '@gamepark/all-star-draft/Memorize'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps, Picture, usePlayerName } from '@gamepark/react-game'
import { GameMemory, isDeleteItemTypeAtOnce, Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { playoffTicketTokenDescription } from '../../material/PlayoffTicketTokenDescription'
import { SupportersIconComponent } from '../symbols/SupportersIconComponent'
import { CardValueLogComponent } from './CardValueLogComponent'
import { TeamStrengthLogComponent } from './TeamStrengthLogComponent'

const getTranslationKey = (isShootOut: boolean, playerCount: number) => {
  if (isShootOut) {
    return playerCount > 3 ? 'history.playOffsPhase.playerEliminatedShootOut' : 'history.playOffsPhase.playerEliminatedShootOutNoTicket'
  }
  return playerCount > 3 ? 'history.playOffsPhase.playerEliminated' : 'history.playOffsPhase.playerEliminatedNoTicket'
}

export const PlayerEliminatedComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({ move, context }) => {
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  if (
    !isDeleteItemTypeAtOnce<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) ||
    gameContext.game.items[MaterialType.HockeyPlayerCard]![move.indexes[0]].location.id !== 2
  ) {
    return <></>
  }
  const player = gameContext.game.items[MaterialType.HockeyPlayerCard]![move.indexes[0]].location.player!
  const playerNumber = gameContext.game.players.length
  const shootOutCardsMaterial = new Material<PlayerColor, MaterialType, LocationType>(
    MaterialType.HockeyPlayerCard,
    gameContext.game.items[MaterialType.HockeyPlayerCard]
  )
    .location(LocationType.PlayerHockeyPlayerTeamSpot)
    .locationId(3)
  const isShootOut = shootOutCardsMaterial.length > 0
  const team = isShootOut
    ? shootOutCardsMaterial.getItems<HockeyPlayerCard>().map((card) => card.id)
    : move.indexes.map((index) => gameContext.game.items[MaterialType.HockeyPlayerCard]![index].id as HockeyPlayerCard)
  const teamStrength = getTeamStrength(team, playerNumber)
  const eliminationRank = new GameMemory(gameContext.game).remind<PlayerColor[]>(Memorize.ActivePlayers).length - 1
  const fanPoints = playoffFanPoint[playerNumber][eliminationRank]
  const playerName = usePlayerName(player)
  return (
    <Trans
      defaults={getTranslationKey(isShootOut, playerNumber)}
      values={{ name: playerName, fanPoints: fanPoints }}
      components={{
        supporterIcon: <SupportersIconComponent />,
        strength: isShootOut ? (
          <CardValueLogComponent cardId={team[0]} />
        ) : (
          <TeamStrengthLogComponent teamStrength={teamStrength} playerNumber={playerNumber} />
        ),
        ticket: <Picture src={playoffTicketTokenDescription.image} style={{ height: '2.5em' }} />
      }}
    />
  )
}
