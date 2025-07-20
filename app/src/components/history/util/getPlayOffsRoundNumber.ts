import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext } from '@gamepark/react-game'
import { Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'

export const getPlayOffsRoundNumber = (
  gameContext: MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
): number => {
  const playerCount = gameContext.game.players.length
  const maxNumberOfRounds = playerCount > 3 ? playerCount + 1 : 7
  const hockeyPlayerCardsMaterial = new Material<PlayerColor, MaterialType, LocationType>(
    MaterialType.HockeyPlayerCard,
    gameContext.game.items[MaterialType.HockeyPlayerCard]
  )
  const stillActivePlayerCount = gameContext.game.players.filter((p) => hockeyPlayerCardsMaterial.player(p).length > 0).length
  const playOffsTicketsCount =
    playerCount < 4
      ? new Material<PlayerColor, MaterialType, LocationType>(MaterialType.PlayoffTicketToken, gameContext.game.items[MaterialType.PlayoffTicketToken]).length
      : 0
  return maxNumberOfRounds - stillActivePlayerCount - playOffsTicketsCount
}
