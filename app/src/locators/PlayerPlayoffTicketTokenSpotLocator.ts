import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { getRelativePlayerIndex, MaterialContext, ListLocator } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'

const rotationMap: Record<number, number[]> = {
  6: [90, 180, 180, 270, 0, 0],
  5: [90, 180, 270, 0, 0],
  4: [90, 180, 270, 0],
  3: [90, 270, 0]
}

const gapMap: Record<number, Partial<Coordinates>[]> = {
  6: [{ y: 3.5 }, { x: -3.5 }, { x: -3.5 }, { y: -3.5 }, { x: 3.5 }, { x: 3.5 }],
  5: [{ y: 3.5 }, { x: -3.5 }, { y: -3.5 }, { x: 3.5 }, { x: 3.5 }],
  4: [{ y: 3.5 }, { x: -3.5 }, { y: -3.5 }, { x: 3.5 }],
  3: [{ y: 3.5 }, { y: -3.5 }, { x: 3.5 }]
}

const coordinatesMap: Record<number, { x: number; y: number }[]> = {
  6: [
    { x: 22, y: 19 },
    { x: -44, y: 36 },
    { x: -44, y: 2 },
    { x: -22, y: -19 },
    { x: 44, y: -33 },
    { x: 44, y: 1 }
  ],
  5: [
    { x: 22, y: 19 },
    { x: -44, y: 22 },
    { x: -22, y: -19 },
    { x: 44, y: -33 },
    { x: 44, y: 1 }
  ],
  4: [
    { x: 22, y: 19 },
    { x: -44, y: 22 },
    { x: -22, y: -19 },
    { x: 44, y: -22 }
  ],
  3: [
    { x: 22, y: 19 },
    { x: -22, y: -19 },
    { x: 44, y: -22 }
  ]
}

class PlayerPlayoffTicketTokenSpotLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  getRotateZ(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): number {
    const index = getRelativePlayerIndex(context, location.player)
    return rotationMap[context.rules.players.length][index]
  }

  getGap(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    return gapMap[context.rules.players.length][index]
  }

  getCoordinates(
    location: Location<PlayerColor, LocationType, number, number>,
    context: MaterialContext<number, MaterialType, LocationType>
  ): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    return coordinatesMap[context.rules.players.length][index]
  }
}

export const playerPlayoffTicketTokenSpotLocator = new PlayerPlayoffTicketTokenSpotLocator()
