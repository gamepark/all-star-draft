import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { hockeyPlayerCardDrescription } from './HockeyPlayerCardDescription'
import { arenaCardDrescription } from './ArenaCardDescription'
import { busTokenDrescription } from './BusTokenDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.ArenaCard]: arenaCardDrescription,
  [MaterialType.BusToken]: busTokenDrescription,
  [MaterialType.HockeyPlayerCard]: hockeyPlayerCardDrescription
}
