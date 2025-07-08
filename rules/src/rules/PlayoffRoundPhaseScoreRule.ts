import { PlayerTurnRule, RuleMove, RuleStep, PlayMoveContext, MaterialMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memorize } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'
import { getWeakestPlayerFromCards } from '../material/MatchRanking'
import { HockeyPlayerCard } from '../material/HockeyPlayerCard'
import { playoffFanPoint } from '../material/PlayoffPointCard'

export class PlayoffRoundPhaseScoreRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  onRuleStart(_move: RuleMove<PlayerColor>, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const moves: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
    const currentLowestPosition = this.remind<PlayerColor[]>(Memorize.ActivePlayers).length
    const lastPlayers = this.remind<PlayerColor[]>(Memorize.LastPlayers)
    if (lastPlayers.length > 0) {
      const lastPlayer =
        lastPlayers.length > 1
          ? getWeakestPlayerFromCards(
              lastPlayers.map((player) => ({
                player: player,
                card: this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).player(player).locationId(3).getItem()
                  ?.id as HockeyPlayerCard
              })),
              this.game.players.length
            )
          : lastPlayers[0]
      const playoffTicketTokens = this.material(MaterialType.PlayoffTicketToken).location(LocationType.PlayerPlayoffTicketTokenSpot).player(lastPlayer)
      if (playoffTicketTokens.length > 0) {
        moves.push(playoffTicketTokens.deleteItem())
      } else {
        this.memorize<number>(Memorize.ScorePlayoff, playoffFanPoint[this.game.players.length][currentLowestPosition - 1], lastPlayer)
        this.memorize<PlayerColor[]>(Memorize.ActivePlayers, (activePlayers) => activePlayers.filter((player) => player !== lastPlayer))
      }
    }
    const activePlayers = this.remind<PlayerColor[]>(Memorize.ActivePlayers)
    if (activePlayers.length <= 1) {
      if (activePlayers.length === 1) {
        const ticketCount = this.material(MaterialType.PlayoffTicketToken)
          .location(LocationType.PlayerPlayoffTicketTokenSpot)
          .player(activePlayers[0])
          .getQuantity()
        this.memorize<number>(Memorize.ScoreTicket, ticketCount * this.game.players.length, activePlayers[0])
        this.memorize<number>(Memorize.ScorePlayoff, playoffFanPoint[this.game.players.length][0], activePlayers[0])
      }
      moves.push(this.endGame())
    } else {
      this.memorize<PlayerColor[]>(Memorize.LastPlayers, [])
      moves.push(this.startSimultaneousRule(RuleId.PlayoffRoundPhaseInterMatchAddPlayers))
    }
    return moves
  }
}
