/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps } from '@gamepark/react-game'
import { isStartSimultaneousRule, Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'

export const DraftRoundStartComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>, PlayerColor>> = ({
  move,
  context
}) => {
  if (!isStartSimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId>(move) || move.id !== RuleId.DraftRoundSetupDrawCards) {
    return null
  }
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const roundNumber =
    new Material<PlayerColor, MaterialType, LocationType>(MaterialType.ArenaCard, gameContext.game.items[MaterialType.ArenaCard]).location(
      LocationType.CurrentArenasRowSpot
    ).length + 1
  return (
    <h4>
      <Trans defaults="history.draftPhase.roundStart" values={{ roundNumber: roundNumber }} components={{ sup: <sup></sup> }} />
    </h4>
  )
}
