import { isMoveItemType, ItemMove, MaterialMove, PlayMoveContext, SimultaneousRule } from '@gamepark/rules-api'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { PlayerColor } from '../PlayerColor'
import { Memorize } from '../Memorize'
import { HockeyPlayerCardRotation } from '../material/HockeyPlayerCardRotation'
import { RuleId } from './RuleId'
import { CustomMoveType, isPassCustomMove } from '../material/CustomMoveType'

export class DraftRoundPhaseTeamExchangeRule extends SimultaneousRule<PlayerColor, MaterialType, LocationType> {
  getActivePlayerLegalMoves(_player: PlayerColor): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    const currentTeamNumber = this.remind<number>(Memorize.CurrentTeamNumber, _player)
    if (this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).id(currentTeamNumber).player(_player).length < 5) {
      return this.material(MaterialType.HockeyPlayerCard)
        .location((location) => location.type === LocationType.PlayerHockeyPlayerHandSpot)
        .player(_player)
        .moveItems({
          type: LocationType.PlayerHockeyPlayerTeamSpot,
          id: currentTeamNumber,
          player: _player,
          rotation: HockeyPlayerCardRotation.FaceDown
        })
    }
    return [
      this.customMove(CustomMoveType.Pass, { player: _player }),
      ...this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).id(currentTeamNumber).player(_player).moveItems({
        type: LocationType.PlayerHockeyPlayerHandSpot,
        player: _player
      })
    ]
  }

  afterItemMove(_move: ItemMove<PlayerColor, MaterialType, LocationType>, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(_move) && _move.location.player !== undefined) {
      const currentTeamNumber = this.remind<number>(Memorize.CurrentTeamNumber, _move.location.player)
      const currentCardInTeam = this.material(MaterialType.HockeyPlayerCard)
        .location(LocationType.PlayerHockeyPlayerTeamSpot)
        .id(currentTeamNumber)
        .player(_move.location.player).length
      if (_move.location.type === LocationType.PlayerHockeyPlayerHandSpot && currentCardInTeam < 5) {
        return [this.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerHandSpot).player(_move.location.player).deck().shuffle()]
      }
      if (_move.location.type === LocationType.PlayerHockeyPlayerTeamSpot && currentCardInTeam === 5) {
        if (currentTeamNumber < this.remind<number>(Memorize.RoundNumber) - 1) {
          this.memorize<number>(Memorize.CurrentTeamNumber, (number) => number + 1, _move.location.player)
        } else {
          return [this.endPlayerTurn(_move.location.player)]
        }
      }
    }
    return []
  }

  onCustomMove(_move: MaterialMove, _context?: PlayMoveContext): MaterialMove<PlayerColor, MaterialType, LocationType>[] {
    if (isPassCustomMove(_move)) {
      const { player } = _move.data
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
