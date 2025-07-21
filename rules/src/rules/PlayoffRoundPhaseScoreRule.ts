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
    const playersCount = this.game.players.length
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
      playersCount
    )
    const lastPlayer =
      lastPlayers.length > 1
        ? getWeakestPlayerFromCards(
            lastPlayers.map((player) => ({
              player: player,
              card: this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).player(player).locationId(3).getItem()
                ?.id as HockeyPlayerCard
            })),
            playersCount
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
        this.memorize<number>(Memorize.ScorePlayoff, playoffFanPoint[playersCount][currentLowestPosition - 1], lastPlayer)
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
        this.memorize<number>(Memorize.ScoreTicket, ticketCount * playersCount, activePlayers[0])
        this.memorize<number>(Memorize.ScorePlayoff, playoffFanPoint[playersCount][0], activePlayers[0])
      }
      moves.push(this.endGame())
    } else {
      const shootoutCards = this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).locationId(3)
      if (shootoutCards.length > 0) {
        moves.push(shootoutCards.deleteItem())
      }
      const playersToEliminate = activePlayers.filter(
        (player) => this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerHandSpot).player(player).length < 2
      )
      moves.concat(
        playersToEliminate.map((player) => {
          this.memorize<number>(Memorize.ScorePlayoff, playoffFanPoint[playersCount][activePlayers.length - 1], player)
          return this.material(MaterialType.HockeyPlayerCard).player(player).deleteItemsAtOnce()
        })
      )
      if (playersToEliminate.length > 0) {
        if (activePlayers.length - playersToEliminate.length <= 1) {
          if (activePlayers.length - playersToEliminate.length === 1) {
            const playOffsWinner = this.activePlayers.find((p) => !playersToEliminate.includes(p))!
            this.memorize<number>(Memorize.ScorePlayoff, playoffFanPoint[playersCount][0], playOffsWinner)
          }
          moves.push(this.endGame())
        } else {
          moves.push(this.startSimultaneousRule(RuleId.PlayoffSubstitutePlayers, activePlayers))
        }
      } else {
        moves.push(this.startSimultaneousRule(RuleId.PlayoffSubstitutePlayers, activePlayers))
      }
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
