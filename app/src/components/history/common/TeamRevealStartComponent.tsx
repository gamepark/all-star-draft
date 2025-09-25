import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps } from '@gamepark/react-game'
import { isStartSimultaneousRule, Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { getPlayOffsRoundNumber } from '../util/getPlayOffsRoundNumber'

export const TeamRevealStartComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>, PlayerColor>> = ({
  move,
  context
}) => {
  if (
    !isStartSimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId>(move) ||
    (move.id !== RuleId.DraftRoundPhaseTeamReveal && move.id !== RuleId.PlayoffRoundPhaseTeamReveal)
  ) {
    return null
  }
  const isPlayOffsPhase = move.id === RuleId.PlayoffRoundPhaseTeamReveal
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const roundNumber = isPlayOffsPhase
    ? getPlayOffsRoundNumber(gameContext)
    : new Material<PlayerColor, MaterialType, LocationType>(MaterialType.ArenaCard, gameContext.game.items[MaterialType.ArenaCard]).location(
        LocationType.CurrentArenasRowSpot
      ).length
  return (
    <Trans
      i18nKey={isPlayOffsPhase ? 'history.playOffsPhase.teamRevealStart' : 'history.draftPhase.teamRevealStart'}
      values={{ roundNumber: roundNumber }}
      components={{ sup: <sup></sup> }}
    />
  )
}
