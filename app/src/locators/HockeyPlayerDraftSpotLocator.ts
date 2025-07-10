import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { HandLocator, getRelativePlayerIndex, MaterialContext, ItemContext, DropAreaDescription } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { orderBy } from 'lodash'
import { PlayerDraftHelp } from '../components/help/PlayerDraftHelp'

const baseAngleMap: Record<number, number[]> = {
  6: [0, 90, 90, 180, 270, 270],
  5: [0, 90, 180, 270, 270],
  4: [0, 90, 180, 270],
  3: [0, 180, 180]
}

const coordinatesMap: Record<number, Partial<Coordinates>[]> = {
  6: [
    { x: 30, y: 39 },
    { x: -69, y: 38 },
    { x: -69, y: -8 },
    { x: -24, y: -39 },
    { x: 69, y: -38 },
    { x: 69, y: 8 }
  ],
  5: [
    { x: 30, y: 39 },
    { x: -69, y: 24 },
    { x: -24, y: -39 },
    { x: 69, y: -38 },
    { x: 69, y: 8 }
  ],
  4: [
    { x: 30, y: 39 },
    { x: -69, y: 24 },
    { x: -24, y: -39 },
    { x: 69, y: -24 }
  ],
  3: [
    { x: 20, y: 13 },
    { x: -60, y: -39 },
    { x: 0, y: -39 }
  ],
  2: [
    { x: 24, y: 2 },
    { x: -24, y: -39 }
  ]
}

class HockeyPlayerDraftSpotLocator extends HandLocator<PlayerColor, MaterialType, LocationType> {
  locationDescription = new HockeyPlayerDraftSpotDescription()
  radius = 75
  gapMaxAngle = 3
  clockwise = true

  getMaxAngle(location: Location<PlayerColor, LocationType>, context: MaterialContext<PlayerColor, MaterialType, LocationType>): number {
    const index = getRelativePlayerIndex(context, location.player)
    return index === 0 ? 18 : 3
  }

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
    if (context.rules.game.rule?.id === RuleId.PlayoffSubstitutePlayers) {
      const { x, y } = coordArray[index]
      return { x, y: y! + 4 }
    }
    return coordArray[index]
  }

  getItemIndex(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType>): number {
    const { player, rules, index } = context
    if (item.location.player === player) {
      const hockeyPlayerCards = rules.material(MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot).player(player)
      const sorted = orderBy(hockeyPlayerCards.getIndexes(), (index) => hockeyPlayerCards.getItem(index).id)
      return sorted.indexOf(index)
    }
    return item.location.x!
  }
}

class HockeyPlayerDraftSpotDescription extends DropAreaDescription {
  help = PlayerDraftHelp
  height = 9
  width = 16
}

export const hockeyPlayerDraftSpotLocator = new HockeyPlayerDraftSpotLocator()
