import { MaterialGameSetup } from '@gamepark/rules-api'
import { AllStarDraftOptions } from './AllStarDraftOptions'
import { AllStarDraftRules } from './AllStarDraftRules'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'
import { arenaCards, arenaCardsForTwoPlayers } from './material/ArenaCard'
import { selectHockeyPlayerCardsForRandomSpecies } from './material/HockeyPlayerCard'
import { busTokensByPlayerColor } from './material/BusToken'
import { Memorize } from './Memorize'

/**
 * This class creates a new Game based on the game options
 */
export class AllStarDraftSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, AllStarDraftOptions> {
  Rules = AllStarDraftRules

  setupMaterial(_options: AllStarDraftOptions) {
    console.log('Setting up')
    this.setupCards()
    this.setupTokens()
    this.game.players.forEach((player) => this.memorize<number>(Memorize.Score, 0, player))
  }

  start() {
    this.startPlayerTurn(RuleId.DraftRoundSetupDrawCards)
  }

  setupCards() {
    const availableArenaCards = this.rules.players.length === 2 ? arenaCardsForTwoPlayers : arenaCards
    this.material(MaterialType.ArenaCard).createItemsAtOnce(
      availableArenaCards.map((card) => ({
        id: card,
        location: {
          type: LocationType.ArenaDeckSpot
        }
      }))
    )
    this.material(MaterialType.HockeyPlayerCard).createItemsAtOnce(
      selectHockeyPlayerCardsForRandomSpecies(this.rules.players.length * 2).map((card) => ({
        id: card,
        location: {
          type: LocationType.HockeyPlayerDeckSpot
        }
      }))
    )
    this.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDeckSpot).shuffle()
    this.material(MaterialType.ArenaCard).location(LocationType.ArenaDeckSpot).shuffle()
  }

  setupTokens() {
    this.rules.players.forEach((playerColor) => {
      this.material(MaterialType.BusToken).createItems(
        busTokensByPlayerColor[playerColor].map((bus) => ({
          id: { back: playerColor, front: bus },
          location: {
            player: playerColor,
            type: LocationType.PlayerBusTokenReserveSpot
          }
        }))
      )
    })
    this.rules.players.forEach((playerColor) => {
      for (let i = 0; i < 4 - this.rules.players.length; i++) {
        this.material(MaterialType.PlayoffTicketToken).createItem({
          location: { player: playerColor, type: LocationType.PlayerPlayoffTicketTokenSpot }
        })
      }
    })
  }
}
