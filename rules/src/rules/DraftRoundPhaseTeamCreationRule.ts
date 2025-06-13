import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { Memorize } from '../Memorize'
import { RuleId } from './RuleId'
import { MaterialRotation } from '../material/MaterialRotation'

export class DraftRoundPhaseTeamCreationRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.material(MaterialType.HockeyPlayerCard)
      .location(LocationType.PlayerHockeyPlayerHandSpot)
      .player(player)
      .moveItems({
        type: LocationType.PlayerHockeyPlayerTeamSpot,
        id: this.remind<number>(Memorize.RoundNumber),
        player: player,
        rotation: MaterialRotation.FaceDown
      })
  }

  afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
      move.location.id === this.remind<number>(Memorize.RoundNumber) &&
      move.location.type === LocationType.PlayerHockeyPlayerTeamSpot &&
      move.location.player !== undefined &&
      this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).player(move.location.player).locationId(move.location.id)
        .length === 5
    ) {
      this.memorize(Memorize.CurrentTeamNumber, 1, move.location.player)
      return [this.endPlayerTurn<PlayerColor>(move.location.player)]
    }
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return [this.startSimultaneousRule(RuleId.DraftRoundPhaseBusDispatch)]
  }
}
