import { css } from '@emotion/react'
import { KnownBusTokenId } from '@gamepark/all-star-draft/material/BusToken'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { LogDescription, MoveComponentContext, MovePlayedLogDescription } from '@gamepark/react-game'
import {
  // GameMemory,
  isDeleteItemType,
  isDeleteItemTypeAtOnce,
  // isEndGame,
  isMoveItemType,
  isMoveItemTypeAtOnce,
  isStartSimultaneousRule,
  Material,
  MaterialGame,
  MaterialMove
} from '@gamepark/rules-api'
import { MaterialRotation } from '@gamepark/all-star-draft/material/MaterialRotation'
import { HockeyPlayerCard } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { CardDraftedComponent } from '../components/log/CardDraftedComponent'
import { MatchResultComponent } from '../components/log/MatchResultComponent'
import { PlayerEliminatedComponent } from '../components/log/PlayerEliminatedComponent'
import { PlayOffTicketLostComponent } from '../components/log/PlayOffTicketLostComponent'
import { RevealShootOutCardComponent } from '../components/log/RevealShootOutCardComponent'
import { ShootOutPlayersComponent } from '../components/log/ShootOutPlayersComponent'
import { TeamCreatedComponent } from '../components/log/TeamCreatedComponent'
import { TeamMemberAddedFromBench } from '../components/log/TeamMemberAddedFromBench'
import { TeamMemberRemovedComponent } from '../components/log/TeamMemberRemovedComponent'
import { TeamRevealComponent } from '../components/log/TeamRevealComponent'
import { playerColorCode } from '../panels/PlayerPanels'
import { CardDiscardedComponent } from '../components/log/CardDiscardedComponent'
import { PlayerGiveCardComponent } from '../components/log/PlayerGiveCardComponent'
import { PlayerReceivedCardComponent } from '../components/log/PlayerReceivedCardComponent'

const REVEAL_RULE_IDS = [RuleId.DraftRoundPhaseTeamReveal, RuleId.PlayoffRoundPhaseTeamReveal]

const getColor = (color: string) => {
  if (color === playerColorCode[PlayerColor.Black]) return 'white'
  if (color === playerColorCode[PlayerColor.Purple]) return 'white'
  if (color === playerColorCode[PlayerColor.Red]) return 'white'
  return 'black'
}

const panelBackground = (color: string) => css`
  box-shadow: 0.2em 0.2em 0.2em black;
  width: calc(100% - 0.4em);
  color: ${getColor(color)};
  //background: ${color};
  background: linear-gradient(135deg, white 0%, ${color} 25%, ${color} 100%);
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
    if (context.game.rule?.id === RuleId.DraftRoundPhaseCardSelection || context.game.rule?.id === RuleId.DraftRoundPhaseOpenMarketCardSelection) {
      if (
        isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
        move.location.type === LocationType.PlayerHockeyPlayerHandSpot
      ) {
        return { Component: CardDraftedComponent, player: move.location.player, css: panelBackground(playerColorCode[move.location.player!]) }
      }
    }
    if (context.game.rule?.id === RuleId.DraftRoundPhaseClashCardSelectionForOpponent) {
      if (
        isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
        move.location.type === LocationType.PlayerHockeyPlayerHandSpot
      ) {
        if (move.location.rotation === MaterialRotation.FaceDown) {
          const card = new Material(MaterialType.HockeyPlayerCard, context.game.items[MaterialType.HockeyPlayerCard])
            .index(move.itemIndex)
            .getItem<HockeyPlayerCard>()!
          return { Component: PlayerGiveCardComponent, player: card.location.player, css: panelBackground(playerColorCode[card.location.player!]) }
        } else if (move.reveal !== undefined) {
          return { Component: PlayerReceivedCardComponent, player: move.location.player, css: panelBackground(playerColorCode[move.location.player!]) }
        }
      }
    }
    if (context.game.rule?.id === RuleId.DraftRoundPhaseTeamCreation || context.game.rule?.id === RuleId.PlayoffRoundSetupPhase) {
      if (isDeleteItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)) {
        const deletedCard = context.game.items[MaterialType.HockeyPlayerCard]![move.itemIndex]
        return { Component: CardDiscardedComponent, player: deletedCard.location.player, css: panelBackground(playerColorCode[deletedCard.location.player!]) }
      }
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
    if (REVEAL_RULE_IDS.includes(context.game.rule?.id ?? RuleId.DraftRoundPhaseMatchScore)) {
      if (isMoveItemTypeAtOnce<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)) {
        return { Component: TeamRevealComponent, player: move.location.player, css: panelBackground(playerColorCode[move.location.player!]) }
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
        move.indexes.length > 0 &&
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
