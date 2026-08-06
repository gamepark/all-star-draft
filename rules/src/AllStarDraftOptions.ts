import { getEnumValues, OptionsSpecV2 } from '@gamepark/rules-api'
import { PlayerColor, playerColors } from './PlayerColor'
import { TwoPlayersMode } from './TwoPlayersMode'

/**
 * This is the options for each player in the game.
 */
type PlayerOptions = { id: PlayerColor }

/**
 * This is the type of object that the game receives when a new game is started.
 * The first generic parameter, "{}", can be changed to include game options like variants or expansions.
 */
export type AllStarDraftOptions = {
  players: PlayerOptions[]
  gameMode: TwoPlayersMode
}

/**
 * The option space of all-star-draft: structure only.
 *
 * Labels live in the game's presentation document, published beside its translations at
 * `/options/<locale>.json` and keyed by convention. Subscription and competitive gates live in
 * the platform database, so they can change without releasing the game again.
 */
export const AllStarDraftOptionsSpecV2: OptionsSpecV2 = {
  specVersion: 2,
  players: { min: 2, max: 6 },
  identities: { values: playerColors },
  options: {
    gameMode: { kind: 'enum', playerCount: { max: 2 }, values: getEnumValues(TwoPlayersMode) }
  }
}
