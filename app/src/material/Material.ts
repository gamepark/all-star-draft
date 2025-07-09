import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { hockeyPlayerCardDescription } from './HockeyPlayerCardDescription'
import { arenaCardDescription } from './ArenaCardDescription'
import { busTokenDescription } from './BusTokenDescription'
import { busStationBoardDescription } from './BusStationBoardDescription'
import { playoffPointCardDescription } from './PlayoffPointCardDescription'
import { tieBreakerCardDrescription } from './TieBreakerCardDescription'
import { playoffTicketTokenDescription } from './PlayoffTicketTokenDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.ArenaCard]: arenaCardDescription,
  [MaterialType.BusToken]: busTokenDescription,
  [MaterialType.BusStationBoard]: busStationBoardDescription,
  [MaterialType.HockeyPlayerCard]: hockeyPlayerCardDescription,
  [MaterialType.PlayoffPointsCard]: playoffPointCardDescription,
  [MaterialType.PlayoffTicketToken]: playoffTicketTokenDescription,
  [MaterialType.TieBreakerCard]: tieBreakerCardDrescription
}
