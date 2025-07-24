import { CustomMove, MaterialMove, isCustomMoveType } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from '../rules/RuleId'
import { LocationType } from './LocationType'
import { MaterialType } from './MaterialType'

export enum CustomMoveType {
  Pass = 1,
  SortHand,
  StartMatch
}

export type PassMoveDataType = {
  player: PlayerColor
}

export type CustomStartMatchMove = Omit<CustomMove, 'data'> & {
  data: number
}

export type CustomPassMove = Omit<CustomMove, 'data'> & {
  data: PassMoveDataType
}

export const isPassCustomMove = (move: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>): move is CustomPassMove =>
  isCustomMoveType<CustomMoveType, PlayerColor, MaterialType, LocationType>(CustomMoveType.Pass)(move)

export const isStartMatchCustomMove = (move: MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>): move is CustomStartMatchMove =>
  isCustomMoveType<CustomMoveType, PlayerColor, MaterialType, LocationType>(CustomMoveType.StartMatch)(move)
