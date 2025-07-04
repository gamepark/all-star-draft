import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

class TieBreakerCardSpotLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  getCoordinates(_location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): Partial<Coordinates> {
    const playerCount = context.rules.players.length
    switch (playerCount) {
      case 2:
        return { x: -55, y: -28 }
      case 3:
        return { x: -69, y: 8 }
      default:
        return { x: 29, y: 0 }
    }
  }
}

export const tieBreakerCardSpotLocator = new TieBreakerCardSpotLocator()
