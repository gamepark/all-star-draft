import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { arenaDeckSpotLocator } from './ArenaDeckSpotLocator'
import { arenaDiscardSpotLocator } from './ArenaDiscardSpotLocator'
import { busSpotOnArenaCardLadderLocator } from './BusSpotOnArenaCardLadderLocator'
import { busStationBoardSpotLocator } from './BusStationBoardSpotLocatorf'
import { busTokenSpotBelowBusStationBoardLocator } from './BusTokenSpotBelowBusStationBoardLocator'
import { currentArenasRowSpotLocator } from './CurrentArenasRowSpotLocator'
import { hockeyPlayerDeckSpotLocator } from './HockeyPlayerDeckSpotLocator'
import { hockeyPlayerDraftSpotLocator } from './HockeyPlayerDraftSpotLocator'
import { playerBusTokenReserveSpotLocator } from './PlayerBusTokenReserveSpotLocator'
import { playerHockeyPlayerHandSpotLocator } from './PlayerHockeyPlayerHandSpotLocator'
import { playerHockeyPlayerTeamSpotLocator } from './PlayerHockeyPlayerTeamSpotLocator'
import { playerPlayoffTicketTokenSpotLocator } from './PlayerPlayoffTicketTokenSpotLocator'
import { playoffPointCardSpotLocator } from './PlayoffPointCardSpotLocator'
import { tieBreakerCardSpotLocator } from './TieBreakerCardSpotLocator'
import { playerBusTokenTeamSpotLocator } from './PlayerBusTokenTeamSpotLocator'
import { hockeyPlayerOpenMarketDraftLocator } from './HockeyPlayerOpenMarketDraftLocator'
import { playerReminderLocator } from './PlayerReminderLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.ArenaDeckSpot]: arenaDeckSpotLocator,
  [LocationType.ArenaDiscardSpot]: arenaDiscardSpotLocator,
  [LocationType.BusStationBoardSpot]: busStationBoardSpotLocator,
  [LocationType.BusTokenSpotBelowBusStationBoard]: busTokenSpotBelowBusStationBoardLocator,
  [LocationType.CurrentArenasRowSpot]: currentArenasRowSpotLocator,
  [LocationType.HockeyPlayerDeckSpot]: hockeyPlayerDeckSpotLocator,
  [LocationType.HockeyPlayerDraftSpot]: hockeyPlayerDraftSpotLocator,
  [LocationType.PlayerBusTokenReserveSpot]: playerBusTokenReserveSpotLocator,
  [LocationType.PlayerBusTokenTeamSpot]: playerBusTokenTeamSpotLocator,
  [LocationType.PlayerHockeyPlayerHandSpot]: playerHockeyPlayerHandSpotLocator,
  [LocationType.PlayerHockeyPlayerTeamSpot]: playerHockeyPlayerTeamSpotLocator,
  [LocationType.PlayerPlayoffTicketTokenSpot]: playerPlayoffTicketTokenSpotLocator,
  [LocationType.PlayoffPointCardSpot]: playoffPointCardSpotLocator,
  [LocationType.TieBreakerCardSpot]: tieBreakerCardSpotLocator,
  [LocationType.HockeyPlayerOpenMarketDraftLocator]: hockeyPlayerOpenMarketDraftLocator,
  [LocationType.PlayerReminderSpot]: playerReminderLocator,
  [LocationType.BusSpotOnArenaCardLadder]: busSpotOnArenaCardLadderLocator
}
