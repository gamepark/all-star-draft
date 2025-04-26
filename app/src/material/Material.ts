import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { hockeyPlayerCardDrescription } from './HockeyPlayerCardDescription'
import { arenaCardDrescription } from './ArenaCardDescription'
import { busTokenDrescription } from './BusTokenDescription'
import { busStationBoardDescription } from './BusStationBoardDescription'
import { playoffPointCardDescription } from './PlayoffPointCardDescription'
import { tieBreakerCardDrescription } from './TieBreakerCardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.ArenaCard]: arenaCardDrescription,
  [MaterialType.BusToken]: busTokenDrescription,
  [MaterialType.BusStationBoard]: busStationBoardDescription,
  [MaterialType.HockeyPlayerCard]: hockeyPlayerCardDrescription,
  [MaterialType.PlayoffPointsCard]: playoffPointCardDescription,
  [MaterialType.TieBreakerCard]: tieBreakerCardDrescription
}
