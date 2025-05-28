import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext, RuleMove, RuleStep, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'
import { Memorize } from '../Memorize'
import { busTokenValue, KnownBusTokenId } from '../material/BusToken'

export class DraftRoundPhaseBusDispatchRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  onRuleStart(_move: RuleMove<PlayerColor>, _previousRule?: RuleStep, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.game.players.map((player) =>
      this.material(MaterialType.BusToken).location(LocationType.PlayerBusTokenReserveSpot).player(player).deck().shuffle()
    )
  }

  getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const currentTeamNumber = this.remind<number>(Memorize.CurrentTeamNumber, player)
    return this.material(MaterialType.BusToken)
      .location(LocationType.PlayerBusTokenReserveSpot)
      .player(player)
      .filter((bus) => {
        return busTokenValue((bus.id as KnownBusTokenId).front) <= this.remind(Memorize.RoundNumber)
      })
      .moveItems({
        type: LocationType.PlayerBusTokenTeamSpot,
        player: player,
        id: currentTeamNumber
      })
  }

  afterItemMove(_move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken)(_move) && _move.location.player !== undefined) {
      const currentTeamNumber = this.remind<number>(Memorize.CurrentTeamNumber, _move.location.player)
      const isBusOnTeam =
        this.material(MaterialType.BusToken)
          .location((location) => location.type === LocationType.PlayerBusTokenTeamSpot && location.id === currentTeamNumber)
          .player(_move.location.player).length === 1
      if (_move.location.type === LocationType.PlayerBusTokenTeamSpot && isBusOnTeam) {
        if (currentTeamNumber < this.remind<number>(Memorize.RoundNumber)) {
          this.memorize<number>(Memorize.CurrentTeamNumber, (number) => number + 1, _move.location.player)
        } else {
          return [this.endPlayerTurn(_move.location.player)]
        }
      }
    }
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (this.remind(Memorize.RoundNumber) < 3) {
      this.memorize<number>(Memorize.RoundNumber, (roundNumber) => roundNumber + 1)
      return [
        ...this.game.players.map((player) => {
          return this.material(MaterialType.BusToken).location(LocationType.PlayerHockeyPlayerTeamSpot).player(player).moveItemsAtOnce({
            type: LocationType.PlayerBusTokenReserveSpot,
            player: player
          })
        }), // Todo : Remove when next rule is implemented
        this.startSimultaneousRule<PlayerColor, RuleId>(RuleId.DraftRoundSetupDrawCards)
      ]
    }
    return [this.endGame()]
  }
}
