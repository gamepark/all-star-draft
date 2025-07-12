import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { LogDescription, MoveComponentContext, MovePlayedLogDescription } from '@gamepark/react-game'
import { isMoveItemType, Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { BusAssignedToTeamComponent } from '../components/log/BusAssignedToTeamComponent'
import { CardDraftedComponent } from '../components/log/CardDraftedComponent'
import { TeamCreatedComponent } from '../components/log/TeamCreatedComponent'

export class AllStarDraftHistory
  implements LogDescription<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor, MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>>
{
  getMovePlayedLogDescription(
    move: MaterialMove<PlayerColor, MaterialType, LocationType>,
    context: MoveComponentContext<
      MaterialMove<PlayerColor, MaterialType, LocationType>,
      PlayerColor,
      MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
    >
  ): MovePlayedLogDescription<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor> | undefined {
    if (context.game.rule?.id === RuleId.DraftRoundPhaseCardSelection) {
      if (
        isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
        move.location.type === LocationType.PlayerHockeyPlayerHandSpot
      ) {
        return { Component: CardDraftedComponent, player: move.location.player }
      }
    }
    if (context.game.rule?.id === RuleId.DraftRoundPhaseTeamCreation) {
      if (
        isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
        move.location.type === LocationType.PlayerHockeyPlayerTeamSpot
      ) {
        const numberOfCardsInTeam =
          new Material(MaterialType.HockeyPlayerCard, context.game.items[MaterialType.HockeyPlayerCard])
            .location(LocationType.PlayerHockeyPlayerTeamSpot)
            .player(move.location.player)
            .locationId(move.location.id).length + 1
        return numberOfCardsInTeam === 5 ? { Component: TeamCreatedComponent, player: move.location.player } : undefined
      }
    }
    if (context.game.rule?.id === RuleId.DraftRoundPhaseBusDispatch) {
      if (isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken)(move) && move.location.type === LocationType.PlayerBusTokenTeamSpot) {
        return { Component: BusAssignedToTeamComponent, player: move.location.player }
      }
    }
    return undefined
  }
}
