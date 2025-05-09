import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { getRelativePlayerIndex, MaterialContext, PileLocator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

const rotationMap: Record<number, number[]> = {
  6: [0, 90, 90, 180, 270, 270],
  5: [0, 90, 180, 270, 270],
  4: [0, 90, 180, 270],
  3: [0, 180, 270]
}

const coordinatesMap: Record<number, Partial<Coordinates>[]> = {
  6: [
    { x: 20, y: 33 },
    { x: -59, y: 34 },
    { x: -59, y: 0 },
    { x: -20, y: -33 },
    { x: 59, y: -31 },
    { x: 59, y: 3 }
  ],
  5: [
    { x: 20, y: 33 },
    { x: -59, y: 20 },
    { x: -20, y: -33 },
    { x: 59, y: -31 },
    { x: 59, y: 3 }
  ],
  4: [
    { x: 20, y: 33 },
    { x: -59, y: 20 },
    { x: -20, y: -33 },
    { x: 59, y: -20 }
  ],
  3: [
    { x: 20, y: 33 },
    { x: -20, y: -33 },
    { x: 59, y: -20 }
  ]
}

class HockeyPlayerDraftSpotLocator extends PileLocator<PlayerColor, MaterialType, LocationType> {
  radius = { x: 1, y: 1 }
  maxAngle = 10

  getRotateZ(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): number {
    const index = getRelativePlayerIndex(context, location.player)
    const playerCount = context.rules.players.length
    const rotationArray = rotationMap[playerCount] ?? rotationMap[3]
    return rotationArray[index]
  }

  getCoordinates(
    location: Location<PlayerColor, LocationType, number, number>,
    context: MaterialContext<number, MaterialType, LocationType>
  ): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    const playerCount = context.rules.players.length
    const coordArray = coordinatesMap[playerCount] ?? coordinatesMap[3]
    return coordArray[index]
  }
}

export const hockeyPlayerDraftSpotLocator = new HockeyPlayerDraftSpotLocator()
