import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { HockeyPlayerCard } from '../material/HockeyPlayerCard'
import { LocationType } from '../material/LocationType'
import { getWeakestPlayersFromTeams } from '../material/MatchRanking'
import { MaterialType } from '../material/MaterialType'
import { Memorize } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class PlayoffRoundPhaseMainMatchRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  onRuleStart(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const activePlayers = this.remind<PlayerColor[]>(Memorize.ActivePlayers)
    const lastPlayers = getWeakestPlayersFromTeams(
      activePlayers.map((player) => ({
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
    this.memorize<PlayerColor[]>(Memorize.LastPlayers, lastPlayers)
    if (lastPlayers.length > 1) return [this.startSimultaneousRule(RuleId.PlayoffRoundPhaseTieMatch)]
    return [this.startSimultaneousRule(RuleId.PlayoffRoundPhaseScore)]
  }
}
