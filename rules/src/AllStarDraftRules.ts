import {
  CompetitiveScore,
  FillGapStrategy,
  hideItemId,
  hideItemIdToOthers,
  MaterialGame,
  MaterialMove,
  PositiveSequenceStrategy,
  SecretMaterialRules,
  StackingStrategy,
  TimeLimit
} from '@gamepark/rules-api'
import { hideCardToOthersWhenRotatedFaceDown } from './material/HideCardToOthersWhenRotatedFaceDown'
import { hideTokenToOthersWhenRotatedFaceDown } from './material/HideTokenToOthersWhenRotatedFaceDown'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { Memorize } from './Memorize'
import { PlayerColor } from './PlayerColor'
import { DraftRoundPhaseBusDispatchRule } from './rules/DraftRoundPhaseBusDispatchRule'
import { DraftRoundPhaseCardSelectionRule } from './rules/DraftRoundPhaseCardSelectionRule'
import { DraftRoundPhaseClashCardSelectionForOpponentRule } from './rules/DraftRoundPhaseClashCardSelectionForOpponentRule'
import { DraftRoundPhaseDiscardCardOverflowRule } from './rules/DraftRoundPhaseDiscardCardOverflowRule'
import { DraftRoundPhaseMatchMoveToStadiumRule } from './rules/DraftRoundPhaseMatchMoveToStadiumRule'
import { DraftRoundPhaseMatchScoreRule } from './rules/DraftRoundPhaseMatchScoreRule'
import { DraftRoundPhaseOpenMarketCardSelectionRule } from './rules/DraftRoundPhaseOpenMarketCardSelectionRule'
import { DraftRoundPhaseTeamCreationRule } from './rules/DraftRoundPhaseTeamCreationRule'
import { DraftRoundPhaseTeamExchangeRule } from './rules/DraftRoundPhaseTeamExchangeRule'
import { DraftRoundPhaseTeamRevealRule } from './rules/DraftRoundPhaseTeamRevealRule'
import { DraftRoundSetupDrawCardsRule } from './rules/DraftRoundSetupDrawCardsRule'
import { PlayoffRoundPhaseMainMatchRule } from './rules/PlayoffRoundPhaseMainMatchRule'
import { PlayoffRoundPhaseScoreRule } from './rules/PlayoffRoundPhaseScoreRule'
import { PlayoffRoundPhaseTeamRevealRule } from './rules/PlayoffRoundPhaseTeamRevealRule'
import { PlayoffRoundPhaseTieMatchRule } from './rules/PlayoffRoundPhaseTieMatchRule'
import { PlayoffRoundSetupRule } from './rules/PlayoffRoundSetupRule'
import { PlayoffSubstitutePlayersRule } from './rules/PlayoffSubstitutePlayersRule'
import { RuleId } from './rules/RuleId'

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
      this.getMemory(playerId).remind<number>(Memorize.Score) +
      this.getMemory(playerId).remind<number>(Memorize.ScorePlayoff) +
      this.getMemory(playerId).remind<number>(Memorize.ScoreTicket)
    )
  }

  getTieBreaker(tieBreaker: number, playerId: PlayerColor): number | undefined {
    if (tieBreaker === 1) {
      return this.getMemory(playerId).remind<number>(Memorize.ScorePlayoff)
    }
    return
  }

  rules = {
    [RuleId.DraftRoundSetupDrawCards]: DraftRoundSetupDrawCardsRule,
    [RuleId.DraftRoundPhaseCardSelection]: DraftRoundPhaseCardSelectionRule,
    [RuleId.DraftRoundPhaseTeamExchange]: DraftRoundPhaseTeamExchangeRule,
    [RuleId.DraftRoundPhaseTeamCreation]: DraftRoundPhaseTeamCreationRule,
    [RuleId.DraftRoundPhaseBusDispatch]: DraftRoundPhaseBusDispatchRule,
    [RuleId.DraftRoundPhaseTeamReveal]: DraftRoundPhaseTeamRevealRule,
    [RuleId.DraftRoundPhaseMatchScore]: DraftRoundPhaseMatchScoreRule,
    [RuleId.DraftRoundPhaseMatchMoveToStadium]: DraftRoundPhaseMatchMoveToStadiumRule,
    [RuleId.PlayoffRoundSetupPhase]: PlayoffRoundSetupRule,
    [RuleId.PlayoffRoundPhaseTeamReveal]: PlayoffRoundPhaseTeamRevealRule,
    [RuleId.PlayoffRoundPhaseMainMatch]: PlayoffRoundPhaseMainMatchRule,
    [RuleId.PlayoffSubstitutePlayers]: PlayoffSubstitutePlayersRule,
    [RuleId.PlayoffRoundPhaseTieMatch]: PlayoffRoundPhaseTieMatchRule,
    [RuleId.PlayoffRoundPhaseScore]: PlayoffRoundPhaseScoreRule,
    [RuleId.DraftRoundPhaseOpenMarketCardSelection]: DraftRoundPhaseOpenMarketCardSelectionRule,
    [RuleId.DraftRoundPhaseDiscardCardOverflow]: DraftRoundPhaseDiscardCardOverflowRule,
    [RuleId.DraftRoundPhaseClashCardSelectionForOpponent]: DraftRoundPhaseClashCardSelectionForOpponentRule
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
      [LocationType.PlayerHockeyPlayerHandSpot]: hideItemIdToOthers,
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
      [LocationType.PlayerBusTokenReserveSpot]: new FillGapStrategy()
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
}
