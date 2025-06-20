import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { DeckLocator, LocationDescription } from '@gamepark/react-game'
import { ArenaDeckHelp } from '../components/help/ArenaDeckHelp'

class ArenaDeckSpotLocator extends DeckLocator<PlayerColor, MaterialType, LocationType> {
  locationDescription = new ArenaDeckSpotDescription
  coordinates = { x: -22, y: -11 }
}


class ArenaDeckSpotDescription extends LocationDescription {
  help = ArenaDeckHelp
  height = 9
  width = 16
}

export const arenaDeckSpotLocator = new ArenaDeckSpotLocator()
