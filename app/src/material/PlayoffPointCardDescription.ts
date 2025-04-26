import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { BoardDescription, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import PlayoffPointCard from '../images/Cards/PlayoffPointCard.jpg'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'

class PlayoffPointCardDescription extends BoardDescription<PlayerColor, MaterialType, LocationType> {
  height = 5.6
  width = 8.7
  image = PlayoffPointCard

  getStaticItems(_context: MaterialContext<PlayerColor, MaterialType, LocationType>): MaterialItem<number, LocationType>[] {
    return [{ location: { type: LocationType.PlayoffPointCardSpot } }]
  }
}

export const playoffPointCardDescription = new PlayoffPointCardDescription()
