import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext, RuleMove, RuleStep, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { Memorize } from '../Memorize'
import { MaterialRotation } from '../material/MaterialRotation'
import { RuleId } from './RuleId'

export class PlayoffRoundPhaseInterMatchDiscardPlayersRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  onRuleStart(_move: RuleMove<PlayerColor>, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const activePlayers = this.remind<PlayerColor[]>(Memorize.ActivePlayers)
    const moves: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
    this.game.players.forEach((player) => {
      if (!activePlayers.includes(player)) {
        moves.push(this.endPlayerTurn(player))
      }
    })
    return moves
  }

  getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).locationId(2).player(player).moveItems({
      type: LocationType.HockeyPlayerDraftSpot,
      player: player
    })
  }

  afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
      move.location.type === LocationType.HockeyPlayerDraftSpot &&
      move.location.player !== undefined &&
      this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).player(move.location.player).locationId(3).length ===
        this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot).player(move.location.player).length
    ) {
      return [this.endPlayerTurn<PlayerColor>(move.location.player)]
    }
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const activePlayers = this.remind<PlayerColor[]>(Memorize.ActivePlayers)
    return [
      ...activePlayers.flatMap((player) => [
        this.material(MaterialType.HockeyPlayerCard)
          .location(LocationType.PlayerHockeyPlayerTeamSpot)
          .player(player)
          .locationId(3)
          .moveItemsAtOnce({ type: LocationType.PlayerHockeyPlayerTeamSpot, player: player, id: 2, rotation: MaterialRotation.FaceUp })
      ]),
      this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot).deleteItemsAtOnce(),
      this.startSimultaneousRule(RuleId.PlayoffRoundPhaseMainMatch)
    ]
  }
}
