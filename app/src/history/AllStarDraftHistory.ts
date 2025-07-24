import { css } from '@emotion/react'
import { getBusTokenValue, KnownBusTokenId } from '@gamepark/all-star-draft/material/BusToken'
import { isStartMatchCustomMove } from '@gamepark/all-star-draft/material/CustomMoveType'
import { HockeyPlayerCard } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialRotation } from '@gamepark/all-star-draft/material/MaterialRotation'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { LogDescription, MoveComponentContext, MovePlayedLogDescription } from '@gamepark/react-game'
import {
  isDeleteItemType,
  isDeleteItemTypeAtOnce,
  isEndGame,
  isMoveItemType,
  isMoveItemTypeAtOnce,
  isStartSimultaneousRule,
  Material,
  MaterialGame,
  MaterialMove
} from '@gamepark/rules-api'
import { CardDiscardedComponent } from '../components/history/common/CardDiscardedComponent'
import { TeamMemberAddedFromBench } from '../components/history/common/TeamMemberAddedFromBench'
import { TeamRevealComponent } from '../components/history/common/TeamRevealComponent'
import { TeamRevealStartComponent } from '../components/history/common/TeamRevealStartComponent'
import { DrafRoundPlayerGiveCardComponent } from '../components/history/draft/DrafRoundPlayerGiveCardComponent'
import { DraftRoundCardDraftedComponent } from '../components/history/draft/DraftRoundCardDraftedComponent'
import { DraftRoundMatchResultComponent } from '../components/history/draft/DraftRoundMatchResultComponent'
import { DraftRoundPhaseMatchStartComponent } from '../components/history/draft/DraftRoundPhaseMatchStartComponent'
import { DraftRoundPlayerReceivedCardComponent } from '../components/history/draft/DraftRoundPlayerReceivedCardComponent'
import { DraftRoundStartComponent } from '../components/history/draft/DraftRoundStartComponent'
import { DraftRoundTeamCreatedComponent } from '../components/history/draft/DraftRoundTeamCreatedComponent'
import { DraftRoundTeamMemberSentToBenchComponent } from '../components/history/draft/DraftRoundTeamMemberSentToBenchComponent'
import { PlayOffsMatchStartComponent } from '../components/history/playoffs/PlayOffsMatchStartComponent'
import { PlayOffsPhaseStartComponent } from '../components/history/playoffs/PlayOffsPhaseStartComponent'
import { PlayOffsPlayerEliminatedComponent } from '../components/history/playoffs/PlayOffsPlayerEliminatedComponent'
import { PlayOffsPlayerEliminatedNotEnoughCardsComponent } from '../components/history/playoffs/PlayOffsPlayerEliminatedNotEnoughCardsComponent'
import { PlayOffsRoundStartComponent } from '../components/history/playoffs/PlayOffsRoundStartComponent'
import { PlayOffsWinnerComponent } from '../components/history/playoffs/PlayOffsWinnerComponent'
import { PlayOffTicketLostComponent } from '../components/history/playoffs/PlayOffTicketLostComponent'
import { RevealShootOutCardComponent } from '../components/history/playoffs/RevealShootOutCardComponent'
import { ShootOutPlayersComponent } from '../components/history/playoffs/ShootOutPlayersComponent'
import { TeamMemberRemovedComponent } from '../components/history/playoffs/TeamMemberRemovedComponent'
import { playerColorCode } from '../panels/PlayerPanels'

const REVEAL_RULE_IDS = [RuleId.DraftRoundPhaseTeamReveal, RuleId.PlayoffRoundPhaseTeamReveal]

const getColor = (color: string) => {
  switch (color) {
    case playerColorCode[PlayerColor.Black]:
    case playerColorCode[PlayerColor.Purple]:
    case playerColorCode[PlayerColor.Red]:
      return 'white'
    default:
      return 'black'
  }
}

