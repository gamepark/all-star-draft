import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { MaterialDescription } from '@gamepark/react-game'
import { hockeyPlayerCardDrescription } from './HockeyPlayerCardDescription'

export const Material: Partial<Record<MaterialType, MaterialDescription>> = {
  [MaterialType.HockeyPlayerCard]: hockeyPlayerCardDrescription
}
