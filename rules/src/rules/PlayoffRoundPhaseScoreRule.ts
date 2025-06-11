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
    console.log('Place ', currentLowestPosition, ' is still open')
    const lastPlayers = this.remind<PlayerColor[]>(Memorize.LastPlayers)
    if (lastPlayers.length > 0) {
      console.log('We got at least a loser')
      const lastPlayer =
        lastPlayers.length > 1
          ? getWeakestPlayerFromCards(
              lastPlayers.map((player) => {
                return [
                  player,
                  this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).player(player).locationId(3).getItem()
                    ?.id as HockeyPlayerCard
                ]
              }),
              this.game.players.length
            )
          : lastPlayers[0]
      console.log('And it is ', lastPlayer)
      const playoffTicketTokens = this.material(MaterialType.PlayoffTicketToken).location(LocationType.PlayerPlayoffTicketTokenSpot).player(lastPlayer)
      console.log(playoffTicketTokens.getItems())
      if (playoffTicketTokens.length > 0) {
        console.log('Some token to remove ! Still ', playoffTicketTokens.length)
        moves.push(playoffTicketTokens.deleteItem())
      } else {
        this.memorize<number>(Memorize.Score, (score) => score + playoffFanPoint[this.game.players.length][currentLowestPosition - 1], lastPlayer)
        this.memorize<PlayerColor[]>(Memorize.ActivePlayers, (activePlayers) => activePlayers.filter((player) => player !== lastPlayer))
      }
    }
    const activePlayers = this.remind<PlayerColor[]>(Memorize.ActivePlayers)
    if (activePlayers.length <= 1) {
      if (activePlayers.length === 1)
        this.memorize<number>(Memorize.Score, (score) => score + playoffFanPoint[this.game.players.length][currentLowestPosition - 1], activePlayers[0])
      this.endGame()
    }
    this.memorize<PlayerColor[]>(Memorize.LastPlayers, [])
    moves.push(this.startSimultaneousRule(RuleId.PlayoffRoundPhaseInterMatchAddPlayers))
    return moves
  }
}
