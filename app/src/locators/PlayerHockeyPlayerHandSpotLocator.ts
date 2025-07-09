import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { DropAreaDescription, getRelativePlayerIndex, HandLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { orderBy } from 'lodash'
import { PlayerHandHelp } from '../components/help/PlayerHandHelp'

const baseAngleMap: Record<number, number[]> = {
  6: [0, 90, 90, 180, 270, 270],
  5: [0, 90, 180, 270, 270],
  4: [0, 90, 180, 270],
  3: [0, 180, 180]
}

const coordinatesMap: Record<number, Partial<Coordinates>[]> = {
  6: [
    { x: 0, y: 39 },
    { x: -69, y: 20 },
    { x: -69, y: -26 },
    { x: 0, y: -39 },
    { x: 69, y: -20 },
    { x: 69, y: 26 }
  ],
  5: [
    { x: 0, y: 39 },
    { x: -69, y: 0 },
    { x: 0, y: -39 },
    { x: 69, y: -20 },
    { x: 69, y: 26 }
  ],
  4: [
    { x: 0, y: 39 },
    { x: -69, y: 0 },
    { x: 0, y: -39 },
    { x: 69, y: 0 }
  ],
  3: [
    { x: 0, y: 13 },
    { x: -36, y: -39 },
    { x: 26, y: -39 }
  ],
  2: [
    { x: 0, y: 5 },
    { x: 0, y: -39 }
  ]
}

class PlayerHockeyPlayerHandSpotLocator extends HandLocator<PlayerColor, MaterialType, LocationType> {
  radius = 150
  maxAngle = 15
  gapMaxAngle = 1
  clockwise = true

  locationDescription = new PlayerHockeyPlayerHandSpotDescription()

  getBaseAngle(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): number {
    const index = getRelativePlayerIndex(context, location.player)
    const playerCount = context.rules.players.length
    const angleArray = baseAngleMap[playerCount] ?? baseAngleMap[3]
    return angleArray[index]
  }

  getCoordinates(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    const playerCount = context.rules.players.length
    const coordArray = coordinatesMap[playerCount]
    return coordArray[index]
  }

  getItemIndex(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType>): number {
    const { player, rules, index } = context
    if (item.location.player === player) {
      const hockeyPlayerCards = rules.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerHandSpot).player(player)
      const sorted = orderBy(hockeyPlayerCards.getIndexes(), (index) => hockeyPlayerCards.getItem(index).id)
      return sorted.indexOf(index)
    }
    return item.location.x!
  }
}

class PlayerHockeyPlayerHandSpotDescription extends DropAreaDescription {
  help = PlayerHandHelp
  height = 9
  width = 16
}

export const playerHockeyPlayerHandSpotLocator = new PlayerHockeyPlayerHandSpotLocator()
