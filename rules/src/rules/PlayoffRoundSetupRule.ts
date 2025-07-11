import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext, RuleMove, RuleStep, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialRotation } from '../material/MaterialRotation'
import { MaterialType } from '../material/MaterialType'
import { Memorize } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class PlayoffRoundSetupRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  public onRuleStart(
    _move: RuleMove<PlayerColor, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    this.memorize(Memorize.ActivePlayers, this.game.players)
    return [
      this.material(MaterialType.BusToken).deleteItemsAtOnce(),
      this.material(MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot).moveItemsAtOnce({
        type: LocationType.ArenaDiscardSpot
      }),
      ...this.game.players.flatMap((player) =>
        this.material(MaterialType.HockeyPlayerCard)
          .location(LocationType.PlayerHockeyPlayerTeamSpot)
          .player(player)
          .moveItemsAtOnce({ type: LocationType.PlayerHockeyPlayerHandSpot, player: player })
      )
    ]
  }

  getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerHandSpot).player(player).moveItems({
      type: LocationType.PlayerHockeyPlayerTeamSpot,
      id: 2,
      player: player,
      rotation: MaterialRotation.FaceDown
    })
  }

  afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
      move.location.id === 2 &&
      move.location.type === LocationType.PlayerHockeyPlayerTeamSpot &&
      move.location.player !== undefined &&
      this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).player(move.location.player).locationId(move.location.id)
        .length === 5
    ) {
      return [this.endPlayerTurn<PlayerColor>(move.location.player)]
    }
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return [this.startSimultaneousRule(RuleId.PlayoffRoundPhaseTeamReveal)]
  }
}
