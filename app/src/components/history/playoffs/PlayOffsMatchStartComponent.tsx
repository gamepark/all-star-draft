import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps } from '@gamepark/react-game'
import { isStartSimultaneousRule, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { getPlayOffsRoundNumber } from '../util/getPlayOffsRoundNumber'

export const PlayOffsMatchStartComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({ move, context }) => {
  if (!isStartSimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId>(move) || move.id !== RuleId.PlayoffRoundPhaseMainMatch) {
    return null
  }
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const roundNumber = getPlayOffsRoundNumber(gameContext)
  return <Trans i18nKey="history.playOffsPhase.matchStart" values={{ roundNumber: roundNumber }} components={{ sup: <sup></sup> }} />
}
