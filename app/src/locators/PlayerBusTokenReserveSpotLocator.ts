import { busTokenValue, KnownBusTokenId } from '@gamepark/all-star-draft/material/BusToken'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { getRelativePlayerIndex, ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'

const rotationMap: Record<number, number[]> = {
  6: [0, 90, 90, 180, 270, 270],
  5: [0, 90, 180, 270, 270],
  4: [0, 90, 180, 270],
  3: [0, 180, 180]
}

const gapMap: Record<number, Partial<Coordinates>[]> = {
  6: [{ y: 10 }, { x: -3 }, { x: -3 }, { y: -3 }, { x: 3 }, { x: 3 }],
  5: [{ y: 10 }, { x: -3 }, { y: -3 }, { x: 3 }, { x: 3 }],
  4: [{ y: 10 }, { x: -3 }, { y: -3 }, { x: 3 }],
  3: [{ y: 12 }, { y: -3 }, { y: -3 }]
}

const coordinatesMap: Record<number, { x: number; y: number }[]> = {
  6: [
    { x: 22, y: -11 },
    { x: -55, y: 40 },
    { x: -55, y: -6 },
    { x: -22, y: -25 },
    { x: 55, y: -40 },
    { x: 55, y: 6 }
  ],
  5: [
    { x: 22, y: -11 },
    { x: -55, y: 22 },
    { x: -22, y: -25 },
    { x: 55, y: -40 },
    { x: 55, y: 6 }
  ],
  4: [
    { x: 22, y: -11 },
    { x: -55, y: 22 },
    { x: -22, y: -25 },
    { x: 55, y: -22 }
  ],
  3: [
    { x: -28, y: -12 },
    { x: -58, y: -25 },
    { x: 2, y: -25 }
  ],
  2: [
    { x: -28, y: -19 },
    { x: -22, y: -25 }
  ]
}

class PlayerBusTokenReserveSpotLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
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

  getItemIndex(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType>): number {
    if (context.player === item.location.player) {
      return busTokenValue((item.id as KnownBusTokenId).front) - 1
    }
    return super.getItemIndex(item, context)
  }
}

export const playerBusTokenReserveSpotLocator = new PlayerBusTokenReserveSpotLocator()
