import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { getRelativePlayerIndex, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

const teamRotationMap: Record<number, number[]> = {
  6: [0, 90, 90, 180, 270, 270],
  5: [0, 90, 180, 270, 270],
  4: [0, 90, 180, 270],
  3: [0, 180, 270]
}

const getTeamCoordinates = (playerCount: number, index: number, teamNumber: number): Partial<Coordinates> => {
  const teamGap = 9
  const coordinatesMap: Record<number, { x: number; y: number }[]> = {
    6: [
      { x: -teamGap + teamNumber * teamGap, y: 22 },
      { x: -48, y: 10 + teamNumber * teamGap },
      { x: -48, y: -25 + teamNumber * teamGap },
      { x: -teamGap + teamNumber * teamGap, y: -22 },
      { x: 48, y: -25 + teamNumber * teamGap },
      { x: 48, y: 10 + teamNumber * teamGap }
    ],
    5: [
      { x: -teamGap + teamNumber * teamGap, y: 22 },
      { x: -48, y: -teamGap + teamNumber * teamGap },
      { x: -teamGap + teamNumber * teamGap, y: -22 },
      { x: 48, y: -25 + teamNumber * teamGap },
      { x: 48, y: 10 + teamNumber * teamGap }
    ],
    4: [
      { x: -teamGap + teamNumber * teamGap, y: 22 },
      { x: -48, y: -teamGap + teamNumber * teamGap },
      { x: -teamGap + teamNumber * teamGap, y: -22 },
      { x: 48, y: -teamGap + teamNumber * teamGap }
    ],
    3: [
      { x: -teamGap + teamNumber * teamGap, y: 22 },
      { x: -teamGap + teamNumber * teamGap, y: -22 },
      { x: 48, y: -teamGap + teamNumber * teamGap }
    ]
  }

  return coordinatesMap[playerCount][index]
}

class PlayerHockeyPlayerTeamSpotLocator extends PileLocator<PlayerColor, MaterialType, LocationType> {
  radius = { x: 1, y: 1 }
  maxAngle = 10

  getRotateZ(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): number {
    const index = getRelativePlayerIndex(context, location.player)
    const angleArray = teamRotationMap[context.rules.players.length]
    return angleArray[index]
  }

  getCoordinates(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    const playerCount = context.rules.players.length
    const teamNumber = location.x ?? 0
    return getTeamCoordinates(playerCount, index, teamNumber)
  }
}

export const playerHockeyPlayerTeamSpotLocator = new PlayerHockeyPlayerTeamSpotLocator()
