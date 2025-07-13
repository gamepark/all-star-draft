import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MaterialGameAnimations } from '@gamepark/react-game'
import { isMoveItemType } from '@gamepark/rules-api'

export const gameAnimations = new MaterialGameAnimations()

gameAnimations.when().rule(RuleId.DraftRoundSetupDrawCards).move(isMoveItemType(MaterialType.HockeyPlayerCard)).duration(0.4)

gameAnimations.when().rule(RuleId.PlayoffRoundPhaseTeamReveal).move(isMoveItemType(MaterialType.HockeyPlayerCard)).mine().duration(0)
gameAnimations.when().rule(RuleId.PlayoffRoundPhaseTeamReveal).move(isMoveItemType(MaterialType.BusToken)).mine().duration(0)
