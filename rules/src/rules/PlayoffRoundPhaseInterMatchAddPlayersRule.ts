import { RuleMove, RuleStep, PlayMoveContext, MaterialMove, SimultaneousRule, isMoveItemType, ItemMove } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { MaterialRotation } from '../material/MaterialRotation'
import { CustomMoveType, isPassCustomMove } from '../material/CustomMoveType'
import { RuleId } from './RuleId'
import { Memorize } from '../Memorize'
import { playoffFanPoint } from '../material/PlayoffPointCard'

export class PlayoffRoundPhaseInterMatchAddPlayersRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  onRuleStart(_move: RuleMove<PlayerColor>, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const activePlayers = this.remind<PlayerColor[]>(Memorize.ActivePlayers)
    const currentLowestPosition = activePlayers.length
    this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).locationId(3).deleteItemsAtOnce()
    activePlayers.forEach((player) => {
      if (this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerHandSpot).player(player).getItems().length < 2) {
        this.memorize<number>(Memorize.Score, (score) => score + playoffFanPoint[this.game.players.length][currentLowestPosition - 1], player)
        this.memorize<PlayerColor[]>(Memorize.ActivePlayers, (activePlayers) => activePlayers.filter((player) => player !== player))
        this.endPlayerTurn(player)
      }
    })
    return []
  }

  getActivePlayerLegalMoves(_player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (this.remind<PlayerColor[]>(Memorize.ActivePlayers).includes(_player)) {
      const moves: MaterialMove<PlayerColor, MaterialType, LocationType>[] = this.material(MaterialType.HockeyPlayerCard)
        .location(LocationType.PlayerHockeyPlayerHandSpot)
        .player(_player)
        .moveItems({
          type: LocationType.PlayerHockeyPlayerTeamSpot,
          id: 3,
          player: _player,
          rotation: MaterialRotation.FaceDown
        })
      if (this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).locationId(3).player(_player).getItems().length >= 2)
        moves.push(this.customMove(CustomMoveType.Pass, { player: _player }))
      return moves
    }
    return []
  }

  afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
      move.location.id === 3 &&
      move.location.type === LocationType.PlayerHockeyPlayerTeamSpot &&
      move.location.player !== undefined &&
      this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).player(move.location.player).locationId(move.location.id)
        .length === 4
    ) {
      return [this.endPlayerTurn<PlayerColor>(move.location.player)]
    }
    return []
  }

  onCustomMove(_move: MaterialMove, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (isPassCustomMove(_move)) return [this.endPlayerTurn(_move.data.player)]
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return [this.startSimultaneousRule(RuleId.PlayoffRoundPhaseInterMatchDiscardPlayers)]
  }
}
