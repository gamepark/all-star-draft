import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { CardDescription, MaterialContext } from '@gamepark/react-game'
import { MaterialItem } from '@gamepark/rules-api'
import PlayoffPointCard from '../images/Cards/PlayoffPointCard.jpg'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { PlayoffPointCardHelp } from '../components/help/PlayoffPointCardHelp'

class PlayoffPointCardDescription extends CardDescription<PlayerColor, MaterialType, LocationType> {
  height = 5.6
  width = 8.7
  image = PlayoffPointCard
  help = PlayoffPointCardHelp

  getStaticItems(_context: MaterialContext<PlayerColor, MaterialType, LocationType>): MaterialItem<number, LocationType>[] {
    return [{ location: { type: LocationType.PlayoffPointCardSpot } }]
  }
}

export const playoffPointCardDescription = new PlayoffPointCardDescription()
