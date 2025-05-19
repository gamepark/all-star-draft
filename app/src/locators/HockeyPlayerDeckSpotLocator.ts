import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { DeckLocator } from '@gamepark/react-game'

class HockeyPlayerDeckSpotLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  rotateZ = 90
  coordinates = { x: 29, y: -12 }
}

export const hockeyPlayerDeckSpotLocator = new HockeyPlayerDeckSpotLocator()
