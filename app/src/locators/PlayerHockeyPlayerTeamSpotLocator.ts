import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { getRelativePlayerIndex, MaterialContext, ListLocator, ItemContext, LocationDescription } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { orderBy } from 'lodash'
import { HockeyPlayerTeamHelp } from '../components/help/HockeyPlayerTeamHelp'
import { hockeyPlayerCardDescription } from '../material/HockeyPlayerCardDescription'

const teamRotationMap: Record<number, number[]> = {
  6: [0, 90, 90, 180, 270, 270],
  5: [0, 90, 180, 270, 270],
  4: [0, 90, 180, 270],
  3: [0, 180, 180]
}

const gapMap: Record<number, Partial<Coordinates>[]> = {
  6: [{ x: 2.2 }, { y: 1.2 }, { y: 1.2 }, { x: -1.2 }, { y: -1.2 }, { y: -1.2 }],
  5: [{ x: 2.2 }, { y: 1.2 }, { x: -1.2 }, { y: -1.2 }, { y: -1.2 }],
  4: [{ x: 2.2 }, { y: 1.2 }, { x: -1.2 }, { y: -1.2 }],
  3: [{ x: 2.2 }, { x: -1.2 }, { x: -1.2 }]
}

const teamGapMap: Record<number, number[]> = {
  6: [6, 6, 6, -6, -6, -6],
  5: [6, 6, -6, -6, -6],
  4: [6, 6, -6, -6],
  3: [6, -6, -6]
}

const getTeamCoordinates = (playerCount: number, index: number, teamNumber: number): Partial<Coordinates> => {
  const teamSpread = ((gapMap[playerCount] ?? gapMap[3])[index].x ?? (gapMap[playerCount] ?? gapMap[3])[index].y)! * 5 // Total width of a team
  const teamGap = (teamGapMap[playerCount] ?? teamGapMap[3])[index] // Gap between teams
  const locatorOffset = (3 * teamSpread + 2 * teamGap) / 2 // Used to center the teams on the player hand
  const teamCoordinates = (teamNumber: number) => -locatorOffset + (teamNumber - 1) * (teamGap + teamSpread)
  const coordinatesMap: Record<number, { x: number; y: number }[]> = {
    6: [
      { x: teamCoordinates(teamNumber), y: 28 },
      { x: -58, y: 20 + teamCoordinates(teamNumber) },
      { x: -58, y: -26 + teamCoordinates(teamNumber) },
      { x: teamCoordinates(teamNumber), y: -28 },
      { x: 58, y: -20 + teamCoordinates(teamNumber) },
      { x: 58, y: 26 + teamCoordinates(teamNumber) }
    ],
    5: [
      { x: teamCoordinates(teamNumber), y: 28 },
      { x: -58, y: teamCoordinates(teamNumber) },
      { x: teamCoordinates(teamNumber), y: -28 },
      { x: 58, y: -20 + teamCoordinates(teamNumber) },
      { x: 58, y: 26 + teamCoordinates(teamNumber) }
    ],
    4: [
      { x: teamCoordinates(teamNumber), y: 28 },
      { x: -58, y: teamCoordinates(teamNumber) },
      { x: teamCoordinates(teamNumber), y: -28 },
      { x: 58, y: teamCoordinates(teamNumber) }
    ],
    3: [
      { x: teamCoordinates(teamNumber), y: 2 },
      { x: teamCoordinates(teamNumber) - 36, y: -28 },
      { x: teamCoordinates(teamNumber) + 26, y: -28 }
    ],
    2: [
      { x: teamCoordinates(teamNumber), y: 2 },
      { x: teamCoordinates(teamNumber), y: -28 }
    ]
  }

  const coordArray = coordinatesMap[playerCount] ?? coordinatesMap[3]
  return coordArray[index]
}

class PlayerHockeyPlayerTeamSpotLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  locationDescription = new PlayerHockeyPlayerTeamSpotDescription(hockeyPlayerCardDescription)

  getRotateZ(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): number {
    const index = getRelativePlayerIndex(context, location.player)
    const playerCount = context.rules.players.length
    const angleArray = teamRotationMap[playerCount] ?? teamRotationMap[3]
    return angleArray[index]
  }

  getGap(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    const playerCount = context.rules.players.length
    const gapArray = gapMap[playerCount] ?? gapMap[3]
    return gapArray[index]
  }

  getCoordinates(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    const playerCount = context.rules.players.length
    const teamNumber = location.id ?? 1
    return getTeamCoordinates(playerCount, index, teamNumber)
  }

  getItemIndex(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType>): number {
    const { rules, index } = context
    if (item.id !== undefined) {
      const hockeyPlayerCards = rules
        .material(MaterialType.HockeyPlayerCard)
        .location(LocationType.PlayerHockeyPlayerTeamSpot)
        .locationId(item.location.id)
        .player(item.location.player)
      const sorted = orderBy(hockeyPlayerCards.getIndexes(), (index) => hockeyPlayerCards.getItem(index).id)
      return sorted.indexOf(index)
    }
    return item.location.x!
  }
}

class PlayerHockeyPlayerTeamSpotDescription extends LocationDescription {
  help = HockeyPlayerTeamHelp
}

export const playerHockeyPlayerTeamSpotLocator = new PlayerHockeyPlayerTeamSpotLocator()
