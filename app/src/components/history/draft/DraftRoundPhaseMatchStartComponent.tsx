/** @jsxImportSource @emotion/react */
import { ArenaCard } from '@gamepark/all-star-draft/material/ArenaCard'
import { getBusTokenValue, KnownBusTokenId } from '@gamepark/all-star-draft/material/BusToken'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps } from '@gamepark/react-game'
import { isStartSimultaneousRule, Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'

export const DraftRoundPhaseMatchStartComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>, PlayerColor>> = ({
  move,
  context
}) => {
  const { t } = useTranslation()
  if (!isStartSimultaneousRule<PlayerColor, MaterialType, LocationType, RuleId>(move) || move.id !== RuleId.DraftRoundPhaseMatchScore) {
    return null
  }
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType, RuleId>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const arenaMaterial = new Material<PlayerColor, MaterialType, LocationType>(MaterialType.ArenaCard, gameContext.game.items[MaterialType.ArenaCard]).location(
    LocationType.CurrentArenasRowSpot
  )
  const roundNumber = arenaMaterial.length
  const minBusTokenItem = new Material<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken, gameContext.game.items[MaterialType.BusToken])
    .location(LocationType.PlayerBusTokenTeamSpot)
    .minBy((item) => getBusTokenValue((item.id as KnownBusTokenId).front))
    .getItem<KnownBusTokenId>()!
  const matchNumber = getBusTokenValue(minBusTokenItem.id.front)
  const arena = arenaMaterial.location((l) => l.x === matchNumber - 1).getItem<ArenaCard>()!
  return (
    <Trans
      defaults="history.draftPhase.matchResultStart"
      values={{ roundNumber: roundNumber, matchNumber: matchNumber, arena: t(`arena.${ArenaCard[arena.id]}`) }}
      components={{ sup: <sup></sup> }}
    />
  )
}
