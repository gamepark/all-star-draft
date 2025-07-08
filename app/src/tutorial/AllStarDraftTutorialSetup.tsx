import { AllStarDraftOptions } from '@gamepark/all-star-draft/AllStarDraftOptions'
import { AllStarDraftSetup } from '@gamepark/all-star-draft/AllStarDraftSetup'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RegularSeasonGameMode } from '@gamepark/all-star-draft/RegularSeasonGameMode'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'

export const me = PlayerColor.Blue
export const opponent1 = PlayerColor.Green
export const opponent2 = PlayerColor.Red

export class AllStarDraftTutorialSetup extends AllStarDraftSetup {
  public setupMaterial(_options: AllStarDraftOptions): void {
    super.setupMaterial({
      players: [
        {
          id: me
        },
        {
          id: opponent1
        },
        {
          id: opponent2
        }
      ],
      gameMode: RegularSeasonGameMode.Duel
    })
  }

  public start(): void {
    this.startSimultaneousRule(RuleId.DraftRoundSetupDrawCards)
  }
}
