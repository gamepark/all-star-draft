import { MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialRotation } from '../material/MaterialRotation'
import { MaterialType } from '../material/MaterialType'
import { playoffFanPoint } from '../material/PlayoffPointCard'
import { Memorize } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

const NEW_HOCKEY_PLAYERS_LOCATION_ID = 3

export class PlayoffSubstitutePlayersRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  onRuleStart() {
    const activePlayers = this.remind<PlayerColor[]>(Memorize.ActivePlayers)
    const moves: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
    const currentLowestPosition = activePlayers.length
    this.material(MaterialType.HockeyPlayerCard)
      .location(LocationType.PlayerHockeyPlayerTeamSpot)
      .locationId(NEW_HOCKEY_PLAYERS_LOCATION_ID)
      .deleteItemsAtOnce()
    this.game.players.forEach((player) => {
      if (activePlayers.includes(player)) {
        if (this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerHandSpot).player(player).getItems().length < 2) {
          const ticketCount = this.material(MaterialType.PlayoffTicketToken)
            .location(LocationType.PlayerPlayoffTicketTokenSpot)
            .player(player)
            .getItems().length
          this.memorize<number>(Memorize.ScoreTicket, ticketCount * this.game.players.length, player)
          this.memorize<number>(Memorize.ScorePlayoff, playoffFanPoint[this.game.players.length][currentLowestPosition - 1], player)
          this.memorize<PlayerColor[]>(Memorize.ActivePlayers, (activePlayers) => activePlayers.filter((player) => player !== player))
          moves.push(
            this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).player(player).deleteItemsAtOnce(),
            this.endPlayerTurn(player)
          )
        }
      } else {
        moves.push(this.endPlayerTurn(player))
      }
    })
    return moves
  }

  getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (this.remind<PlayerColor[]>(Memorize.ActivePlayers).includes(player)) {
      const moves: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
      const playerCards = this.material(MaterialType.HockeyPlayerCard).player(player)
      const lastTeam = playerCards.location(LocationType.PlayerHockeyPlayerTeamSpot).locationId(2)
      if (lastTeam.length > 1) {
        moves.push(...lastTeam.moveItems({ type: LocationType.HockeyPlayerDraftSpot, player: player }))
      }
      const newMembers = playerCards.location(LocationType.PlayerHockeyPlayerTeamSpot).locationId(NEW_HOCKEY_PLAYERS_LOCATION_ID)
      if (newMembers.length < 4) {
        moves.push(
          ...playerCards.location(LocationType.PlayerHockeyPlayerHandSpot).moveItems({
            type: LocationType.PlayerHockeyPlayerTeamSpot,
            id: NEW_HOCKEY_PLAYERS_LOCATION_ID,
            player: player,
            rotation: MaterialRotation.FaceDown
          })
        )
      }
      if (newMembers.length >= 2 && newMembers.length + lastTeam.length === 5) {
        moves.push(this.endPlayerTurn(player))
      }
      return moves
    }
    return []
  }

  getMovesAfterPlayersDone() {
    const moves: MaterialMove[] = []
    for (const player of this.game.players) {
      const newPlayers = this.material(MaterialType.HockeyPlayerCard).player(player).location(LocationType.PlayerHockeyPlayerTeamSpot).locationId(3)
      moves.push(newPlayers.moveItemsAtOnce({ type: LocationType.PlayerHockeyPlayerTeamSpot, player: player, id: 2, rotation: MaterialRotation.FaceDown }))
    }
    moves.push(this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot).deleteItemsAtOnce())
    moves.push(this.startSimultaneousRule(RuleId.PlayoffRoundPhaseTeamReveal))
    return moves
  }
}
