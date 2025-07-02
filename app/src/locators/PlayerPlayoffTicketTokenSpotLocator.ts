import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { getRelativePlayerIndex, MaterialContext, ListLocator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

const rotationMap: Record<number, number[]> = {
  6: [90, 180, 180, 270, 0, 0],
  5: [90, 180, 270, 0, 0],
  4: [90, 180, 270, 0],
  3: [90, 270, 270]
}

const gapMap: Record<number, Partial<Coordinates>[]> = {
  6: [{ y: 5 }, { x: -3.5 }, { x: -3.5 }, { y: -3.5 }, { x: 3.5 }, { x: 3.5 }],
  5: [{ y: 5 }, { x: -3.5 }, { y: -3.5 }, { x: 3.5 }, { x: 3.5 }],
  4: [{ y: 5 }, { x: -3.5 }, { y: -3.5 }, { x: 3.5 }],
  3: [{ y: 5 }, { y: -3.5 }, { y: -3.5 }]
}

const coordinatesMap: Record<number, { x: number; y: number }[]> = {
  6: [
    { x: 34, y: 22 },
    { x: -55, y: 43 },
    { x: -55, y: -3 },
    { x: -25, y: -25 },
    { x: 55, y: -43 },
    { x: 55, y: 3 }
  ],
  5: [
    { x: 34, y: 22 },
    { x: -55, y: 25 },
    { x: -25, y: -25 },
    { x: 55, y: -43 },
    { x: 55, y: 3 }
  ],
  4: [
    { x: 34, y: 22 },
    { x: -55, y: 25 },
    { x: -25, y: -25 },
    { x: 55, y: -25 }
  ],
  3: [
    { x: 34, y: -4 },
    { x: -61, y: -25 },
    { x: -1, y: -25 }
  ],
  2: [
    { x: 34, y: -4 },
    { x: -25, y: -25 }
  ]
}

class PlayerPlayoffTicketTokenSpotLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  getRotateZ(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): number {
    const index = getRelativePlayerIndex(context, location.player)
    const playerCount = context.rules.players.length
    const rotationArray = rotationMap[playerCount] ?? rotationMap[3]
    return rotationArray[index]
  }

  getGap(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    const playerCount = context.rules.players.length
    const gapArray = gapMap[playerCount] ?? gapMap[3]
    return gapArray[index]
  }

  getCoordinates(
    location: Location<PlayerColor, LocationType, number, number>,
    context: MaterialContext<number, MaterialType, LocationType>
  ): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    const playerCount = context.rules.players.length
    const coordArray = coordinatesMap[playerCount]
    return coordArray[index]
  }
}

export const playerPlayoffTicketTokenSpotLocator = new PlayerPlayoffTicketTokenSpotLocator()
