import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'

class PlayoffPointCardSpotLocator extends Locator<PlayerColor, MaterialType, LocationType> {
  getCoordinates(_location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): Partial<Coordinates> {
    const playerCount = context.rules.players.length
    switch (playerCount) {
      case 2:
        return { x: -66, y: -23 }
      case 3:
        return { x: -69, y: -4 }
      default:
        return { x: 30, y: 12 }
    }
  }

  getHoverTransform(_: MaterialItem, context: ItemContext) {
    return ['translateZ(10em)', `translateX(${context.rules.players.length < 4 ? 15 : 0}em)`, 'scale(5)']
  }
}

export const playoffPointCardSpotLocator = new PlayoffPointCardSpotLocator()
