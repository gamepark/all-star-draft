import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext, SimultaneousRule } from '@gamepark/rules-api'
import { busTokenValue, KnownBusTokenId } from '../material/BusToken'
import { LocationType } from '../material/LocationType'
import { MaterialRotation } from '../material/MaterialRotation'
import { MaterialType } from '../material/MaterialType'
import { Memorize } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class DraftRoundPhaseBusDispatchRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  onRuleStart(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.game.players.map((player) =>
      this.material(MaterialType.BusToken).location(LocationType.PlayerBusTokenReserveSpot).player(player).deck().shuffle()
    )
  }

  getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return Array(this.remind(Memorize.RoundNumber))
      .fill(1)
      .flatMap((_, index) =>
        this.material(MaterialType.BusToken)
          .location(LocationType.PlayerBusTokenTeamSpot)
          .locationId(index + 1)
          .player(player)
          .getItems().length === 0
          ? this.material(MaterialType.BusToken)
              .location(LocationType.PlayerBusTokenReserveSpot)
              .player(player)
              .filter((bus) => {
                return busTokenValue((bus.id as KnownBusTokenId).front) <= this.remind(Memorize.RoundNumber)
              })
              .moveItems({
                type: LocationType.PlayerBusTokenTeamSpot,
                player: player,
                id: index + 1,
                rotation: MaterialRotation.FaceDown
              })
          : []
      )
  }

  afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken)(move) &&
      move.location.type === LocationType.PlayerBusTokenTeamSpot &&
      move.location.player !== undefined
    ) {
      if (
        this.material(MaterialType.BusToken).location(LocationType.PlayerBusTokenReserveSpot).player(move.location.player).getItems().length ===
        3 - this.remind(Memorize.RoundNumber)
      ) {
        return [this.endPlayerTurn(move.location.player)]
      }
    }
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return [this.startSimultaneousRule<PlayerColor, RuleId>(RuleId.DraftRoundPhaseTeamReveal)]
  }
}
