import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { ListLocator } from '@gamepark/react-game'

class HockeyPlayerOpenMarketDraftLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  coordinates = { x: -10, y: -17 }
  gap = { x: 10 }
}

export const hockeyPlayerOpenMarketDraftLocator = new HockeyPlayerOpenMarketDraftLocator()
