import {
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
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { DraftRoundSetupDrawCardsRule } from './rules/DraftRoundSetupDrawCardsRule'
import { RuleId } from './rules/RuleId'
import { DraftRoundPhaseCardSelectionRule } from './rules/DraftRoundPhaseCardSelectionRule'
import { DraftRoundPhaseTeamExchangeRule } from './rules/DraftRoundPhaseTeamExchangeRule'
import { DraftRoundPhaseTeamCreationRule } from './rules/DraftRoundPhaseTeamCreationRule'
import { DraftRoundPhaseBusDispatchRule } from './rules/DraftRoundPhaseBusDispatchRule'
import { DraftRoundPhaseTeamRevealRule } from './rules/DraftRoundPhaseTeamRevealRule'
import { DraftRoundPhaseMatchScoreRule } from './rules/DraftRoundPhaseMatchScoreRule'
import { DraftRoundPhaseMatchMoveToStadiumRule } from './rules/DraftRoundPhaseMatchMoveToStadiumRule'
import { hideTokenToOthersWhenRotatedFaceDown } from './material/HideTokenToOthersWhenRotatedFaceDown'
import { hideCardToOthersWhenRotatedFaceDown } from './material/HideCardToOthersWhenRotatedFaceDown'
import { PlayoffRoundSetupRule } from './rules/PlayoffRoundSetupRule'
import { PlayoffRoundPhaseTeamRevealRule } from './rules/PlayoffRoundPhaseTeamRevealRule'
import { PlayoffRoundPhaseMainMatchRule } from './rules/PlayoffRoundPhaseMainMatchRule'
import { PlayoffRoundPhaseTieMatchRule } from './rules/PlayoffRoundPhaseTieMatchRule'
import { PlayoffRoundPhaseScoreRule } from './rules/PlayoffRoundPhaseScoreRule'
import { PlayoffRoundPhaseInterMatchDiscardPlayersRule } from './rules/PlayoffRoundPhaseInterMatchDiscardPlayersRule'
import { PlayoffRoundPhaseInterMatchAddPlayersRule } from './rules/PlayoffRoundPhaseInterMatchAddPlayersRule'
import { DraftRoundPhaseOpenMarketCardSelectionRule } from './rules/DraftRoundPhaseOpenMarketCardSelectionRule'

/**
 * This class implements the rules of the board game.
 * It must follow Game Park "Rules" API so that the Game Park server can enforce the rules.
 */
export class AllStarDraftRules
  extends SecretMaterialRules<PlayerColor, MaterialType, LocationType>
  implements TimeLimit<MaterialGame<PlayerColor, MaterialType, LocationType>, MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>
{
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
    [RuleId.PlayoffRoundPhaseInterMatchAddPlayers]: PlayoffRoundPhaseInterMatchAddPlayersRule,
    [RuleId.PlayoffRoundPhaseInterMatchDiscardPlayers]: PlayoffRoundPhaseInterMatchDiscardPlayersRule,
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
      [LocationType.HockeyPlayerOpenMarketDraftLocator]: new FillGapStrategy(),
    },
    [MaterialType.PlayoffTicketToken]: {
      [LocationType.PlayerPlayoffTicketTokenSpot]: new PositiveSequenceStrategy()
    }
  }

  giveTime(): number {
    return 60
  }
}
