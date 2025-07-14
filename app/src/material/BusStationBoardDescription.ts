import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { CardDescription, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import BusStationBoard from '../images/Boards/BusStationBoard.jpg'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { BusStationBoardHelp } from '../components/help/BusStationBoardHelp'

class BusStationBoardDescription extends CardDescription<PlayerColor, MaterialType, LocationType> {
  height = 9
  width = 16
  image = BusStationBoard
  help = BusStationBoardHelp

  getStaticItems(_context: MaterialContext<PlayerColor, MaterialType, LocationType>): MaterialItem<number, LocationType>[] {
    return [{ location: { type: LocationType.BusStationBoardSpot } }]
  }
}

export const busStationBoardDescription = new BusStationBoardDescription()
