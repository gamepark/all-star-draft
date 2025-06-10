import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext, RuleMove, RuleStep, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'
import { Memorize } from '../Memorize'
import { busTokenValue, KnownBusTokenId } from '../material/BusToken'
import { MaterialRotation } from '../material/MaterialRotation'

export class DraftRoundPhaseBusDispatchRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  onRuleStart(_move: RuleMove<PlayerColor>, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
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

  afterItemMove(_move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken)(_move) &&
      _move.location.type === LocationType.PlayerBusTokenTeamSpot &&
      _move.location.player !== undefined
    ) {
      if (
        this.material(MaterialType.BusToken).location(LocationType.PlayerBusTokenReserveSpot).player(_move.location.player).getItems().length ===
        3 - this.remind(Memorize.RoundNumber)
      ) {
        return [this.endPlayerTurn(_move.location.player)]
      }
    }
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return [this.startSimultaneousRule<PlayerColor, RuleId>(RuleId.DraftRoundPhaseTeamReveal)]
  }
}
