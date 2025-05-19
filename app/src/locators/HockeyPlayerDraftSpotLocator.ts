import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { HandLocator, getRelativePlayerIndex, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

const baseAngleMap: Record<number, number[]> = {
  6: [0, 90, 90, 180, 270, 270],
  5: [0, 90, 180, 270, 270],
  4: [0, 90, 180, 270],
  3: [0, 180, 270]
}

const coordinatesMap: Record<number, Partial<Coordinates>[]> = {
  6: [
    { x: 24, y: 39 },
    { x: -69, y: 38 },
    { x: -69, y: -8 },
    { x: -24, y: -39 },
    { x: 69, y: -38 },
    { x: 69, y: 8 }
  ],
  5: [
    { x: 24, y: 39 },
    { x: -69, y: 24 },
    { x: -24, y: -39 },
    { x: 69, y: -38 },
    { x: 69, y: 8 }
  ],
  4: [
    { x: 24, y: 39 },
    { x: -69, y: 24 },
    { x: -24, y: -39 },
    { x: 69, y: -24 }
  ],
  3: [
    { x: 24, y: 39 },
    { x: -24, y: -39 },
    { x: 69, y: -24 }
  ]
}

class HockeyPlayerDraftSpotLocator extends HandLocator<PlayerColor, MaterialType, LocationType> {
  radius = 50
  maxAngle = 10
  gapMaxAngle = 2
  clockwise = true

  getMaxAngle(location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): number {
    const index = getRelativePlayerIndex(context, location.player)
    return index === 0 ? 10 : 3 
  }

  getBaseAngle(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): number {
    const index = getRelativePlayerIndex(context, location.player)
    const playerCount = context.rules.players.length
    const angleArray = baseAngleMap[playerCount] ?? baseAngleMap[3]
    return angleArray[index]
  }

  getCoordinates(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    const playerCount = context.rules.players.length
    const coordArray = coordinatesMap[playerCount] ?? coordinatesMap[3]
    return coordArray[index]
  }
}

export const hockeyPlayerDraftSpotLocator = new HockeyPlayerDraftSpotLocator()