const panelBackground = (color: string) => css`
  box-shadow: 0.2em 0.2em 0.2em black;
  width: calc(100% - 0.4em);
  color: ${getColor(color)};
  background: linear-gradient(135deg, white 0%, ${color} 25%, ${color} 100%);
`

const rulesPanelBackground = css`
  box-shadow: 0.2em 0.2em 0.2em black;
  width: calc(100% - 0.4em);
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
    if (isStartSimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId>(move)) {
      if (move.id === RuleId.DraftRoundSetupDrawCards) {
        return { Component: DraftRoundStartComponent, css: rulesPanelBackground }
      }
      if (move.id === RuleId.DraftRoundPhaseTeamReveal || move.id === RuleId.PlayoffRoundPhaseTeamReveal) {
        return { Component: TeamRevealStartComponent, css: rulesPanelBackground }
      }
      if (move.id === RuleId.PlayoffRoundSetupPhase) {
        return { Component: PlayOffsPhaseStartComponent, css: rulesPanelBackground }
      }
      if (move.id === RuleId.PlayoffSubstitutePlayers) {
        return { Component: PlayOffsRoundStartComponent, css: rulesPanelBackground }
      }
      if (move.id === RuleId.PlayoffRoundPhaseMainMatch) {
        return { Component: PlayOffsMatchStartComponent, css: rulesPanelBackground }
      }
      if (move.id === RuleId.PlayoffRoundPhaseTieMatch) {
        return { Component: ShootOutPlayersComponent }
      }
    }
    if (isStartMatchCustomMove(move)) {
      return { Component: DraftRoundPhaseMatchStartComponent, css: rulesPanelBackground }
    }
    if (context.game.rule?.id === RuleId.DraftRoundPhaseCardSelection || context.game.rule?.id === RuleId.DraftRoundPhaseOpenMarketCardSelection) {
      if (
        isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
        move.location.type === LocationType.PlayerHockeyPlayerHandSpot
      ) {
        return { Component: DraftRoundCardDraftedComponent, player: move.location.player, css: panelBackground(playerColorCode[move.location.player!]) }
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
          return { Component: DrafRoundPlayerGiveCardComponent, player: card.location.player, css: panelBackground(playerColorCode[card.location.player!]) }
        } else if (move.reveal !== undefined) {
          return {
            Component: DraftRoundPlayerReceivedCardComponent,
            player: move.location.player,
            css: panelBackground(playerColorCode[move.location.player!])
          }
        }
      }
    }
    if (context.game.rule?.id === RuleId.DraftRoundPhaseTeamCreation || context.game.rule?.id === RuleId.PlayoffRoundSetupPhase) {
      if (isDeleteItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)) {
        const deletedCard = context.game.items[MaterialType.HockeyPlayerCard]![move.itemIndex]
        return { Component: CardDiscardedComponent, player: deletedCard.location.player, css: panelBackground(playerColorCode[deletedCard.location.player!]) }
      }
      if (isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)) {
        if (move.location.type === LocationType.PlayerHockeyPlayerTeamSpot) {
          const roundNumber = new Material<PlayerColor, MaterialType, LocationType>(
            MaterialType.ArenaCard,
            context.game.items[MaterialType.ArenaCard]
          ).location(LocationType.CurrentArenasRowSpot).length
          if (move.location.id < roundNumber) {
            return { Component: TeamMemberAddedFromBench, player: move.location.player, css: panelBackground(playerColorCode[move.location.player!]) }
          }
          const numberOfCardsInTeam =
            new Material(MaterialType.HockeyPlayerCard, context.game.items[MaterialType.HockeyPlayerCard])
              .location(LocationType.PlayerHockeyPlayerTeamSpot)
              .player(move.location.player)
              .locationId(move.location.id).length + 1
          return numberOfCardsInTeam === 5
            ? { Component: DraftRoundTeamCreatedComponent, player: move.location.player, css: panelBackground(playerColorCode[move.location.player!]) }
            : undefined
        }
        if (move.location.type === LocationType.PlayerHockeyPlayerHandSpot) {
          return {
            Component: DraftRoundTeamMemberSentToBenchComponent,
            player: move.location.player,
            css: panelBackground(playerColorCode[move.location.player!])
          }
        }
      }
    }
    if (REVEAL_RULE_IDS.includes(context.game.rule?.id ?? RuleId.DraftRoundPhaseMatchScore)) {
      if (isMoveItemTypeAtOnce<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)) {
        return { Component: TeamRevealComponent, player: move.location.player, css: panelBackground(playerColorCode[move.location.player!]), depth: 1 }
      }
    }
    if (context.game.rule?.id === RuleId.DraftRoundPhaseMatchScore) {
      if (
        isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken)(move) &&
        move.location.type === LocationType.BusTokenSpotBelowBusStationBoard
      ) {
        const busTokenMaterial = new Material<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken, context.game.items[MaterialType.BusToken])
        const matchNumber = getBusTokenValue(busTokenMaterial.index(move.itemIndex).getItem<KnownBusTokenId>()!.id.front)
        const isFirstBusMove =
          context.consequenceIndex ===
          context.action.consequences.findIndex(
            (m) =>
              isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken)(m) &&
              m.location.type === LocationType.BusTokenSpotBelowBusStationBoard &&
              getBusTokenValue(busTokenMaterial.index(m.itemIndex).getItem<KnownBusTokenId>()!.id.front) === matchNumber
          )
        const player = new Material<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken, context.game.items[MaterialType.BusToken])
          .index(move.itemIndex)
          .getItem<KnownBusTokenId>()!.id.back
        return {
          Component: DraftRoundMatchResultComponent,
          player: player,
          css: panelBackground(playerColorCode[player]),
          depth: isFirstBusMove ? undefined : 1
        }
      }
    }
    if (context.game.rule?.id === RuleId.PlayoffSubstitutePlayers) {
      if (isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)) {
        if (move.location.type === LocationType.PlayerHockeyPlayerTeamSpot) {
          return { Component: TeamMemberAddedFromBench, player: move.location.player, css: panelBackground(playerColorCode[move.location.player!]) }
        }
      }
      if (isDeleteItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)) {
        const deletedCard = context.game.items[MaterialType.HockeyPlayerCard]![move.itemIndex]
        if (deletedCard.location.type === LocationType.PlayerHockeyPlayerTeamSpot) {
          return {
            Component: TeamMemberRemovedComponent,
            player: deletedCard.location.player,
            css: panelBackground(playerColorCode[deletedCard.location.player!])
          }
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
        const eliminationMovesForThisAction = context.action.consequences
          .filter(isDeleteItemTypeAtOnce<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard))
          .filter((m) => m.indexes.length > 0)
        if (eliminationMovesForThisAction.findIndex((m) => m === move) > 0) {
          return { Component: PlayOffsPlayerEliminatedNotEnoughCardsComponent, player: player, css: panelBackground(playerColorCode[player]) }
        }
        return { Component: PlayOffsPlayerEliminatedComponent, player: player, css: panelBackground(playerColorCode[player]) }
      }
    }
    if (context.game.rule?.id === RuleId.PlayoffRoundPhaseTieMatch) {
      if (isMoveItemTypeAtOnce<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) && move.location.id === 3) {
        return { Component: RevealShootOutCardComponent, player: move.location.player, css: panelBackground(playerColorCode[move.location.player!]) }
      }
    }
    if (isEndGame<PlayerColor, MaterialType, LocationType>(move)) {
      const hockeyPlayerCardsMaterial = new Material<PlayerColor, MaterialType, LocationType>(
        MaterialType.HockeyPlayerCard,
        context.game.items[MaterialType.HockeyPlayerCard]
      )
      const winningPlayer = context.game.players.find((p) => hockeyPlayerCardsMaterial.player(p).length > 0)
      if (winningPlayer !== undefined) {
        return { Component: PlayOffsWinnerComponent, player: winningPlayer, css: panelBackground(playerColorCode[winningPlayer]) }
      }
    }
    return undefined
  }
}
