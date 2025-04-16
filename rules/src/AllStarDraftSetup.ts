import { MaterialGameSetup } from '@gamepark/rules-api'
import { AllStarDraftOptions } from './AllStarDraftOptions'
import { AllStarDraftRules } from './AllStarDraftRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'

/**
 * This class creates a new Game based on the game options
 */
export class AllStarDraftSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, AllStarDraftOptions> {
  Rules = AllStarDraftRules

  setupMaterial(_options: AllStarDraftOptions) {
    // TODO
  }

  start() {
    this.startPlayerTurn(RuleId.TheFirstStep, this.players[0])
  }
}
