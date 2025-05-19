import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { ListLocator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

class BusTokenSpotBelowBusStationBoardLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  getCoordinates(location: Location<number, LocationType, number, number>): Partial<Coordinates> {
    const busGap = 3 // Gap between bus
    return { x: 1 + (location.x ?? 0) * -busGap, y: -9 + (location.y ?? 0) * 10 + (location.z ?? 0), z: 1 }
  }
}

export const busTokenSpotBelowBusStationBoardLocator = new BusTokenSpotBelowBusStationBoardLocator()
