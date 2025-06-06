import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import BusStationBoard from '../images/Boards/BusStationBoard.jpg'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'

class BusStationBoardDescription extends BoardDescription<PlayerColor, MaterialType, LocationType> {
  height = 9
  width = 16
  image = BusStationBoard

  getStaticItems(_context: MaterialContext<PlayerColor, MaterialType, LocationType>): MaterialItem<number, LocationType>[] {
    return [{ location: { type: LocationType.BusStationBoardSpot } }]
  }
}

export const busStationBoardDescription = new BusStationBoardDescription()
