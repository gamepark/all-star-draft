import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { DeckLocator } from '@gamepark/react-game'

class ArenaDeckSpotLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  coordinates = { x: -22, y: -11 }
}

export const arenaDeckSpotLocator = new ArenaDeckSpotLocator()
