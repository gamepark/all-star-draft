import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { ListLocator } from '@gamepark/react-game'

class CurrentArenasRowSpotLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  coordinates = { x: 6, y: -11 }
  gap = { y: 10 }
}

export const currentArenasRowSpotLocator = new CurrentArenasRowSpotLocator()
