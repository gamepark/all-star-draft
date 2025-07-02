import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { DeckLocator, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { HockeyPlayerDeckHelp } from '../components/help/HockeyPlayerDeckHelp'
import { Coordinates, Location } from '@gamepark/rules-api'

class HockeyPlayerDeckSpotLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  rotateZ = 90

  getCoordinates(_location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): Partial<Coordinates> {
    const playerCount = context.rules.players.length
    return playerCount < 3 ? { x: -66, y: -33 } : { x: 29, y: -12 }
  }

  locationDescription = new HockeyPlayerDeckSpotDescription()
}

class HockeyPlayerDeckSpotDescription extends LocationDescription {
  help = HockeyPlayerDeckHelp
  height = 5.6
  width = 8.7
}

export const hockeyPlayerDeckSpotLocator = new HockeyPlayerDeckSpotLocator()
