import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { ListLocator } from '@gamepark/react-game'
import { Coordinates, Location, XYCoordinates } from '@gamepark/rules-api'

const coordinates: Record<number, XYCoordinates> = {
  1: { x: 8.75, y: -2.75 },
  2: { x: 8.75, y: -1.6 },
  3: { x: 8.75, y: -0.45 },
  4: { x: 8.75, y: 0.7 },
  5: { x: 8.75, y: 1.85 },
  6: { x: 8.75, y: 3 }
}

class BusSpotOnArenaCardLadderLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  parentItemType = MaterialType.ArenaCard
  gap = { x: 2, y: 0 }

  public getCoordinates(location: Location<PlayerColor, LocationType, number | undefined>): Partial<Coordinates> {
    return location.id !== undefined ? coordinates[location.id] : { x: 0, y: 0 }
  }
}

export const busSpotOnArenaCardLadderLocator = new BusSpotOnArenaCardLadderLocator()
