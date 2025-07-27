import {
  CompetitiveScore,
  CustomMove,
  FillGapStrategy,
  hideItemId,
  hideItemIdToOthers,
  isDeleteItemType,
  isMoveItemType,
  isStartSimultaneousRule,
  MaterialGame,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  StackingStrategy,
  TimeLimit
} from '@gamepark/rules-api'
import { CustomMoveType } from './material/CustomMoveType'
import { hideCardToEveryoneWhenRotatedFaceDown } from './material/HideCardToEveryoneWhenRotatedFaceDown'
import { hideCardToOthersWhenRotatedFaceDown } from './material/HideCardToOthersWhenRotatedFaceDown'
import { hideTokenToOthersWhenRotatedFaceDown } from './material/HideTokenToOthersWhenRotatedFaceDown'
import { LocationType } from './material/LocationType'
import { MaterialRotation } from './material/MaterialRotation'
import { MaterialType } from './material/MaterialType'
import { Memory } from './Memory'
import { PlayerColor } from './PlayerColor'
import { DraftRoundPhaseCardSelectionRule } from './rules/DraftRoundPhaseCardSelectionRule'
import { DraftRoundPhaseMatchScoreRule } from './rules/DraftRoundPhaseMatchScoreRule'
import { DraftRoundPhaseOpenMarketCardSelectionRule } from './rules/DraftRoundPhaseOpenMarketCardSelectionRule'
import { DraftRoundPhaseTeamCreationRule } from './rules/DraftRoundPhaseTeamCreationRule'
import { DraftRoundPhaseTeamRevealRule } from './rules/DraftRoundPhaseTeamRevealRule'
import { DraftRoundSetupDrawCardsRule } from './rules/DraftRoundSetupDrawCardsRule'
import { PlayoffRoundPhaseMainMatchRule } from './rules/PlayoffRoundPhaseMainMatchRule'
import { PlayoffRoundPhaseScoreRule } from './rules/PlayoffRoundPhaseScoreRule'
import { PlayoffRoundPhaseTeamRevealRule } from './rules/PlayoffRoundPhaseTeamRevealRule'
import { PlayoffRoundPhaseTieMatchRule } from './rules/PlayoffRoundPhaseTieMatchRule'
import { PlayoffRoundSetupRule } from './rules/PlayoffRoundSetupRule'
import { PlayoffSubstitutePlayersRule } from './rules/PlayoffSubstitutePlayersRule'
import { RuleId } from './rules/RuleId'
import { MultipleListStrategy } from './strategy/MultipleListStrategy'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class AllStarDraftRules
  extends SecretMaterialRules<PlayerColor, MaterialType, LocationType>
  implements
    TimeLimit<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>,
    CompetitiveScore<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>
{
  getScore(playerId: PlayerColor): number {
    return (
      this.getMemory(playerId).remind<number>(Memory.Score) +
      this.getMemory(playerId).remind<number>(Memory.ScorePlayoff) +
      this.getMemory(playerId).remind<number>(Memory.ScoreTicket)
    )
  }

  getTieBreaker(tieBreaker: number, playerId: PlayerColor): number | undefined {
    if (tieBreaker === 1) {
      return this.getMemory(playerId).remind<number>(Memory.ScorePlayoff)
    }
    return
  }

  rules = {
    [RuleId.DraftRoundSetupDrawCards]: DraftRoundSetupDrawCardsRule,
    [RuleId.DraftRoundPhaseCardSelection]: DraftRoundPhaseCardSelectionRule,
    [RuleId.DraftRoundPhaseTeamCreation]: DraftRoundPhaseTeamCreationRule,
    [RuleId.DraftRoundPhaseTeamReveal]: DraftRoundPhaseTeamRevealRule,
    [RuleId.DraftRoundPhaseMatchScore]: DraftRoundPhaseMatchScoreRule,
    [RuleId.PlayoffRoundSetupPhase]: PlayoffRoundSetupRule,
    [RuleId.PlayoffRoundPhaseTeamReveal]: PlayoffRoundPhaseTeamRevealRule,
    [RuleId.PlayoffRoundPhaseMainMatch]: PlayoffRoundPhaseMainMatchRule,
    [RuleId.PlayoffSubstitutePlayers]: PlayoffSubstitutePlayersRule,
    [RuleId.PlayoffRoundPhaseTieMatch]: PlayoffRoundPhaseTieMatchRule,
    [RuleId.PlayoffRoundPhaseScore]: PlayoffRoundPhaseScoreRule,
    [RuleId.DraftRoundPhaseOpenMarketCardSelection]: DraftRoundPhaseOpenMarketCardSelectionRule
  }

  hidingStrategies = {
    [MaterialType.ArenaCard]: {
      [LocationType.ArenaDeckSpot]: hideItemId
    },
    [MaterialType.BusToken]: {
      [LocationType.PlayerBusTokenReserveSpot]: hideTokenToOthersWhenRotatedFaceDown,
      [LocationType.PlayerBusTokenTeamSpot]: hideTokenToOthersWhenRotatedFaceDown
    },
    [MaterialType.HockeyPlayerCard]: {
      [LocationType.HockeyPlayerDeckSpot]: hideItemId,
      [LocationType.HockeyPlayerDraftSpot]: hideItemIdToOthers,
      [LocationType.PlayerHockeyPlayerHandSpot]: hideCardToEveryoneWhenRotatedFaceDown,
      [LocationType.PlayerHockeyPlayerTeamSpot]: hideCardToOthersWhenRotatedFaceDown
    }
  }

  locationsStrategies = {
    [MaterialType.ArenaCard]: {
      [LocationType.ArenaDeckSpot]: new PositiveSequenceStrategy(),
      [LocationType.ArenaDiscardSpot]: new PositiveSequenceStrategy(),
      [LocationType.CurrentArenasRowSpot]: new FillGapStrategy()
    },
    [MaterialType.BusToken]: {
      [LocationType.BusTokenSpotBelowBusStationBoard]: new StackingStrategy(),
      [LocationType.PlayerBusTokenReserveSpot]: new FillGapStrategy(),
      [LocationType.BusSpotOnArenaCardLadder]: new MultipleListStrategy()
    },
    [MaterialType.HockeyPlayerCard]: {
      [LocationType.HockeyPlayerDeckSpot]: new PositiveSequenceStrategy(),
      [LocationType.HockeyPlayerDraftSpot]: new PositiveSequenceStrategy(),
      [LocationType.PlayerHockeyPlayerHandSpot]: new PositiveSequenceStrategy(),
      [LocationType.PlayerHockeyPlayerTeamSpot]: new PositiveSequenceStrategy(),
      [LocationType.HockeyPlayerOpenMarketDraftLocator]: new FillGapStrategy()
    },
    [MaterialType.PlayoffTicketToken]: {
      [LocationType.PlayerPlayoffTicketTokenSpot]: new PositiveSequenceStrategy()
    }
  }

  giveTime(): number {
    return 60
  }

  onCustomMove(move: CustomMove) {
    if (move.type === CustomMoveType.SortHand) {
      this.memorize(Memory.SortMedal, move.data)
    }
    return []
  }

  restoreTransientState(previousState: MaterialGame<PlayerColor, MaterialType, LocationType>) {
    super.restoreTransientState(previousState)
    this.memorize(Memory.SortMedal, previousState.memory[Memory.SortMedal])
  }

  public keepMoveSecret(move: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>): boolean {
    if (this.game.rule?.id === RuleId.PlayoffSubstitutePlayers && !(this.rulesStep as PlayoffSubstitutePlayersRule).isFirstPlayOffRound()) {
      if (
        isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) ||
        isDeleteItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)
      ) {
        const cards = this.material(MaterialType.HockeyPlayerCard)
        const playersNotEliminated = this.game.players.filter((player) => cards.player(player).length > 0)
        const teamCards = cards.location(LocationType.PlayerHockeyPlayerTeamSpot)
        return playersNotEliminated.some((player) => teamCards.player(player).rotation(MaterialRotation.FaceUp).length !== 5)
      }
    }
    return false
  }

  isUnpredictableMove(move: MaterialMove<PlayerColor, MaterialType, LocationType>, player: PlayerColor): boolean {
    return (isStartSimultaneousRule(move) && move.id === RuleId.PlayoffRoundPhaseTeamReveal) || super.isUnpredictableMove(move, player)
  }
}
