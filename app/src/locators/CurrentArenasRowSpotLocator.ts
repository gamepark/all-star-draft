import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'

class CurrentArenasRowSpotLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  getGap(_location: Location<PlayerColor, LocationType>, _context: MaterialContext<PlayerColor, MaterialType, LocationType>): Partial<Coordinates> {
    const playerCount = _context.rules.players.length
    return playerCount <= 3 ? { y: 12 } : { y: 10 }
  }

  getCoordinates(_location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): Partial<Coordinates> {
    const playerCount = context.rules.players.length
    switch (playerCount) {
      case 2:
        return { x: -38, y: -19 }
      case 3:
        return { x: -38, y: -12 }
      default:
        return { x: 12, y: -11 }
    }
  }

  getHoverTransform(item: MaterialItem, context: ItemContext) {
    return ['translateZ(10em)', `translateY(${item.location.x === 2 && context.rules.players.length < 4 ? -6 : 0}em)`, 'scale(3)']
  }
}

export const currentArenasRowSpotLocator = new CurrentArenasRowSpotLocator()
