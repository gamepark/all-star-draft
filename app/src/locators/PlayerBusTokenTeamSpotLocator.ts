import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { getRelativePlayerIndex, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

const teamRotationMap: Record<number, number[]> = {
  6: [0, 90, 90, 180, 270, 270],
  5: [0, 90, 180, 270, 270],
  4: [0, 90, 180, 270],
  3: [0, 180, 270]
}

const gapMap: Record<number, Partial<Coordinates>[]> = {
  6: [{ x: 2.2 }, { y: 1.2 }, { y: 1.2 }, { x: -1.2 }, { y: -1.2 }, { y: -1.2 }],
  5: [{ x: 2.2 }, { y: 1.2 }, { x: -1.2 }, { y: -1.2 }, { y: -1.2 }],
  4: [{ x: 2.2 }, { y: 1.2 }, { x: -1.2 }, { y: -1.2 }],
  3: [{ x: 2.2 }, { x: -1.2 }, { y: -1.2 }]
}

const teamGapMap: Record<number, number[]> = {
  6: [6, 6, 6, -6, -6, -6],
  5: [6, 6, -6, -6, -6],
  4: [6, 6, -6, -6],
  3: [6, -6, -6]
}

const getTeamCoordinates = (playerCount: number, index: number, teamNumber: number): Partial<Coordinates> => {
  const teamSpread = ((gapMap[playerCount] ?? gapMap[3])[index].x ?? (gapMap[playerCount] ?? gapMap[3])[index].y)! * 5 // Total width of a team
  const teamGap = (teamGapMap[playerCount] ?? teamGapMap[3])[index] // Gap between teams
  const locatorOffset = (3 * teamSpread + 2 * teamGap) / 2 - (teamSpread / 5) * 4 // Used to center the bus on the front card of the team
  const teamCoordinates = (teamNumber: number) => -locatorOffset + (teamNumber - 1) * (teamGap + teamSpread)
  const coordinatesMap: Record<number, { x: number; y: number }[]> = {
    6: [
      { x: teamCoordinates(teamNumber), y: 22 },
      { x: -52, y: 20 + teamCoordinates(teamNumber) },
      { x: -52, y: -26 + teamCoordinates(teamNumber) },
      { x: teamCoordinates(teamNumber), y: -22 },
      { x: 52, y: -20 + teamCoordinates(teamNumber) },
      { x: 52, y: 26 + teamCoordinates(teamNumber) }
    ],
    5: [
      { x: teamCoordinates(teamNumber), y: 22 },
      { x: -52, y: teamCoordinates(teamNumber) },
      { x: teamCoordinates(teamNumber), y: -22 },
      { x: 52, y: -20 + teamCoordinates(teamNumber) },
      { x: 52, y: 26 + teamCoordinates(teamNumber) }
    ],
    4: [
      { x: teamCoordinates(teamNumber), y: 22 },
      { x: -52, y: teamCoordinates(teamNumber) },
      { x: teamCoordinates(teamNumber), y: -22 },
      { x: 52, y: teamCoordinates(teamNumber) }
    ],
    3: [
      { x: teamCoordinates(teamNumber), y: 22 },
      { x: teamCoordinates(teamNumber), y: -22 },
      { x: 52, y: teamCoordinates(teamNumber) }
    ],
    2: [
      { x: teamCoordinates(teamNumber), y: -4 },
      { x: teamCoordinates(teamNumber), y: -22 },
    ]
  }

  const coordArray = coordinatesMap[playerCount] ?? coordinatesMap[3]
  return coordArray[index]
}

class PlayerBusTokenTeamSpotLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  getRotateZ(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): number {
    const index = getRelativePlayerIndex(context, location.player)
    const playerCount = context.rules.players.length
    const angleArray = teamRotationMap[playerCount] ?? teamRotationMap[3]
    return angleArray[index]
  }

  getGap(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    const playerCount = context.rules.players.length
    const gapArray = gapMap[playerCount] ?? gapMap[3]
    return gapArray[index]
  }

  getCoordinates(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    const playerCount = context.rules.players.length
    const teamNumber = location.id ?? 1
    return getTeamCoordinates(playerCount, index, teamNumber)
  }
}

export const playerBusTokenTeamSpotLocator = new PlayerBusTokenTeamSpotLocator()
