import { CustomMove, MaterialMove, isCustomMoveType } from '@gamepark/rules-api'
import { PlayerColor } from '../PlayerColor'
import { LocationType } from './LocationType'
import { MaterialType } from './MaterialType'

export enum CustomMoveType {
  Pass = 1
}

export type PassMoveDataType = {
  player: PlayerColor
}

export type CustomPassMove = Omit<CustomMove, 'data'> & {
  data: PassMoveDataType
}

export const isPassCustomMove = (move: MaterialMove<PlayerColor, MaterialType, LocationType>): move is CustomPassMove =>
  isCustomMoveType<CustomMoveType, PlayerColor, MaterialType, LocationType>(CustomMoveType.Pass)(move)
