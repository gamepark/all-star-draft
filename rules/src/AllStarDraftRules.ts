import {
  FillGapStrategy,
  hideFrontToOthers,
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
import { hideToOthersWhenRotatedFaceDown } from './material/HideToOthersWhenRotatedFaceDown'
import { DraftRoundPhaseBusDispatchRule } from './rules/DraftRoundPhaseBusDispatchRule'

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
    [RuleId.DraftRoundPhaseBusDispatch]: DraftRoundPhaseBusDispatchRule
  }

  hidingStrategies = {
    [MaterialType.ArenaCard]: {
      [LocationType.ArenaDeckSpot]: hideItemId
    },
    [MaterialType.BusToken]: {
      [LocationType.PlayerBusTokenReserveSpot]: hideFrontToOthers
    },
    [MaterialType.HockeyPlayerCard]: {
      [LocationType.HockeyPlayerDeckSpot]: hideItemId,
      [LocationType.HockeyPlayerDraftSpot]: hideItemIdToOthers,
      [LocationType.PlayerHockeyPlayerHandSpot]: hideItemIdToOthers,
      [LocationType.PlayerHockeyPlayerTeamSpot]: hideToOthersWhenRotatedFaceDown
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
      [LocationType.PlayerBusTokenReserveSpot]: new PositiveSequenceStrategy()
    },
    [MaterialType.HockeyPlayerCard]: {
      [LocationType.HockeyPlayerDeckSpot]: new PositiveSequenceStrategy(),
      [LocationType.HockeyPlayerDraftSpot]: new PositiveSequenceStrategy(),
      [LocationType.PlayerHockeyPlayerHandSpot]: new PositiveSequenceStrategy(),
      [LocationType.PlayerHockeyPlayerTeamSpot]: new PositiveSequenceStrategy()
    },
    [MaterialType.PlayoffTicketToken]: {
      [LocationType.PlayerPlayoffTicketTokenSpot]: new PositiveSequenceStrategy()
    }
  }

  giveTime(): number {
    return 60
  }
}
