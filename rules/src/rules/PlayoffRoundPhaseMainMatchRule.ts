import { MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { HockeyPlayerCard } from '../material/HockeyPlayerCard'
import { LocationType } from '../material/LocationType'
import { getWeakestPlayersFromTeams } from '../material/MatchRanking'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class PlayoffRoundPhaseMainMatchRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId> {
  onRuleStart(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const lastPlayers = getWeakestPlayersFromTeams(
      this.activePlayers.map((player) => ({
        player: player,
        team: this.material(MaterialType.HockeyPlayerCard)
          .location(LocationType.PlayerHockeyPlayerTeamSpot)
          .player(player)
          .locationId(2)
          .getItems()
          .map((hockeyPlayer) => hockeyPlayer.id as HockeyPlayerCard)
      })),
      this.game.players.length
    )
    return [
      this.startSimultaneousRule(
        lastPlayers.length > 1 ? RuleId.PlayoffRoundPhaseTieMatch : RuleId.PlayoffRoundPhaseScore,
        lastPlayers.length > 1 ? lastPlayers : this.activePlayers
      )
    ]
  }

  getActivePlayerLegalMoves(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }
}
