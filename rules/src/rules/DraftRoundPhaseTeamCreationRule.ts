import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext, SimultaneousRule } from '@gamepark/rules-api'
import { difference } from 'lodash'
import { getBusTokenValue, KnownBusTokenId } from '../material/BusToken'
import { HockeyPlayerCard } from '../material/HockeyPlayerCard'
import { LocationType } from '../material/LocationType'
import { MaterialRotation } from '../material/MaterialRotation'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class DraftRoundPhaseTeamCreationRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const roundNumber = this.material(MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot).length
    const playerHandCards = this.material(MaterialType.HockeyPlayerCard).player(player).location(LocationType.PlayerHockeyPlayerHandSpot)
    if (this.game.players.length === 2 && playerHandCards.length === 6 + roundNumber) {
      return playerHandCards.deleteItems()
    }
    const numberOfAlreadyAssembledTeams = roundNumber - 1
    const teamWithPlayerReturnedToBench = Array(numberOfAlreadyAssembledTeams)
      .fill(1)
      .map((_, index) =>
        this.material(MaterialType.HockeyPlayerCard)
          .player(player)
          .location(LocationType.PlayerHockeyPlayerTeamSpot)
          .locationId(index + 1)
      )
      .filter((teamMaterial) => teamMaterial.length === 4)
    if (teamWithPlayerReturnedToBench.length === 1) {
      const teamNumber = (teamWithPlayerReturnedToBench[0].getItem<HockeyPlayerCard>()?.location.id as number | undefined) ?? 1
      return playerHandCards.moveItems({
        type: LocationType.PlayerHockeyPlayerTeamSpot,
        id: teamNumber,
        player: player,
        rotation: MaterialRotation.FaceDown
      })
    }
    const currentRoundTeam = this.material(MaterialType.HockeyPlayerCard)
      .player(player)
      .location(LocationType.PlayerHockeyPlayerTeamSpot)
      .locationId(roundNumber)
    const lastSwappedTeam =
      (this.material(MaterialType.HockeyPlayerCard)
        .player(player)
        .location(LocationType.PlayerHockeyPlayerTeamSpot)
        .locationId<number>((id) => id <= numberOfAlreadyAssembledTeams)
        .rotation(MaterialRotation.FaceDown)
        .maxBy((item) => item.location.id as number)
        .getItem<HockeyPlayerCard>()?.location.id as number | undefined) ?? 0
    const swapMoves =
      roundNumber > 1 && currentRoundTeam.length === 0
        ? Array(numberOfAlreadyAssembledTeams - lastSwappedTeam)
            .fill(1)
            .flatMap((_, index) =>
              this.material(MaterialType.HockeyPlayerCard)
                .player(player)
                .location(LocationType.PlayerHockeyPlayerTeamSpot)
                .locationId(lastSwappedTeam - index + 1)
                .getItems<HockeyPlayerCard>()
                .flatMap((card) =>
                  playerHandCards.moveItems({
                    type: LocationType.PlayerHockeyPlayerTeamSpot,
                    player: player,
                    id: card.location.id,
                    x: card.location.x,
                    rotation: MaterialRotation.FaceDown
                  })
                )
            )
        : []
    const returnToBenchMoves =
      roundNumber > 1 && currentRoundTeam.length === 0
        ? this.material(MaterialType.HockeyPlayerCard)
            .player(player)
            .location(LocationType.PlayerHockeyPlayerTeamSpot)
            .locationId<number>((id) => id > lastSwappedTeam && id < roundNumber)
            .moveItems({
              type: LocationType.PlayerHockeyPlayerHandSpot,
              player: player
            })
        : []
    const validBusDestination = difference(
      Array(roundNumber)
        .fill(0)
        .map((_, index) => index + 1),
      this.material(MaterialType.BusToken)
        .player(player)
        .location(LocationType.PlayerBusTokenTeamSpot)
        .getItems()
        .map((item) => item.location.id as number)
    )
    const busMoves =
      currentRoundTeam.length === 5
        ? validBusDestination.flatMap((destination) =>
            this.material(MaterialType.BusToken)
              .player(player)
              .location(LocationType.PlayerBusTokenReserveSpot)
              .id<KnownBusTokenId>((id) => getBusTokenValue(id.front) <= roundNumber)
              .moveItems({
                type: LocationType.PlayerBusTokenTeamSpot,
                player: player,
                id: destination,
                rotation: MaterialRotation.FaceDown
              })
          )
        : []
    const currentRoundTeamMoves =
      currentRoundTeam.length < 5
        ? playerHandCards.moveItems({
            type: LocationType.PlayerHockeyPlayerTeamSpot,
            player: player,
            id: roundNumber,
            rotation: MaterialRotation.FaceDown
          })
        : []
    return swapMoves.concat(currentRoundTeamMoves).concat(busMoves).concat(returnToBenchMoves)
  }

  public beforeItemMove(
    move: ItemMove<PlayerColor, MaterialType, LocationType>,
    _context?: PlayMoveContext
  ): MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>[] {
    const numberOfAlreadyAssembledTeams = this.material(MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot).length - 1
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
      move.location.type === LocationType.PlayerHockeyPlayerTeamSpot &&
      move.location.rotation === MaterialRotation.FaceDown &&
      move.location.id <= numberOfAlreadyAssembledTeams
    ) {
      if (move.location.x !== undefined) {
        return [
          this.material(MaterialType.HockeyPlayerCard)
            .player(move.location.player)
            .location((l) => l.type === move.location.type && l.x === move.location.x)
            .locationId(move.location.id)
            .moveItem({
              type: LocationType.PlayerHockeyPlayerHandSpot,
              player: move.location.player
            })
        ]
      }
    }
    return []
  }

  afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (
      isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken)(move) &&
      move.location.type === LocationType.PlayerBusTokenTeamSpot &&
      move.location.player !== undefined
    ) {
      const roundNumber = this.material(MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot).length
      if (this.material(MaterialType.BusToken).player(move.location.player).location(LocationType.PlayerBusTokenTeamSpot).length === roundNumber) {
        return [this.endPlayerTurn<PlayerColor>(move.location.player)]
      }
    }
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return [this.startSimultaneousRule<PlayerColor, RuleId>(RuleId.DraftRoundPhaseTeamReveal)]
  }
}
