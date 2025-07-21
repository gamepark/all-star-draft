import { isMoveItemType, ItemMove, MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { getBusTokenValue, KnownBusTokenId } from '../material/BusToken'
import { LocationType } from '../material/LocationType'
import { MaterialRotation } from '../material/MaterialRotation'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class DraftRoundPhaseBusDispatchRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId> {
  getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const roundNumber = this.material(MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot).length
    return Array(roundNumber)
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
              .filter<KnownBusTokenId>((bus) => getBusTokenValue(bus.id.front) <= roundNumber)
              .moveItems({
                type: LocationType.PlayerBusTokenTeamSpot,
                player: player,
                id: index + 1,
                rotation: MaterialRotation.FaceDown
              })
          : []
      )
  }

  afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken)(move) &&
      move.location.type === LocationType.PlayerBusTokenTeamSpot &&
      move.location.player !== undefined
    ) {
      const roundNumber = this.material(MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot).length
      if (this.material(MaterialType.BusToken).location(LocationType.PlayerBusTokenTeamSpot).player(move.location.player).getItems().length === roundNumber) {
        return [this.endPlayerTurn(move.location.player)]
      }
    }
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return [this.startSimultaneousRule<PlayerColor, RuleId>(RuleId.DraftRoundPhaseTeamReveal)]
  }
}
