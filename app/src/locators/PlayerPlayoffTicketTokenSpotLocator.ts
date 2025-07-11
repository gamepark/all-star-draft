import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { getRelativePlayerIndex, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

const gapMap: Record<number, Partial<Coordinates>[]> = {
  6: [{ y: 5 }, { x: -3.5 }, { x: -3.5 }, { y: -3.5 }, { x: 3.5 }, { x: 3.5 }],
  5: [{ y: 5 }, { x: -3.5 }, { y: -3.5 }, { x: 3.5 }, { x: 3.5 }],
  4: [{ y: 5 }, { x: -3.5 }, { y: -3.5 }, { x: 3.5 }],
  3: [{ y: 5 }, { y: -3.5 }, { y: -3.5 }]
}

const coordinatesMap: Record<number, { x: number; y: number }[]> = {
  3: [
    { x: 34, y: -4 },
    { x: -62, y: -25 },
    { x: -2, y: -25 }
  ],
  2: [
    { x: 34, y: -12 },
    { x: -26, y: -25 }
  ]
}

class PlayerPlayoffTicketTokenSpotLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  getRotateZ(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): number {
    const index = getRelativePlayerIndex(context, location.player)
    return index === 0 ? 0 : 180
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
