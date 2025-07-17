import { busTokenValue, KnownBusTokenId } from '@gamepark/all-star-draft/material/BusToken'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { getRelativePlayerIndex, ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'

const rotationMap: Record<number, number[]> = {
  6: [0, 90, 90, 180, 270, 270],
  5: [0, 90, 180, 270, 270],
  4: [0, 90, 180, 270],
  3: [0, 180, 180]
}

const gapNearArena: Record<number, Partial<XYCoordinates>> = {
  6: { y: 10 },
  5: { y: 10 },
  4: { y: 10 },
  3: { y: 12 },
  2: { y: 12 }
}

const gapMap: Record<number, Partial<Coordinates>[]> = {
  6: [{ y: 3 }, { x: -3 }, { x: -3 }, { y: -3 }, { x: 3 }, { x: 3 }],
  5: [{ y: 3 }, { x: -3 }, { y: -3 }, { x: 3 }, { x: 3 }],
  4: [{ y: 3 }, { x: -3 }, { y: -3 }, { x: 3 }],
  3: [{ y: 3 }, { y: -3 }, { y: -3 }]
}

const coordinatesNearArena: Record<number, XYCoordinates> = {
  6: { x: 22, y: -11 },
  5: { x: 22, y: -11 },
  4: { x: 22, y: -11 },
  3: { x: -28, y: -12 },
  2: { x: -28, y: -19 }
}

const coordinatesMap: Record<number, XYCoordinates[]> = {
  6: [
    { x: -29, y: 25 },
    { x: -55, y: 40 },
    { x: -55, y: -6 },
    { x: 22, y: -25 },
    { x: 55, y: -42 },
    { x: 55, y: 4 }
  ],
  5: [
    { x: -29, y: 25 },
    { x: -55, y: 22 },
    { x: 22, y: -25 },
    { x: 55, y: -42 },
    { x: 55, y: 4 }
  ],
  4: [
    { x: -29, y: 25 },
    { x: -55, y: 22 },
    { x: 26, y: -25 },
    { x: 55, y: -22 }
  ],
  3: [
    { x: -28, y: -1 },
    { x: -15, y: -25 },
    { x: 46, y: -25 }
  ],
  2: [
    { x: -28, y: -9 },
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
    return index === 0 && context.player !== undefined ? gapNearArena[playerCount] : gapArray[index]
  }

  getCoordinates(
    location: Location<PlayerColor, LocationType, number, number>,
    context: MaterialContext<number, MaterialType, LocationType>
  ): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    const playerCount = context.rules.players.length
    const coordArray = coordinatesMap[playerCount]
    return index === 0 && context.player !== undefined ? coordinatesNearArena[playerCount] : coordArray[index]
  }

  getItemIndex(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType>): number {
    if (context.player === item.location.player) {
      return busTokenValue((item.id as KnownBusTokenId).front) - 1
    }
    return super.getItemIndex(item, context)
  }
}

export const playerBusTokenReserveSpotLocator = new PlayerBusTokenReserveSpotLocator()
