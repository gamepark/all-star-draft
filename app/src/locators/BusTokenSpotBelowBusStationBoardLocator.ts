import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

class BusTokenSpotBelowBusStationBoardLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  getCoordinates(
    location: Location<number, LocationType, number, number>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType>
  ): Partial<Coordinates> {
    const busGap = 3 // Gap between bus
    const coordinates = context.locators[LocationType.BusStationBoardSpot]?.getCoordinates(location, context)
    return { x: (coordinates?.x ?? 0) + 6 + (location.x ?? 0) * -busGap, y: (coordinates?.y ?? 0) + 2 + (location.y ?? 0) * 10 + (location.z ?? 0), z: 1 }
  }
}

export const busTokenSpotBelowBusStationBoardLocator = new BusTokenSpotBelowBusStationBoardLocator()
