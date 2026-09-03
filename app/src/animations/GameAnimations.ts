import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { and, isMyMove, isRule, MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType, isMoveItemTypeAtOnce, isShuffle, isStartSimultaneousRule } from '@gamepark/rules-api'

export const gameAnimations = new MaterialGameAnimations()

// Every shuffle in this game is a technical protection: hands, decks and bus tokens are mixed up so that
// nobody can track an item, never as a moment the players are meant to watch. Nothing to show, no animation.
gameAnimations.configure(isShuffle).skip()

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
