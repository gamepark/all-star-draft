import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { TieBreakerCard } from '@gamepark/all-star-draft/material/TieBreakerCard'
import { MaterialContext, TokenDescription } from '@gamepark/react-game'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import PlayoffTicketToken from '../images/Tokens/PlayoffTicketToken.jpg'
import { MaterialItem } from '@gamepark/rules-api'

class PlayoffTicketTokenDescription extends TokenDescription<PlayerColor, MaterialType, LocationType, TieBreakerCard> {
  height = 2.11
  width = 3.07
  image = PlayoffTicketToken

  getStaticItems(_context: MaterialContext<PlayerColor, MaterialType, LocationType>): MaterialItem<number, LocationType>[] {
    return [{ location: { type: LocationType.PlayerPlayoffTicketTokenSpot } }]
  }
}

export const playoffTicketTokenDescription = new PlayoffTicketTokenDescription()
