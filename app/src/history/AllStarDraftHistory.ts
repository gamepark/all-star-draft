import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { LogDescription, MoveComponentContext, MovePlayedLogDescription } from '@gamepark/react-game'
import { isMoveItemType, Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
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
    return undefined
  }
}
