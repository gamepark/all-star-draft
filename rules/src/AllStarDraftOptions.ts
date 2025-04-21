import { OptionsSpec } from '@gamepark/rules-api'
import { PlayerColor, playerColors } from './PlayerColor'
import { regularSeasonGameMode, RegularSeasonGameMode } from './RegularSeasonGameMode'
import { TFunction } from 'i18next'

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
  gameMode: RegularSeasonGameMode
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
    label: (t: TFunction) => t('option.regularSeason.mode'),
    values: regularSeasonGameMode,
    valueSpec: (mode) => ({
      label: (t) => getRegularSeasonGameModeLabel(mode, t),
      help: (t) => getRegularSeasonGameModeHelp(mode, t)
    })
  }
}

export function getRegularSeasonGameModeLabel(mode: RegularSeasonGameMode, t: TFunction) {
  switch (mode) {
    case RegularSeasonGameMode.Heritage:
      return t('option.regularSeason.heritage.label')
    case RegularSeasonGameMode.OpenMarket:
      return t('option.regularSeason.openMarket.label')
    case RegularSeasonGameMode.Duel:
      return t('option.regularSeason.duel.label')
  }
}

export function getRegularSeasonGameModeHelp(mode: RegularSeasonGameMode, t: TFunction) {
  switch (mode) {
    case RegularSeasonGameMode.Heritage:
      return t('option.regularSeason.heritage.help')
    case RegularSeasonGameMode.OpenMarket:
      return t('option.regularSeason.openMarket.help')
    case RegularSeasonGameMode.Duel:
      return t('option.regularSeason.duel.help')
  }
}
