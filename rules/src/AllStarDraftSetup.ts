import { MaterialGameSetup } from '@gamepark/rules-api'
import { AllStarDraftOptions } from './AllStarDraftOptions'
import { AllStarDraftRules } from './AllStarDraftRules'
import { arenaCards, arenaCardsForTwoPlayers } from './material/ArenaCard'
import { busTokensByPlayerColor } from './material/BusToken'
import { selectHockeyPlayerCardsForRandomSpecies } from './material/HockeyPlayerCard'
import { LocationType } from './material/LocationType'
import { MaterialRotation } from './material/MaterialRotation'
import { MaterialType } from './material/MaterialType'
import { Memorize } from './Memorize'
import { PlayerColor } from './PlayerColor'
import { RuleId } from './rules/RuleId'
import { TwoPlayersMode } from './TwoPlayersMode'

/**
 * This class creates a new Game based on the game options
 */
export class AllStarDraftSetup extends MaterialGameSetup<PlayerColor, MaterialType, LocationType, AllStarDraftOptions> {
  Rules = AllStarDraftRules

  setupMaterial(options: Partial<AllStarDraftOptions>) {
    const gameMode = options.gameMode ?? TwoPlayersMode.Clash
    if (this.players.length === 2) {
      this.memorize<TwoPlayersMode>(Memorize.GameMode, gameMode)
    }
    this.setupCards(gameMode)
    this.setupTokens()
    this.memorize<number>(Memorize.RoundNumber, 0)
    this.game.players.forEach((player) => {
      this.memorize<number>(Memorize.Score, 0, player)
      this.memorize<number>(Memorize.ScorePlayoff, 0, player)
      this.memorize<number>(Memorize.ScoreTicket, 0, player)
    })
  }

  start() {
    this.startPlayerTurn(RuleId.DraftRoundSetupDrawCards)
  }

  setupCards(gameMode: TwoPlayersMode) {
    const availableArenaCards = this.rules.players.length === 2 ? arenaCardsForTwoPlayers : arenaCards
    this.material(MaterialType.ArenaCard).createItemsAtOnce(
      availableArenaCards.map((card) => ({
        id: card,
        location: {
          type: LocationType.ArenaDeckSpot
        }
      }))
    )
    if (this.players.length === 2) {
      this.material(MaterialType.HockeyPlayerCard).createItemsAtOnce(
        selectHockeyPlayerCardsForRandomSpecies(gameMode === TwoPlayersMode.FreeAgency ? 6 : 5).map((card) => ({
          id: card,
          location: {
            type: LocationType.HockeyPlayerDeckSpot
          }
        }))
      )
    } else
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
            type: LocationType.PlayerBusTokenReserveSpot,
            rotation: MaterialRotation.FaceDown
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
