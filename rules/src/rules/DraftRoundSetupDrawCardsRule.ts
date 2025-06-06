import { MaterialMove, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'
import { PlayerColor } from '../PlayerColor'
import { Memorize } from '../Memorize'

export class DraftRoundSetupDrawCardsRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  public onRuleStart(
    _move: RuleMove<PlayerColor, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    this.memorize<number>(Memorize.RoundNumber, (roundNumber) => roundNumber + 1)
    const moves: MaterialMove<PlayerColor, MaterialType, LocationType>[] = []
    const hockeyCardsDeck = this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDeckSpot).deck()
    moves.push(
      this.material(MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot).moveItemsAtOnce({
        type: LocationType.ArenaDiscardSpot
      }),
      ...this.material(MaterialType.ArenaCard).location(LocationType.ArenaDeckSpot).deck().deal(
        {
          type: LocationType.CurrentArenasRowSpot
        },
        this.remind<number>(Memorize.RoundNumber)
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
