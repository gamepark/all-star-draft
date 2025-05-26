import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { getRelativePlayerIndex, MaterialContext, ListLocator } from '@gamepark/react-game'
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

const getTeamCoordinates = (playerCount: number, index: number, teamNumber: number): Partial<Coordinates> => {
  const teamSpread = (gapMap[playerCount] ?? gapMap[3])[index].x! * 5 // Total width of a team
  const teamGap = 6 // Gap between teams
  const locatorOffset = (3 * teamSpread + 2 * teamGap) / 2 // Used to center the teams on the player hand
  const teamCoordinates = (teamNumber: number) => -locatorOffset + (teamNumber - 1) * (teamGap + teamSpread)
  const teamCoordinatesForUser = (teamNumber: number) => -locatorOffset + (teamNumber - 1) * (teamGap + teamSpread)
  const coordinatesMap: Record<number, { x: number; y: number }[]> = {
    6: [
      { x: teamCoordinatesForUser(teamNumber), y: 28 },
      { x: -58, y: 20 + teamCoordinates(teamNumber) },
      { x: -58, y: -26 + teamCoordinates(teamNumber) },
      { x: -teamCoordinates(teamNumber), y: -28 },
      { x: 58, y: -20 - teamCoordinates(teamNumber) },
      { x: 58, y: 26 - teamCoordinates(teamNumber) }
    ],
    5: [
      { x: teamCoordinatesForUser(teamNumber), y: 28 },
      { x: -58, y: teamCoordinates(teamNumber) },
      { x: -teamCoordinates(teamNumber), y: -28 },
      { x: 58, y: -20 - teamCoordinates(teamNumber) },
      { x: 58, y: 26 - teamCoordinates(teamNumber) }
    ],
    4: [
      { x: teamCoordinatesForUser(teamNumber), y: 28 },
      { x: -58, y: teamCoordinates(teamNumber) },
      { x: -teamCoordinates(teamNumber), y: -28 },
      { x: 58, y: -teamCoordinates(teamNumber) }
    ],
    3: [
      { x: teamCoordinatesForUser(teamNumber), y: 28 },
      { x: -teamCoordinates(teamNumber), y: -28 },
      { x: 58, y: -teamCoordinates(teamNumber) }
    ]
  }

  const coordArray = coordinatesMap[playerCount] ?? coordinatesMap[3]
  return coordArray[index]
}

class PlayerHockeyPlayerTeamSpotLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
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

export const playerHockeyPlayerTeamSpotLocator = new PlayerHockeyPlayerTeamSpotLocator()
