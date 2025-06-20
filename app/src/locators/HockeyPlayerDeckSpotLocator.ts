import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { DeckLocator, LocationDescription } from '@gamepark/react-game'
import { HockeyPlayerDeckHelp } from '../components/help/HockeyPlayerDeckHelp'

class HockeyPlayerDeckSpotLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  rotateZ = 90
  coordinates = { x: 29, y: -12 }
  locationDescription = new HockeyPlayerDeckSpotDescription()
}

class HockeyPlayerDeckSpotDescription extends LocationDescription {
  help = HockeyPlayerDeckHelp
  height = 5.6
  width = 8.7
}

export const hockeyPlayerDeckSpotLocator = new HockeyPlayerDeckSpotLocator()
