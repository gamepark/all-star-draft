import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { Memory } from '@gamepark/all-star-draft/Memory'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { isDeleteItemTypeAtOnce, MaterialGame, MaterialMove, PlayerMemory } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { SupportersIconComponent } from '../../symbols/SupportersIconComponent'

export const PlayOffsPlayerEliminatedNotEnoughCardsComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({
  move,
  context
}) => {
  if (!isDeleteItemTypeAtOnce<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)) {
    return <></>
  }
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const player = gameContext.game.items[MaterialType.HockeyPlayerCard]![move.indexes[0]].location.player!
  const fanPoints = new PlayerMemory(gameContext.game, player).remind<number>(Memory.ScorePlayoff)
  const playerName = usePlayerName(player)
  return (
    <Trans
      i18nKey="history.playOffsPhase.playerEliminatedNotEnoughCards"
      values={{ name: playerName, fanPoints: fanPoints }}
      components={{ supportersIcon: <SupportersIconComponent /> }}
    />
  )
}
