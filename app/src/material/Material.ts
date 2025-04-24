import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { hockeyPlayerCardDrescription } from './HockeyPlayerCardDescription'
import { arenaCardDrescription } from './ArenaCardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.ArenaCard]: arenaCardDrescription,
  [MaterialType.HockeyPlayerCard]: hockeyPlayerCardDrescription
}
