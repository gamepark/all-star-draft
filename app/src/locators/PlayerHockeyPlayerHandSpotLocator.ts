import {
  getHockeyPlayerCardSpecie,
  getHockeyPlayerCardSymbol,
  getHockeyPlayerCardValue,
  HockeyPlayerCard
} from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { Memory } from '@gamepark/all-star-draft/Memory'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { DropAreaDescription, getRelativePlayerIndex, HandLocator, ItemContext, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { PlayerHandHelp } from '../components/help/PlayerHandHelp'
import { hockeyPlayerCardDescription } from '../material/HockeyPlayerCardDescription'

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
    { x: -10, y: 13 },
    { x: -36, y: -39 },
    { x: 26, y: -39 }
  ],
  2: [
    { x: -10, y: 5 },
    { x: 0, y: -39 }
  ]
}

class PlayerHockeyPlayerHandSpotLocator extends HandLocator<PlayerColor, MaterialType, LocationType> {
  radius = 150
  maxAngle = 15
  gapMaxAngle = 1
  clockwise = true

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

  getItemIndex(item: MaterialItem<PlayerColor, LocationType, HockeyPlayerCard>, context: ItemContext<PlayerColor, MaterialType, LocationType>): number {
    const { player, rules } = context
    if (item.location.player === player) {
      const hockeyPlayerCards = rules.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerHandSpot).player(player)
      const medalSort = context.rules.remind<number | undefined>(Memory.SortMedal)
      const sorted = hockeyPlayerCards
        .sort(
          (card) => card.location.y ?? 0,
          (card) => {
            const cardId = card.id as HockeyPlayerCard
            if (medalSort === 1) {
              return getHockeyPlayerCardSymbol(cardId) as number
            } else if ((medalSort === 2 && context.rules.players.length < 5) || (medalSort === 3 && context.rules.players.length > 4)) {
              return getHockeyPlayerCardValue(cardId)
            } else {
              return getHockeyPlayerCardSpecie(cardId) as number
            }
          },
          (card: MaterialItem<PlayerColor, LocationType>) => card.id as HockeyPlayerCard
        )
        .getItems<HockeyPlayerCard>()
        .map((card) => card.id)
      return sorted.indexOf(item.id)
    }
    return item.location.x!
  }

  getHoverTransform(item: MaterialItem, context: ItemContext) {
    const hoverTransform = super.getHoverTransform(item, context)
    hoverTransform.pop()
    hoverTransform.push('translateY(-7em)', 'scale(3)')
    return hoverTransform
  }

  getLocationDescription(
    _location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType> | ItemContext<PlayerColor, MaterialType, LocationType>
  ): LocationDescription<PlayerColor, MaterialType, LocationType> | undefined {
    const roundNumber = context.rules.material(MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot).length
    if (roundNumber === 0) {
      return new PlayOffsPlayerHockerPlayerHandSpotDescription()
    } else if (roundNumber === 1) {
      return new Round1PlayerHockeyPlayerHandSpotDescription()
    } else if (roundNumber === 2) {
      return new Round2PlayerHockeyPlayerHandSpotDescription()
    } else {
      return new Round3PlayerHockeyPlayerHandSpotDescription()
    }
  }

  placeItem(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType>): string[] {
    const { player } = context
    const placeItem = super.placeItem(item, context)
    if (item.location.player === player && item.location.y === -1) {
      placeItem.push('translateY(1em)')
    }
    return placeItem
  }
}

class Round1PlayerHockeyPlayerHandSpotDescription extends DropAreaDescription {
  help = PlayerHandHelp
  height = hockeyPlayerCardDescription.height
  width = hockeyPlayerCardDescription.width + 2.2 * 6
  borderRadius = hockeyPlayerCardDescription.borderRadius
}

class Round2PlayerHockeyPlayerHandSpotDescription extends DropAreaDescription {
  help = PlayerHandHelp
  height = hockeyPlayerCardDescription.height
  width = hockeyPlayerCardDescription.width + 2.2 * 7
  borderRadius = hockeyPlayerCardDescription.borderRadius
}

class Round3PlayerHockeyPlayerHandSpotDescription extends DropAreaDescription {
  help = PlayerHandHelp
  height = hockeyPlayerCardDescription.height
  width = hockeyPlayerCardDescription.width + 2.2 * 8
  borderRadius = hockeyPlayerCardDescription.borderRadius
}

class PlayOffsPlayerHockerPlayerHandSpotDescription extends DropAreaDescription {
  help = PlayerHandHelp
  height = hockeyPlayerCardDescription.height
  width = hockeyPlayerCardDescription.width + 2.2 * 18
  borderRadius = hockeyPlayerCardDescription.borderRadius
}

export const playerHockeyPlayerHandSpotLocator = new PlayerHockeyPlayerHandSpotLocator()
