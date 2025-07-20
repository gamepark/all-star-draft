import { CustomMove, MaterialMove, isCustomMoveType } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { LocationType } from './LocationType'
import { MaterialType } from './MaterialType'

export enum CustomMoveType {
  Pass = 1,
  SortHand,
  MatchResult
}

export type PassMoveDataType = {
  player: PlayerColor
}

export type CustomPassMove = Omit<CustomMove, 'data'> & {
  data: PassMoveDataType
}

export type MatchResultDataType = {
  rank: number
  player: PlayerColor
  teamNumber: number
}[]

export type CustomMatchResultMove = Omit<CustomMove, 'data'> & {
  data: MatchResultDataType
}

export const isPassCustomMove = (move: MaterialMove<PlayerColor, MaterialType, LocationType>): move is CustomPassMove =>
  isCustomMoveType<CustomMoveType, PlayerColor, MaterialType, LocationType>(CustomMoveType.Pass)(move)

export const isMatchResultCustomMove = (move: MaterialMove<PlayerColor, MaterialType, LocationType>): move is CustomMatchResultMove =>
  isCustomMoveType<CustomMoveType, PlayerColor, MaterialType, LocationType>(CustomMoveType.MatchResult)(move)
