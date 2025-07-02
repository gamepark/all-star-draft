import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { DeckLocator, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { ArenaDeckHelp } from '../components/help/ArenaDeckHelp'
import { Location, Coordinates } from '@gamepark/rules-api'

class ArenaDeckSpotLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  locationDescription = new ArenaDeckSpotDescription()

  getCoordinates(_location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): Partial<Coordinates> {
    const playerCount = context.rules.players.length
    return playerCount < 3 ? { x: -62, y: -7 } : { x: -22, y: -11 }
  }
}

class ArenaDeckSpotDescription extends LocationDescription {
  help = ArenaDeckHelp
  height = 9
  width = 16
}

export const arenaDeckSpotLocator = new ArenaDeckSpotLocator()
