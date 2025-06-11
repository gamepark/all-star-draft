import { RuleMove, RuleStep, PlayMoveContext, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { Memorize } from '../Memorize'
import { getWeakestPlayersFromTeams } from '../material/MatchRanking'
import { HockeyPlayerCard } from '../material/HockeyPlayerCard'
import { RuleId } from './RuleId'

export class PlayoffRoundPhaseMainMatchRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  onRuleStart(_move: RuleMove<PlayerColor>, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const activePlayers = this.remind<PlayerColor[]>(Memorize.ActivePlayers)
    const lastPlayers = getWeakestPlayersFromTeams(
      activePlayers.map((player) => {
        return [
          player,
          this.material(MaterialType.HockeyPlayerCard)
            .location(LocationType.PlayerHockeyPlayerTeamSpot)
            .player(player)
            .locationId(2)
            .getItems()
            .map((hockeyPlayer) => hockeyPlayer.id as HockeyPlayerCard)
        ]
      }),
      this.game.players.length
    )
    this.memorize<PlayerColor[]>(Memorize.LastPlayers, lastPlayers)
    if (lastPlayers.length > 1) return [this.startSimultaneousRule(RuleId.PlayoffRoundPhaseTieMatch)]
    return [this.startSimultaneousRule(RuleId.PlayoffRoundPhaseScore)]
  }
}
