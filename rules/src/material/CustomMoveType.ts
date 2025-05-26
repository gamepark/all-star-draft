import { PlayerColor } from '../PlayerColor'

export enum CustomMoveType {
  Pass = 1
}

export type PassMoveDataType = {
  player: PlayerColor
}
