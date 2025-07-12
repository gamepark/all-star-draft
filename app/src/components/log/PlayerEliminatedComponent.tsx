/** @jsxImportSource @emotion/react */
import { HockeyPlayerCard } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { getTeamStrength } from '@gamepark/all-star-draft/material/TeamStrength'
import { Memorize } from '@gamepark/all-star-draft/Memorize'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps, Picture, usePlayerName } from '@gamepark/react-game'
import { isDeleteItemTypeAtOnce, MaterialGame, MaterialMove, PlayerMemory } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { playoffTicketTokenDescription } from '../../material/PlayoffTicketTokenDescription'
import { SupportersIconComponent } from '../symbols/SupportersIconComponent'
import { TeamStrengthLogComponent } from './TeamStrengthLogComponent'

export const PlayerEliminatedComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({ move, context }) => {
  if (!isDeleteItemTypeAtOnce<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)) {
    return <></>
  }
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const player = gameContext.game.items[MaterialType.HockeyPlayerCard]![move.indexes[0]].location.player!
  const playerNumber = gameContext.game.players.length
  const team = move.indexes.map((index) => gameContext.game.items[MaterialType.HockeyPlayerCard]![index].id as HockeyPlayerCard)
  const teamStrength = getTeamStrength(team, playerNumber)
  const fanPoints = new PlayerMemory(gameContext.game, player).remind<number>(Memorize.ScorePlayoff)
  const playerName = usePlayerName(player)
  return (
    <Trans
      defaults={playerNumber > 3 ? 'history.playOffsPhase.playerEliminated' : 'history.playOffsPhase.playerEliminatedNoTicket'}
      values={{ name: playerName, fanPoints: fanPoints }}
      components={{
        supporterIcon: <SupportersIconComponent />,
        strength: <TeamStrengthLogComponent teamStrength={teamStrength} playerNumber={playerNumber} />,
        ticket: <Picture src={playoffTicketTokenDescription.image} height={50} />
      }}
    />
  )
}
