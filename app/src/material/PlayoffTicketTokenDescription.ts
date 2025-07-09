import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { TieBreakerCard } from '@gamepark/all-star-draft/material/TieBreakerCard'
import { TokenDescription } from '@gamepark/react-game'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import PlayoffTicketToken from '../images/Tokens/PlayoffTicketToken.jpg'
import { PlayoffTicketTokenHelp } from '../components/help/PlayoffTicketTokenHelp'

class PlayoffTicketTokenDescription extends TokenDescription<PlayerColor, MaterialType, LocationType, TieBreakerCard> {
  height = 2.11
  width = 3.07
  image = PlayoffTicketToken
  help = PlayoffTicketTokenHelp
}

export const playoffTicketTokenDescription = new PlayoffTicketTokenDescription()
