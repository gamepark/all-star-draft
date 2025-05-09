import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { getRelativePlayerIndex, HandLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

const baseAngleMap: Record<number, number[]> = {
  6: [0, 90, 90, 180, 270, 270],
  5: [0, 90, 180, 270, 270],
  4: [0, 90, 180, 270],
  3: [0, 180, 270]
}

const coordinatesMap: Record<number, Partial<Coordinates>[]> = {
  6: [
    { x: 0, y: 33 },
    { x: -59, y: 19 },
    { x: -59, y: -15 },
    { x: 0, y: -33 },
    { x: 59, y: -15 },
    { x: 59, y: 19 }
  ],
  5: [
    { x: 0, y: 33 },
    { x: -59, y: 0 },
    { x: 0, y: -33 },
    { x: 59, y: -15 },
    { x: 59, y: 19 }
  ],
  4: [
    { x: 0, y: 33 },
    { x: -59, y: 0 },
    { x: 0, y: -33 },
    { x: 59, y: 0 }
  ],
  3: [
    { x: 0, y: 33 },
    { x: 0, y: -33 },
    { x: 59, y: 0 }
  ]
}

class PlayerHockeyPlayerHandSpotLocator extends HandLocator<PlayerColor, MaterialType, LocationType> {
  radius = 75
  maxAngle = 15
  gapMaxAngle = 3
  clockwise = true

  getBaseAngle(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): number {
    const index = getRelativePlayerIndex(context, location.player)
    const angleArray = baseAngleMap[context.rules.players.length]
    return angleArray[index]
  }

  getCoordinates(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    const coordArray = coordinatesMap[context.rules.players.length]
    return coordArray[index]
  }
}

export const playerHockeyPlayerHandSpotLocator = new PlayerHockeyPlayerHandSpotLocator()
