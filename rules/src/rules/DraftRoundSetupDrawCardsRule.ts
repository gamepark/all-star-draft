import { MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { minBy } from 'lodash'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { Memory } from '../Memory'
import { PlayerColor } from '../PlayerColor'
import { TwoPlayersMode } from '../TwoPlayersMode'
import { RuleId } from './RuleId'

export class DraftRoundSetupDrawCardsRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {
  public onRuleStart() {
    const roundNumber = this.material(MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot).length + 1
    const hockeyCardsDeck = this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDeckSpot).deck()
    const moves: MaterialMove<PlayerColor, MaterialType, LocationType>[] = [
      this.material(MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot).moveItemsAtOnce({
        type: LocationType.ArenaDiscardSpot
      }),
      ...this.material(MaterialType.ArenaCard).location(LocationType.ArenaDeckSpot).deck().deal(
        {
          type: LocationType.CurrentArenasRowSpot
        },
        roundNumber
      )
    ]

    // Card are dealt as long as FreeAgency is not the selected mode
    if (this.remind<TwoPlayersMode>(Memory.GameMode) === TwoPlayersMode.FreeAgency) {
      const scoreMap = this.game.players.map((player) => ({ player: player, score: this.remind<number>(Memory.Score, player) }))
      const lastPlayer = minBy(scoreMap, 'score')?.player ?? this.game.players[0]
      moves.push(this.startPlayerTurn(RuleId.DraftRoundPhaseOpenMarketCardSelection, lastPlayer))
      return moves
    }

    const draftHandSize = this.game.players.length === 2 ? 7 : 6
    moves.push(...this.game.players.map((player) => hockeyCardsDeck.dealAtOnce({ type: LocationType.HockeyPlayerDraftSpot, player: player }, draftHandSize)))

    moves.push(this.startSimultaneousRule<PlayerColor, RuleId>(RuleId.DraftRoundPhaseCardSelection))
    return moves
  }
}
