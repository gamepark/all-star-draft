import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { Memorize } from '../Memorize'
import { RuleId } from './RuleId'
import { HockeyPlayerCardRotation } from '../material/HockeyPlayerCardRotation'

export class DraftRoundPhaseTeamCreationRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.material(MaterialType.HockeyPlayerCard)
      .location(LocationType.PlayerHockeyPlayerHandSpot)
      .player(player)
      .moveItems({
        type: LocationType.PlayerHockeyPlayerTeamSpot,
        id: this.remind<number>(Memorize.RoundNumber),
        player: player,
        rotation: HockeyPlayerCardRotation.FaceDown
      })
  }

  afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
      move.location.id === this.remind<number>(Memorize.RoundNumber) &&
      move.location.type === LocationType.PlayerHockeyPlayerTeamSpot &&
      move.location.player !== undefined &&
      this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).player(move.location.player).id(move.location.id)
        .length === 5
    ) {
      return [this.endPlayerTurn<PlayerColor>(move.location.player)]
    }
    return []
  }

  // Todo : Rework when next rule is created
  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (this.remind(Memorize.RoundNumber) < 3) {
      this.memorize<number>(Memorize.RoundNumber, (roundNumber) => roundNumber + 1)
      return [this.startSimultaneousRule(RuleId.DraftRoundSetupDrawCards)]
    }
    return [this.endGame()]
  }
}
