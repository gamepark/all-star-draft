import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { hockeyPlayerDraftSpotLocator } from './HockeyPlayerDraftSpotLocator'
import { playerHockeyPlayerTeamSpotLocator } from './PlayerHockeyPlayerTeamSpotLocator'

class PlayerBusTokenTeamSpotLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  getCoordinates(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): Partial<Coordinates> {
    const { x = 0, y = 0 } = playerHockeyPlayerTeamSpotLocator.getCoordinates(location, context)
    const orientation = hockeyPlayerDraftSpotLocator.getRotateZ(location, context)
    switch (orientation) {
      case 0:
        return { x: x + 3, y: y - 7 }
      case 90:
        return { x: x + 10, y }
      case 270:
        return { x: x - 6, y }
      default: {
        const playerCount = context.rules.players.length
        return playerCount > 4 ? { x: x - 3, y: y + 7 } : { x: x + 3, y: y + 7 }
      }
    }
  }
}

export const playerBusTokenTeamSpotLocator = new PlayerBusTokenTeamSpotLocator()
