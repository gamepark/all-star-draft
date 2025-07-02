import { busTokenValue, KnownBusTokenId } from '@gamepark/all-star-draft/material/BusToken'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { getRelativePlayerIndex, ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { orderBy } from 'lodash'

const rotationMap: Record<number, number[]> = {
  6: [0, 90, 90, 180, 270, 270],
  5: [0, 90, 180, 270, 270],
  4: [0, 90, 180, 270],
  3: [0, 180, 180]
}

const gapMap: Record<number, Partial<Coordinates>[]> = {
  6: [{ y: 5 }, { x: -3 }, { x: -3 }, { y: -3 }, { x: 3 }, { x: 3 }],
  5: [{ y: 5 }, { x: -3 }, { y: -3 }, { x: 3 }, { x: 3 }],
  4: [{ y: 5 }, { x: -3 }, { y: -3 }, { x: 3 }],
  3: [{ y: 5 }, { y: -3 }, { y: -3 }]
}

const coordinatesMap: Record<number, { x: number; y: number }[]> = {
  6: [
    { x: 28, y: 22 },
    { x: -55, y: 40 },
    { x: -55, y: -6 },
    { x: -22, y: -25 },
    { x: 55, y: -40 },
    { x: 55, y: 6 }
  ],
  5: [
    { x: 28, y: 22 },
    { x: -55, y: 22 },
    { x: -22, y: -25 },
    { x: 55, y: -40 },
    { x: 55, y: 6 }
  ],
  4: [
    { x: 28, y: 22 },
    { x: -55, y: 22 },
    { x: -22, y: -25 },
    { x: 55, y: -22 }
  ],
  3: [
    { x: 28, y: -4 },
    { x: -58, y: -25 },
    { x: 2, y: -25 }
  ],
  2: [
    { x: 28, y: -4 },
    { x: -22, y: -25 },
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
    const { player, rules, index } = context
    if (item.location.player === player) {
      const busTokens = rules.material(MaterialType.BusToken).location(LocationType.PlayerBusTokenReserveSpot).player(player)
      const sorted = orderBy(busTokens.getIndexes(), (index) => busTokenValue((busTokens.getItem(index).id as KnownBusTokenId).front))
      return sorted.indexOf(index)
    }
    return item.location.x!
  }
}

export const playerBusTokenReserveSpotLocator = new PlayerBusTokenReserveSpotLocator()
