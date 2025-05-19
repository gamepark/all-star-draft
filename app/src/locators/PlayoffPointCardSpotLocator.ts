import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { Locator } from '@gamepark/react-game'

class PlayoffPointCardSpotLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  coordinates = { x: 29, y: 12 }
}

export const playoffPointCardSpotLocator = new PlayoffPointCardSpotLocator()
