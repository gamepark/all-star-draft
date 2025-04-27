import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { Locator } from '@gamepark/react-game'
import { arenaDeckSpotLocator } from './ArenaDeckSpotLocator'
import { busStationBoardSpotLocator } from './BusStationBoardSpotLocatorf'
import { busTokenSpotBelowBusStationBoardLocator } from './BusTokenSpotBelowBusStationBoardLocator'
import { currentArenaRowSpotLocator } from './CurrentArenaRowSpotLocator'
import { hockeyPlayerDeckSpotLocator } from './HockeyPlayerDeckSpotLocator'
import { hockeyPlayerDiscardSpotLocator } from './HockeyPlayerDiscardSpotLocator'
import { hockeyPlayerDraftSpotLocator } from './HockeyPlayerDraftSpotLocator'
import { playerBusTokenReserveSpotLocator } from './PlayerBusTokenReserveSpotLocator'
import { playerHockeyPlayerHandSpotLocator } from './PlayerHockeyPlayerHandSpotLocator'
import { playerHockeyPlayerTeamSpotLocator } from './PlayerHockeyPlayerTeamSpotLocator'
import { playerPlayoffTicketTokenSpotLocator } from './PlayerPlayoffTicketTokenSpotLocator'
import { playoffPointCardSpotLocator } from './PlayoffPointCardSpotLocator'
import { tieBreakerCardSpotLocator } from './TieBreakerCardSpotLocator'

export const Locators: Partial<Record<LocationType, Locator<PlayerColor, MaterialType, LocationType>>> = {
  [LocationType.ArenaDeckSpot]: arenaDeckSpotLocator,
  [LocationType.BusStationBoardSpot]: busStationBoardSpotLocator,
  [LocationType.BusTokenSpotBelowBusStationBoard]: busTokenSpotBelowBusStationBoardLocator,
  [LocationType.CurrentArenasRowSpot]: currentArenaRowSpotLocator,
  [LocationType.HockeyPlayerDeckSpot]: hockeyPlayerDeckSpotLocator,
  [LocationType.HockeyPlayerDiscardSpot]: hockeyPlayerDiscardSpotLocator,
  [LocationType.HockeyPlayerDraftSpot]: hockeyPlayerDraftSpotLocator,
  [LocationType.PlayerBusTokenReserveSpot]: playerBusTokenReserveSpotLocator,
  [LocationType.PlayerHockeyPlayerHandSpot]: playerHockeyPlayerHandSpotLocator,
  [LocationType.PlayerHockeyPlayerTeamSpot]: playerHockeyPlayerTeamSpotLocator,
  [LocationType.PlayerPlayoffTicketTokenSpot]: playerPlayoffTicketTokenSpotLocator,
  [LocationType.PlayoffPointCardSpot]: playoffPointCardSpotLocator,
  [LocationType.TieBreakerCardSpot]: tieBreakerCardSpotLocator
}
