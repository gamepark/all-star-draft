import { MaterialMove, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class PlayoffRoundSetupRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId> {
  public onRuleStart(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
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
      ),
      this.startSimultaneousRule(RuleId.PlayoffSubstitutePlayers)
    ]
  }

  public getActivePlayerLegalMoves(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }

  public getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    return []
  }
}
