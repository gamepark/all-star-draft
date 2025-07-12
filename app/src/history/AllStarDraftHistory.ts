import { KnownBusTokenId } from '@gamepark/all-star-draft/material/BusToken'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { LogDescription, MoveComponentContext, MovePlayedLogDescription } from '@gamepark/react-game'
import { isMoveItemType, isMoveItemTypeAtOnce, Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { BusAssignedToTeamComponent } from '../components/log/BusAssignedToTeamComponent'
import { BusRevealComponent } from '../components/log/BusRevealComponent'
import { CardDraftedComponent } from '../components/log/CardDraftedComponent'
import { MatchResultComponent } from '../components/log/MatchResultComponent'
import { TeamCreatedComponent } from '../components/log/TeamCreatedComponent'
import { TeamMemberAddedFromBench } from '../components/log/TeamMemberAddedFromBench'
import { TeamMemberRemovedComponent } from '../components/log/TeamMemberRemovedComponent'
import { TeamMemberSentToBenchComponent } from '../components/log/TeamMemberSentToBenchComponent'
import { TeamRevealComponent } from '../components/log/TeamRevealComponent'

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
    if (context.game.rule?.id === RuleId.DraftRoundPhaseTeamCreation || context.game.rule?.id === RuleId.PlayoffRoundSetupPhase) {
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
    if (context.game.rule?.id === RuleId.DraftRoundPhaseTeamExchange) {
      if (isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)) {
        if (move.location.type === LocationType.PlayerHockeyPlayerHandSpot) {
          return { Component: TeamMemberSentToBenchComponent, player: move.location.player }
        }
        if (move.location.type === LocationType.PlayerHockeyPlayerTeamSpot) {
          return { Component: TeamMemberAddedFromBench, player: move.location.player }
        }
      }
    }
    if (context.game.rule?.id === RuleId.DraftRoundPhaseBusDispatch) {
      if (isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken)(move) && move.location.type === LocationType.PlayerBusTokenTeamSpot) {
        return { Component: BusAssignedToTeamComponent, player: move.location.player }
      }
    }
    if (context.game.rule?.id === RuleId.DraftRoundPhaseTeamReveal || context.game.rule?.id === RuleId.PlayoffRoundPhaseTeamReveal) {
      if (isMoveItemTypeAtOnce<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)) {
        return { Component: TeamRevealComponent, player: move.location.player }
      }
      if (isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken)(move)) {
        return { Component: BusRevealComponent, player: move.location.player }
      }
    }
    if (context.game.rule?.id === RuleId.DraftRoundPhaseMatchScore) {
      if (
        isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken)(move) &&
        move.location.type === LocationType.BusSpotOnArenaCardLadder
      ) {
        const player = new Material<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken, context.game.items[MaterialType.BusToken])
          .index(move.itemIndex)
          .getItem<KnownBusTokenId>()!.id.back
        return { Component: MatchResultComponent, player: player }
      }
    }
    if (context.game.rule?.id === RuleId.PlayoffSubstitutePlayers) {
      if (isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)) {
        if (move.location.type === LocationType.PlayerHockeyPlayerTeamSpot) {
          return { Component: TeamMemberAddedFromBench, player: move.location.player }
        }
        if (move.location.type === LocationType.HockeyPlayerDraftSpot) {
          return { Component: TeamMemberRemovedComponent, player: move.location.player }
        }
      }
    }
    return undefined
  }
}
