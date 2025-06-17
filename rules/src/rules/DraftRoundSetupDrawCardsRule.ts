import { MaterialMove, PlayerTurnRule, PlayMoveContext, RuleMove, RuleStep } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'
import { PlayerColor } from '../PlayerColor'
import { Memorize } from '../Memorize'
import { RegularSeasonGameMode } from '../RegularSeasonGameMode'
import { minBy } from 'lodash'

export class DraftRoundSetupDrawCardsRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  public onRuleStart(
    _move: RuleMove<PlayerColor, RuleId>,
    _previousRule?: RuleStep,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (this.remind(Memorize.RoundNumber) >= 3) {
      return [this.startSimultaneousRule(RuleId.PlayoffRoundSetupPhase)]
    }
    this.memorize<number>(Memorize.RoundNumber, (roundNumber) => roundNumber + 1)
    const hockeyCardsDeck = this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDeckSpot).deck()
    const moves: MaterialMove<PlayerColor, MaterialType, LocationType>[] = [
      this.material(MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot).moveItemsAtOnce({
        type: LocationType.ArenaDiscardSpot
      }),
      ...this.material(MaterialType.ArenaCard).location(LocationType.ArenaDeckSpot).deck().deal(
        {
          type: LocationType.CurrentArenasRowSpot
        },
        this.remind<number>(Memorize.RoundNumber)
      )
    ]

    // Card are dealt as long as OpenMarket is not the selected mode
    if (this.remind<RegularSeasonGameMode>(Memorize.GameMode) === RegularSeasonGameMode.OpenMarket) {
      const scoreMap = this.game.players.map((player) => ({ player: player, score: this.remind<number>(Memorize.Score, player) }))
      const lastPlayer = minBy(scoreMap, 'score')?.player ?? this.game.players[0]
      moves.push(this.startPlayerTurn(RuleId.DraftRoundPhaseOpenMarketCardSelection, lastPlayer))
      return moves
    }

    moves.push(
      ...Array(this.game.players.length === 2 ? 7 : 6)
        .fill(1)
        .flatMap((_) =>
          this.game.players.map((player) =>
            hockeyCardsDeck.dealOne({
              type: LocationType.HockeyPlayerDraftSpot,
              player: player
            })
          )
        ),
      ...this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerHandSpot).selectItems(),
      this.startSimultaneousRule<PlayerColor, RuleId>(RuleId.DraftRoundPhaseCardSelection)
    )
    return moves
  }
}
