import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext, SimultaneousRule } from '@gamepark/rules-api'
import { CustomMoveType, isPassCustomMove } from '../material/CustomMoveType'
import { LocationType } from '../material/LocationType'
import { MaterialRotation } from '../material/MaterialRotation'
import { MaterialType } from '../material/MaterialType'
import { Memorize } from '../Memorize'
import { PlayerColor } from '../PlayerColor'
import { RuleId } from './RuleId'

export class DraftRoundPhaseTeamExchangeRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  onRuleStart(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return this.material(MaterialType.HockeyPlayerCard).unselectItems()
  }

  getActivePlayerLegalMoves(player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const currentTeamNumber = this.remind<number>(Memorize.CurrentTeamNumber, player)
    if (
      this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).locationId(currentTeamNumber).player(player).length < 5
    ) {
      return this.material(MaterialType.HockeyPlayerCard)
        .location((location) => location.type === LocationType.PlayerHockeyPlayerHandSpot)
        .player(player)
        .moveItems({
          type: LocationType.PlayerHockeyPlayerTeamSpot,
          id: currentTeamNumber,
          player: player,
          rotation: MaterialRotation.FaceDown
        })
    }
    return [
      this.customMove(CustomMoveType.Pass, { player: player }),
      ...this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).locationId(currentTeamNumber).player(player).moveItems({
        type: LocationType.PlayerHockeyPlayerHandSpot,
        player: player
      })
    ]
  }

  afterItemMove(move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) && move.location.player !== undefined) {
      const currentTeamNumber = this.remind<number>(Memorize.CurrentTeamNumber, move.location.player)
      const currentCardInTeam = this.material(MaterialType.HockeyPlayerCard)
        .location(LocationType.PlayerHockeyPlayerTeamSpot)
        .locationId(currentTeamNumber)
        .player(move.location.player).length
      if (move.location.type === LocationType.PlayerHockeyPlayerHandSpot && currentCardInTeam < 5) {
        return [this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerHandSpot).player(move.location.player).shuffle()]
      }
      if (move.location.type === LocationType.PlayerHockeyPlayerTeamSpot && currentCardInTeam === 5) {
        if (currentTeamNumber < this.remind<number>(Memorize.RoundNumber) - 1) {
          this.memorize<number>(Memorize.CurrentTeamNumber, (number) => number + 1, move.location.player)
        } else {
          return [this.endPlayerTurn(move.location.player)]
        }
      }
    }
    return []
  }

  onCustomMove(move: MaterialMove, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (isPassCustomMove(move)) {
      const { player } = move.data
      const currentTeamNumber = this.remind<number>(Memorize.CurrentTeamNumber, player)
      if (currentTeamNumber < this.remind<number>(Memorize.RoundNumber) - 1) {
        this.memorize<number>(Memorize.CurrentTeamNumber, (number) => number + 1, player)
      } else {
        return [this.endPlayerTurn(player)]
      }
    }
    return []
  }

  getMovesAfterPlayersDone(): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    return [this.startSimultaneousRule(RuleId.DraftRoundPhaseTeamCreation)]
  }
}
