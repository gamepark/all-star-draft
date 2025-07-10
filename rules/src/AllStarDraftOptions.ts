import { getEnumValues, OptionsSpec } from '@gamepark/rules-api'
import { TFunction } from 'i18next'
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
 * This object describes all the options a game can have, and will be used by GamePark website to create automatically forms for you game
 * (forms for friendly games, or forms for matchmaking preferences, for instance).
 */
export const AllStarDraftOptionsSpec: OptionsSpec<AllStarDraftOptions> = {
  players: {
    id: {
      label: (t) => t('player.id'),
      values: playerColors,
      valueSpec: (id) => ({ label: (t) => t(`player.${id}`) })
    }
  },
  gameMode: {
    label: (t: TFunction) => t('option.mode'),
    values: getEnumValues(TwoPlayersMode),
    valueSpec: (mode: TwoPlayersMode) => ({
      label: (t) => t(`option.mode.${mode}.label`),
      help: (t) => t(`option.mode.${mode}.help`)
    }),
    hide: (players) => players > 2,
    competitiveValue: TwoPlayersMode.Clash
  }
}
