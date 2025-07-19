import { MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { HockeyPlayerCard } from '../material/HockeyPlayerCard'
import { LocationType } from '../material/LocationType'
import { getWeakestPlayerFromCards, getWeakestPlayersFromTeams } from '../material/MatchRanking'
import { MaterialType } from '../material/MaterialType'
import { playoffFanPoint } from '../material/PlayoffPointCard'
import { Memorize } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class PlayoffRoundPhaseScoreRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId> {
  onRuleStart(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const moves: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] = []
    const currentLowestPosition = this.activePlayers.length
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
        : lastPlayers.length === 1
          ? lastPlayers[0]
          : undefined
    let isLastPlayerEliminated = false
    if (lastPlayer !== undefined) {
      const playoffTicketTokens = this.material(MaterialType.PlayoffTicketToken).location(LocationType.PlayerPlayoffTicketTokenSpot).player(lastPlayer)
      if (playoffTicketTokens.length > 0) {
        moves.push(playoffTicketTokens.deleteItem())
      } else {
        isLastPlayerEliminated = true
        this.memorize<number>(Memorize.ScorePlayoff, playoffFanPoint[this.game.players.length][currentLowestPosition - 1], lastPlayer)
        moves.push(this.material(MaterialType.HockeyPlayerCard).player(lastPlayer).deleteItemsAtOnce())
      }
    }
    const playersStillHavingCards = this.game.players.filter((player) => this.material(MaterialType.HockeyPlayerCard).player(player).length > 0)
    const activePlayers = isLastPlayerEliminated ? playersStillHavingCards.filter((player) => player !== lastPlayer) : playersStillHavingCards
    if (activePlayers.length <= 1) {
      if (activePlayers.length === 1) {
        const ticketCount = this.material(MaterialType.PlayoffTicketToken)
          .location(LocationType.PlayerPlayoffTicketTokenSpot)
          .player(activePlayers[0])
          .getItems().length
        this.memorize<number>(Memorize.ScoreTicket, ticketCount * this.game.players.length, activePlayers[0])
        this.memorize<number>(Memorize.ScorePlayoff, playoffFanPoint[this.game.players.length][0], activePlayers[0])
      }
      moves.push(this.endGame())
    } else {
      moves.push(
        this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).locationId(3).deleteItemsAtOnce(),
        this.startSimultaneousRule(RuleId.PlayoffSubstitutePlayers, activePlayers)
      )
    }
    return moves
  }

  getActivePlayerLegalMoves(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }
}
