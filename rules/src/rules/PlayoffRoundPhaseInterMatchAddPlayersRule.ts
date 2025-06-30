import { RuleMove, RuleStep, PlayMoveContext, MaterialMove, SimultaneousRule, isMoveItemType, ItemMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { MaterialRotation } from '../material/MaterialRotation'
import { CustomMoveType, isPassCustomMove } from '../material/CustomMoveType'
import { RuleId } from './RuleId'
import { Memorize } from '../Memorize'
import { playoffFanPoint } from '../material/PlayoffPointCard'

const NEW_HOCKEY_PLAYERS_LOCATION_ID = 3

export class PlayoffRoundPhaseInterMatchAddPlayersRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  onRuleStart(_move: RuleMove<PlayerColor>, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const activePlayers = this.remind<PlayerColor[]>(Memorize.ActivePlayers)
    const currentLowestPosition = activePlayers.length
    this.material(MaterialType.HockeyPlayerCard)
      .location(LocationType.PlayerHockeyPlayerTeamSpot)
      .locationId(NEW_HOCKEY_PLAYERS_LOCATION_ID)
      .deleteItemsAtOnce()
    activePlayers.forEach((player) => {
      if (this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerHandSpot).player(player).getItems().length < 2) {
        this.memorize<number>(Memorize.Score, (score) => score + playoffFanPoint[this.game.players.length][currentLowestPosition - 1], player)
        this.memorize<PlayerColor[]>(Memorize.ActivePlayers, (activePlayers) => activePlayers.filter((player) => player !== player))
        this.endPlayerTurn(player)
      }
    })
    return []
  }

  getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (this.remind<PlayerColor[]>(Memorize.ActivePlayers).includes(player)) {
      const moves: MaterialMove<PlayerColor, MaterialType, LocationType>[] = this.material(MaterialType.HockeyPlayerCard)
        .location(LocationType.PlayerHockeyPlayerHandSpot)
        .player(player)
        .moveItems({
          type: LocationType.PlayerHockeyPlayerTeamSpot,
          id: NEW_HOCKEY_PLAYERS_LOCATION_ID,
          player: player,
          rotation: MaterialRotation.FaceDown
        })
      if (
        this.material(MaterialType.HockeyPlayerCard)
          .location(LocationType.PlayerHockeyPlayerTeamSpot)
          .locationId(NEW_HOCKEY_PLAYERS_LOCATION_ID)
          .player(player)
          .getItems().length >= 2
      )
        moves.push(this.customMove(CustomMoveType.Pass, { player: player }))
      return moves
    }
    return []
  }

  afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
      move.location.id === NEW_HOCKEY_PLAYERS_LOCATION_ID &&
      move.location.type === LocationType.PlayerHockeyPlayerTeamSpot &&
      move.location.player !== undefined &&
      this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).player(move.location.player).locationId(move.location.id)
        .length === 4
    ) {
      return [this.endPlayerTurn<PlayerColor>(move.location.player)]
    }
    return []
  }

  onCustomMove(move: MaterialMove, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (isPassCustomMove(move)) return [this.endPlayerTurn(move.data.player)]
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return [this.startSimultaneousRule(RuleId.PlayoffRoundPhaseInterMatchDiscardPlayers)]
  }
}
