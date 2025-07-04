import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { DeckLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

class ArenaDiscardSpotLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  getCoordinates(_location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): Partial<Coordinates> {
    const playerCount = context.rules.players.length
    switch (playerCount) {
      case 2:
        return { x: -62, y: 5 }
      case 3:
        return { x: -55, y: 12 }
      default:
        return { x: -22, y: -1 }
    }
  }
}

export const arenaDiscardSpotLocator = new ArenaDiscardSpotLocator()
