import { PlayerTurnRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'

export class DraftRoundPhaseMatchScoreRule extends PlayerTurnRule<PlayerColor, MaterialType, LocationType> {}
