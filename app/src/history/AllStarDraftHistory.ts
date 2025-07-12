import { css } from '@emotion/react'
import { KnownBusTokenId } from '@gamepark/all-star-draft/material/BusToken'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { LogDescription, MoveComponentContext, MovePlayedLogDescription } from '@gamepark/react-game'
import {
  isDeleteItemType,
  isDeleteItemTypeAtOnce,
  isMoveItemType,
  isMoveItemTypeAtOnce,
  isStartSimultaneousRule,
  Material,
  MaterialGame,
  MaterialMove
} from '@gamepark/rules-api'
import { BusAssignedToTeamComponent } from '../components/log/BusAssignedToTeamComponent'
import { BusRevealComponent } from '../components/log/BusRevealComponent'
import { CardDraftedComponent } from '../components/log/CardDraftedComponent'
import { MatchResultComponent } from '../components/log/MatchResultComponent'
import { PlayerEliminatedComponent } from '../components/log/PlayerEliminatedComponent'
import { PlayOffTicketLostComponent } from '../components/log/PlayOffTicketLostComponent'
import { RevealShootOutCardComponent } from '../components/log/RevealShootOutCardComponent'
import { ShootOutPlayersComponent } from '../components/log/ShootOutPlayersComponent'
import { TeamCreatedComponent } from '../components/log/TeamCreatedComponent'
import { TeamMemberAddedFromBench } from '../components/log/TeamMemberAddedFromBench'
import { TeamMemberRemovedComponent } from '../components/log/TeamMemberRemovedComponent'
import { TeamMemberSentToBenchComponent } from '../components/log/TeamMemberSentToBenchComponent'
import { TeamRevealComponent } from '../components/log/TeamRevealComponent'
import { playerColorCode } from '../panels/PlayerPanels'

const REVEAL_RULE_IDS = [RuleId.DraftRoundPhaseTeamReveal, RuleId.PlayoffRoundPhaseTeamReveal, RuleId.PlayoffSubstitutePlayers]

const panelBackground = (color: string) =>
  color !== 'yellow'
    ? css`
        background: linear-gradient(135deg, white 0%, ${color} 25%, ${color} 100%);
      `
    : css`
        background: linear-gradient(135deg, white 0%, ${color} 25%, ${color} 100%);
        color: dimgray;
      `

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
        return { Component: CardDraftedComponent, player: move.location.player, css: panelBackground(playerColorCode[move.location.player!]) }
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
        return numberOfCardsInTeam === 5
          ? { Component: TeamCreatedComponent, player: move.location.player, css: panelBackground(playerColorCode[move.location.player!]) }
          : undefined
      }
    }
    if (context.game.rule?.id === RuleId.DraftRoundPhaseTeamExchange) {
      if (isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)) {
        if (move.location.type === LocationType.PlayerHockeyPlayerHandSpot) {
          return { Component: TeamMemberSentToBenchComponent, player: move.location.player, css: panelBackground(playerColorCode[move.location.player!]) }
        }
        if (move.location.type === LocationType.PlayerHockeyPlayerTeamSpot) {
          return { Component: TeamMemberAddedFromBench, player: move.location.player, css: panelBackground(playerColorCode[move.location.player!]) }
        }
      }
    }
    if (context.game.rule?.id === RuleId.DraftRoundPhaseBusDispatch) {
      if (isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken)(move) && move.location.type === LocationType.PlayerBusTokenTeamSpot) {
        return { Component: BusAssignedToTeamComponent, player: move.location.player, css: panelBackground(playerColorCode[move.location.player!]) }
      }
    }
    if (REVEAL_RULE_IDS.includes(context.game.rule?.id ?? RuleId.DraftRoundPhaseBusDispatch)) {
      if (isMoveItemTypeAtOnce<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)) {
        return { Component: TeamRevealComponent, player: move.location.player, css: panelBackground(playerColorCode[move.location.player!]) }
      }
      if (isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken)(move)) {
        return { Component: BusRevealComponent, player: move.location.player, css: panelBackground(playerColorCode[move.location.player!]) }
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
        return { Component: MatchResultComponent, player: player, css: panelBackground(playerColorCode[player]) }
      }
    }
    if (context.game.rule?.id === RuleId.PlayoffSubstitutePlayers) {
      if (isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)) {
        if (move.location.type === LocationType.PlayerHockeyPlayerTeamSpot) {
          return { Component: TeamMemberAddedFromBench, player: move.location.player, css: panelBackground(playerColorCode[move.location.player!]) }
        }
        if (move.location.type === LocationType.HockeyPlayerDraftSpot) {
          return { Component: TeamMemberRemovedComponent, player: move.location.player, css: panelBackground(playerColorCode[move.location.player!]) }
        }
      }
    }
    if (context.game.rule?.id === RuleId.PlayoffRoundPhaseScore) {
      if (isDeleteItemType<PlayerColor, MaterialType, LocationType>(MaterialType.PlayoffTicketToken)(move)) {
        const player = context.game.items[MaterialType.PlayoffTicketToken]![move.itemIndex].location.player!
        return { Component: PlayOffTicketLostComponent, player: player, css: panelBackground(playerColorCode[player]) }
      }
      if (
        isDeleteItemTypeAtOnce<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
        context.game.items[MaterialType.HockeyPlayerCard]![move.indexes[0]].location.id !== 3
      ) {
        const player = context.game.items[MaterialType.HockeyPlayerCard]![move.indexes[0]].location.player!
        return { Component: PlayerEliminatedComponent, player: player, css: panelBackground(playerColorCode[player]) }
      }
    }
    if (isStartSimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId>(move) && move.id === RuleId.PlayoffRoundPhaseTieMatch) {
      return { Component: ShootOutPlayersComponent }
    }
    if (context.game.rule?.id === RuleId.PlayoffRoundPhaseTieMatch) {
      if (isMoveItemTypeAtOnce<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) && move.location.id === 3) {
        return { Component: RevealShootOutCardComponent, player: move.location.player, css: panelBackground(playerColorCode[move.location.player!]) }
      }
    }
    return undefined
  }
}
