import { MaterialMove, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'
import { PlayerColor } from '../PlayerColor'

export class DraftRoundSetupDrawCardsRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  public onRuleStart(
    _move: RuleMove<PlayerColor, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const moves: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
    const currentArenasNumber = this.material(MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot).getItems().length
    const hockeyCardsDeck = this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDeckSpot).deck()
    moves.push(
      this.material(MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot).moveItemsAtOnce({
        type: LocationType.ArenaDiscardSpot
      }),
      ...this.material(MaterialType.ArenaCard)
        .location(LocationType.ArenaDeckSpot)
        .deck()
        .deal(
          {
            type: LocationType.CurrentArenasRowSpot
          },
          currentArenasNumber + 1
        ),
      ...Array(6)
        .fill(1)
        .flatMap((_) =>
          this.game.players.map((player) =>
            hockeyCardsDeck.dealOne({
              type: LocationType.HockeyPlayerDraftSpot,
              player: player
            })
          )
        ),
      this.startSimultaneousRule<PlayerColor, RuleId>(RuleId.DraftRoundPhaseCardSelection)
    )
    return moves
  }
}
