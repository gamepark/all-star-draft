import { HockeyPlayerCard } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { DropAreaDescription, getRelativePlayerIndex, ItemContext, ListLocator, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, isMoveItemType, Location, MaterialItem, MaterialMove } from '@gamepark/rules-api'
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
      { x: -teamCoordinates(teamNumber), y: -28 },
      { x: 54, y: -20 - teamCoordinates(teamNumber) },
      { x: 54, y: 26 - teamCoordinates(teamNumber) }
    ],
    5: [
      { x: teamCoordinates(teamNumber), y: 28 },
      { x: -58, y: teamCoordinates(teamNumber) },
      { x: -teamCoordinates(teamNumber), y: -28 },
      { x: 54, y: -20 - teamCoordinates(teamNumber) },
      { x: 54, y: 26 - teamCoordinates(teamNumber) }
    ],
    4: [
      { x: teamCoordinates(teamNumber), y: 28 },
      { x: -58, y: teamCoordinates(teamNumber) },
      { x: -teamCoordinates(teamNumber), y: -28 },
      { x: 54, y: -teamCoordinates(teamNumber) }
    ],
    3: [
      { x: teamCoordinates(teamNumber), y: 2 },
      { x: -teamCoordinates(teamNumber) - 41, y: -28 },
      { x: -teamCoordinates(teamNumber) + 20, y: -28 }
    ],
    2: [
      { x: teamCoordinates(teamNumber), y: -6 },
      { x: -teamCoordinates(teamNumber), y: -28 }
    ]
  }

  const coordArray = coordinatesMap[playerCount] ?? coordinatesMap[3]
  return coordArray[index]
}

class PlayerHockeyPlayerTeamSpotLocator extends ListLocator<PlayerColor, MaterialType, LocationType> {
  maxCount = 5

  getGap(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    const playerCount = context.rules.players.length
    if (playerCount === 6) {
      return context.player !== undefined ? { x: index === 3 ? -1.2 : index === 0 ? 2.2 : 1.2 } : { x: index === 3 ? -1.2 : 2.2 }
    } else if (playerCount > 4) {
      return context.player !== undefined ? { x: index === 2 ? -1.2 : index === 0 ? 2.2 : 1.2 } : { x: index === 3 ? -1.2 : 2.2 }
    }
    return context.player !== undefined ? { x: index === 0 ? 2.2 : 1.2 } : { x: 1.2 }
  }

  getCoordinates(location: Location<number, LocationType, number, number>, context: MaterialContext<number, MaterialType, LocationType>): Partial<Coordinates> {
    const index = getRelativePlayerIndex(context, location.player)
    const playerCount = context.rules.players.length
    const teamNumber = location.id ?? 1
    return getTeamCoordinates(playerCount, index, teamNumber)
  }

  getItemIndex(item: MaterialItem<PlayerColor, LocationType>, context: ItemContext<PlayerColor, MaterialType, LocationType>): number {
    const { rules, index } = context
    const roundNumber = rules.material(MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot).length
    if (item.id !== undefined) {
      const hockeyPlayerCards = rules
        .material(MaterialType.HockeyPlayerCard)
        .location(LocationType.PlayerHockeyPlayerTeamSpot)
        .locationId(item.location.id)
        .player(item.location.player)
      const sorted = orderBy(hockeyPlayerCards.getIndexes(), (index) => hockeyPlayerCards.getItem(index).id)
      return sorted.indexOf(index)
    } else {
      if (roundNumber > 0) {
        return item.location.id < roundNumber ? 4 : item.location.x!
      } else {
        const cardsFlipped = rules
          .material(MaterialType.HockeyPlayerCard)
          .location(LocationType.PlayerHockeyPlayerTeamSpot)
          .locationId(item.location.id)
          .player(item.location.player)
          .id((id) => id === undefined)
          .sort((item) => item.location.x!)
          .getItems()
        return 4 - cardsFlipped.findIndex((card) => card.location.x === item.location.x)
      }
    }
  }

  getHoverTransform() {
    return ['translateZ(10em)', 'scale(3)']
  }

  getLocationDescription(
    location: Location<PlayerColor, LocationType>,
    context: MaterialContext<PlayerColor, MaterialType, LocationType> | ItemContext<PlayerColor, MaterialType, LocationType>
  ): LocationDescription<PlayerColor, MaterialType, LocationType> | undefined {
    const roundNumber = context.rules.material(MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot).length
    if (roundNumber === 0) {
      return new NewTeamPlayerHockeyPlayerTeamSpotDescription()
    } else {
      if (
        location.id < roundNumber &&
        context.rules.material(MaterialType.HockeyPlayerCard).player(location.player).location(location.type).locationId(location.id).length === 4
      ) {
        return new NewTeamPlayerHockeyPlayerTeamSpotDescription()
      }
      return location.id === roundNumber ? new NewTeamPlayerHockeyPlayerTeamSpotDescription() : new PlayerHockeyPlayerTeamSpotDescription()
    }
  }
}

class PlayerHockeyPlayerTeamSpotDescription extends DropAreaDescription<PlayerColor, MaterialType, LocationType, HockeyPlayerCard> {
  width = hockeyPlayerCardDescription.width
  height = hockeyPlayerCardDescription.height
  borderRadius = hockeyPlayerCardDescription.borderRadius
  help = HockeyPlayerTeamHelp

  public canDrop(
    move: MaterialMove<PlayerColor, MaterialType, LocationType>,
    location: Location<PlayerColor, LocationType>,
    context: ItemContext<PlayerColor, MaterialType, LocationType>
  ): boolean {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
      move.location.type === LocationType.PlayerHockeyPlayerTeamSpot &&
      move.location.x !== undefined
    ) {
      const itemAtLocation = context.rules
        .material(move.itemType)
        .player(move.location.player)
        .location(move.location.type)
        .locationId(move.location.id)
        .filter<HockeyPlayerCard>((item) => playerHockeyPlayerTeamSpotLocator.getItemIndex(item, context) === location.x)
        .getItem<HockeyPlayerCard>()
      return itemAtLocation?.location.x === move.location.x
    }
    return super.canDrop(move, location, context)
  }
}

class NewTeamPlayerHockeyPlayerTeamSpotDescription extends DropAreaDescription<PlayerColor, MaterialType, LocationType> {
  width = hockeyPlayerCardDescription.width + 2.2 * 4
  height = hockeyPlayerCardDescription.height
  borderRadius = hockeyPlayerCardDescription.borderRadius
  help = HockeyPlayerTeamHelp
}

export const playerHockeyPlayerTeamSpotLocator = new PlayerHockeyPlayerTeamSpotLocator()
