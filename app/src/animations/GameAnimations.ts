import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { and, isMyMove, isRule, MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType, isMoveItemTypeAtOnce, isStartSimultaneousRule } from '@gamepark/rules-api'

export const gameAnimations = new MaterialGameAnimations()

gameAnimations
  .configure(and(
    isRule(RuleId.DraftRoundPhaseTeamReveal),
    (move, context) => isMoveItemType(MaterialType.HockeyPlayerCard)(move) && move.location.player === context.player
  ))
  .skip()
gameAnimations
  .configure(and(
    isRule(RuleId.DraftRoundPhaseTeamReveal),
    (move, context) => isMoveItemType(MaterialType.BusToken)(move) && move.location.player === context.player
  ))
  .skip()
gameAnimations
  .configure(and(
    isRule(RuleId.DraftRoundPhaseTeamReveal),
    (move, context) => isMoveItemTypeAtOnce(MaterialType.HockeyPlayerCard)(move) && move.location.player === context.player
  ))
  .skip()
gameAnimations
  .configure(and(
    isRule(RuleId.DraftRoundPhaseTeamReveal),
    (move, context) => isMoveItemTypeAtOnce(MaterialType.BusToken)(move) && move.location.player === context.player,
    isMyMove()
  ))
  .skip()
gameAnimations.configure(and(isRule(RuleId.DraftRoundPhaseMatchScore), isStartSimultaneousRule)).duration(1000)
gameAnimations
  .configure(and(
    isRule(RuleId.PlayoffRoundPhaseTeamReveal),
    (move, context) => isMoveItemType(MaterialType.HockeyPlayerCard)(move) && move.location.player === context.player
  ))
  .skip()
gameAnimations
  .configure(and(
    isRule(RuleId.PlayoffRoundPhaseTeamReveal),
    (move, context) => isMoveItemType(MaterialType.BusToken)(move) && move.location.player === context.player
  ))
  .skip()
gameAnimations
  .configure(and(
    isRule(RuleId.PlayoffRoundPhaseTeamReveal),
    (move, context) => isMoveItemTypeAtOnce(MaterialType.HockeyPlayerCard)(move) && move.location.player === context.player
  ))
  .skip()
gameAnimations
  .configure(and(
    isRule(RuleId.PlayoffRoundPhaseTeamReveal),
    (move, context) => isMoveItemTypeAtOnce(MaterialType.BusToken)(move) && move.location.player === context.player
  ))
  .skip()
gameAnimations.configure(and(isRule(RuleId.PlayoffRoundPhaseTeamReveal), isStartSimultaneousRule)).duration(1000)
