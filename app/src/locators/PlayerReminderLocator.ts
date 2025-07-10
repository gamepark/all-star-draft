import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { Locator, MaterialContext, getRelativePlayerIndex } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { PlayerReminderDescription } from './PlayerReminderDescription'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'

const coordinatesMap: Record<number, Partial<Coordinates>[]> = {
  6: [
    { x: 0, y: 43 },
    { x: -60, y: 36 },
    { x: -60, y: -10 },
    { x: 0, y: -39 },
    { x: 63, y: -36 },
    { x: 63, y: 10 }
  ],
  5: [
    { x: 0, y: 43 },
    { x: -60, y: 26 },
    { x: 0, y: -39 },
    { x: 63, y: -36 },
    { x: 63, y: 10 }
  ],
  4: [
    { x: 0, y: 43 },
    { x: -60, y: 26 },
    { x: 0, y: -39 },
    { x: 63, y: -26 }
  ],
  3: [
    { x: -10, y: 17 },
    { x: -36, y: -39 },
    { x: 26, y: -39 }
  ],
  2: [
    { x: -10, y: 9 },
    { x: 0, y: -42 }
  ]
}

export class PlayerReminderLocator extends Locator {
  locationDescription = new PlayerReminderDescription()

  getLocations(context: MaterialContext) {
    return context.rules.players.map((player) => ({ type: LocationType.PlayerReminderSpot, player }))
  }

  getCoordinates(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    const playerCount = context.rules.players.length
    const coordArray = coordinatesMap[playerCount]
    return { ...coordArray[index], z: 5 }
  }
}

export const playerReminderLocator = new PlayerReminderLocator()
