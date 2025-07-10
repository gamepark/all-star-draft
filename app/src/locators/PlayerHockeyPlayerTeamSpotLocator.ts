import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { getRelativePlayerIndex, MaterialContext, ListLocator, ItemContext, DropAreaDescription } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { orderBy } from 'lodash'
import { HockeyPlayerTeamHelp } from '../components/help/HockeyPlayerTeamHelp'
import { hockeyPlayerCardDescription } from '../material/HockeyPlayerCardDescription'

const getTeamCoordinates = (playerCount: number, index: number, teamNumber: number): Partial<Coordinates> => {
  const teamSpread = (index === 0 ? 2.2 : 1.2) * 5 // Total width of a team
  const teamGap = 6 // Gap between teams
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
      { x: 54, y: teamCoordinates(teamNumber) }
    ],
    3: [
      { x: teamCoordinates(teamNumber), y: 2 },
      { x: teamCoordinates(teamNumber) - 36, y: -28 },
      { x: teamCoordinates(teamNumber) + 26, y: -28 }
    ],
    2: [
      { x: teamCoordinates(teamNumber), y: -6 },
      { x: teamCoordinates(teamNumber), y: -28 }
    ]
  }

  const coordArray = coordinatesMap[playerCount] ?? coordinatesMap[3]
  return coordArray[index]
}

class PlayerHockeyPlayerTeamSpotLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  locationDescription = new PlayerHockeyPlayerTeamSpotDescription()
  maxCount = 5

  getGap(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    return { x: index === 0 ? 2.2 : 1.2 }
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

class PlayerHockeyPlayerTeamSpotDescription extends DropAreaDescription {
  width = hockeyPlayerCardDescription.width + 2.2 * 4
  height = hockeyPlayerCardDescription.height
  borderRadius = hockeyPlayerCardDescription.borderRadius
  help = HockeyPlayerTeamHelp
}

export const playerHockeyPlayerTeamSpotLocator = new PlayerHockeyPlayerTeamSpotLocator()
