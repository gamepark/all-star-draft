import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { TieBreakerCard } from '@gamepark/all-star-draft/material/TieBreakerCard'
import { CardDescription, MaterialContext } from '@gamepark/react-game'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import TieBreakerCard2_4 from '../images/Cards/TieBreakerCard2_4.jpg'
import TieBreakerCard5_6 from '../images/Cards/TieBreakerCard5_6.jpg'
import { MaterialItem } from '@gamepark/rules-api'

class TieBreakerCardDescription extends CardDescription<PlayerColor, MaterialType, LocationType, TieBreakerCard> {
  height = 16
  width = 9
  images = {
    [TieBreakerCard.PlayerNumber_2_4]: TieBreakerCard2_4,
    [TieBreakerCard.PlayerNumber_5_6]: TieBreakerCard5_6
  }

  getStaticItems(_context: MaterialContext<PlayerColor, MaterialType, LocationType>): MaterialItem<number, LocationType>[] {
    return [{ location: { type: LocationType.TieBreakerCardSpot } }]
  }
}

export const tieBreakerCardDrescription = new TieBreakerCardDescription()
