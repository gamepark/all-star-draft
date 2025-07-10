import { AllStarDraftOptions } from '@gamepark/all-star-draft/AllStarDraftOptions'
import { AllStarDraftSetup } from '@gamepark/all-star-draft/AllStarDraftSetup'
import { ArenaCard } from '@gamepark/all-star-draft/material/ArenaCard'
import { getHockeyPlayerCardSymbol, HockeyPlayerCard, HockeyPlayerCardSymbolsType } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { TwoPlayersMode } from '@gamepark/all-star-draft/TwoPlayersMode'

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
      gameMode: TwoPlayersMode.Clash
    })
    //Send a card with a symbol at the top of the deck
    this.material(MaterialType.HockeyPlayerCard)
      .location(LocationType.HockeyPlayerDeckSpot)
      .id((id) => getHockeyPlayerCardSymbol(id as HockeyPlayerCard) !== HockeyPlayerCardSymbolsType.None)
      .moveItem({ type: LocationType.HockeyPlayerDeckSpot, x: 53 })
    this.material(MaterialType.ArenaCard).location(LocationType.ArenaDeckSpot).id(ArenaCard.Polarena1).moveItem({ type: LocationType.ArenaDeckSpot, x: 14 })
    this.material(MaterialType.ArenaCard).location(LocationType.ArenaDeckSpot).id(ArenaCard.DamStadium2).moveItem({ type: LocationType.ArenaDeckSpot, x: 13 })
    this.material(MaterialType.ArenaCard).location(LocationType.ArenaDeckSpot).id(ArenaCard.PuddlePark2).moveItem({ type: LocationType.ArenaDeckSpot, x: 12 })
    this.material(MaterialType.ArenaCard).location(LocationType.ArenaDeckSpot).id(ArenaCard.ComboStadium1).moveItem({ type: LocationType.ArenaDeckSpot, x: 11 })
  }

  public start(): void {
    this.startSimultaneousRule(RuleId.DraftRoundSetupDrawCards)
  }
}
