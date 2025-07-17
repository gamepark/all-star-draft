import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType, isMoveItemTypeAtOnce, isStartSimultaneousRule } from '@gamepark/rules-api'

export const gameAnimations = new MaterialGameAnimations()

gameAnimations
  .when()
  .rule(RuleId.DraftRoundPhaseTeamReveal)
  .move((move, context) => isMoveItemType(MaterialType.HockeyPlayerCard)(move) && move.location.player === context.player)
  .duration(0)
gameAnimations
  .when()
  .rule(RuleId.DraftRoundPhaseTeamReveal)
  .move((move, context) => isMoveItemType(MaterialType.BusToken)(move) && move.location.player === context.player)
  .duration(0)
gameAnimations
  .when()
  .rule(RuleId.DraftRoundPhaseTeamReveal)
  .move((move, context) => isMoveItemTypeAtOnce(MaterialType.HockeyPlayerCard)(move) && move.location.player === context.player)
  .duration(0)
gameAnimations
  .when()
  .rule(RuleId.DraftRoundPhaseTeamReveal)
  .move((move, context) => isMoveItemTypeAtOnce(MaterialType.BusToken)(move) && move.location.player === context.player)
  .mine()
  .duration(0)
gameAnimations.when().rule(RuleId.DraftRoundPhaseMatchScore).move(isStartSimultaneousRule).duration(1)
gameAnimations
  .when()
  .rule(RuleId.PlayoffRoundPhaseTeamReveal)
  .move((move, context) => isMoveItemType(MaterialType.HockeyPlayerCard)(move) && move.location.player === context.player)
  .duration(0)
gameAnimations
  .when()
  .rule(RuleId.PlayoffRoundPhaseTeamReveal)
  .move((move, context) => isMoveItemType(MaterialType.BusToken)(move) && move.location.player === context.player)
  .duration(0)
gameAnimations
  .when()
  .rule(RuleId.PlayoffRoundPhaseTeamReveal)
  .move((move, context) => isMoveItemTypeAtOnce(MaterialType.HockeyPlayerCard)(move) && move.location.player === context.player)
  .duration(0)
gameAnimations
  .when()
  .rule(RuleId.PlayoffRoundPhaseTeamReveal)
  .move((move, context) => isMoveItemTypeAtOnce(MaterialType.BusToken)(move) && move.location.player === context.player)
  .duration(0)
gameAnimations.when().rule(RuleId.PlayoffRoundPhaseTeamReveal).move(isStartSimultaneousRule).duration(1)
