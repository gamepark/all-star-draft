import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { getRelativePlayerIndex, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

const rotationMap: Record<number, number[]> = {
  6: [0, 90, 90, 180, 270, 270],
  5: [0, 90, 180, 270, 270],
  4: [0, 90, 180, 270],
  3: [0, 180, 270]
}

const gapMap: Record<number, Partial<Coordinates>[]> = {
  6: [{ y: 3 }, { x: -3 }, { x: -3 }, { y: -3 }, { x: 3 }, { x: 3 }],
  5: [{ y: 3 }, { x: -3 }, { y: -3 }, { x: 3 }, { x: 3 }],
  4: [{ y: 3 }, { x: -3 }, { y: -3 }, { x: 3 }],
  3: [{ y: 3 }, { y: -3 }, { x: 3 }]
}

const coordinatesMap: Record<number, Partial<Coordinates>[]> = {
  6: [
    { x: 19, y: 19 },
    { x: -44, y: 33 },
    { x: -44, y: -1 },
    { x: -19, y: -19 },
    { x: 44, y: -30 },
    { x: 44, y: 4 }
  ],
  5: [
    { x: 19, y: 19 },
    { x: -44, y: 19 },
    { x: -19, y: -19 },
    { x: 44, y: -30 },
    { x: 44, y: 4 }
  ],
  4: [
    { x: 19, y: 19 },
    { x: -44, y: 19 },
    { x: -19, y: -19 },
    { x: 44, y: -19 }
  ],
  3: [
    { x: 19, y: 19 },
    { x: -19, y: -19 },
    { x: 44, y: -19 }
  ]
}

class PlayerBusTokenReserveSpotLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  getRotateZ(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): number {
    const index = getRelativePlayerIndex(context, location.player)
    const rotationArray = rotationMap[context.rules.players.length]
    return rotationArray[index]
  }

  getGap(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    const gapArray = gapMap[context.rules.players.length]
    return gapArray[index]
  }

  getCoordinates(
    location: Location<PlayerColor, LocationType, number, number>,
    context: MaterialContext<number, MaterialType, LocationType>
  ): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    const coordArray = coordinatesMap[context.rules.players.length]
    return coordArray[index]
  }
}

export const playerBusTokenReserveSpotLocator = new PlayerBusTokenReserveSpotLocator()
