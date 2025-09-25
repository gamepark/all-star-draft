import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { playoffFanPoint } from '@gamepark/all-star-draft/material/PlayoffPointCard'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { isEndGame, Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { SupportersIconComponent } from '../../symbols/SupportersIconComponent'

const COLORS_NEEDING_CONTOUR = [PlayerColor.Green, PlayerColor.Yellow, PlayerColor.Blue]

export const PlayOffsWinnerComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({ move, context }) => {
  if (!isEndGame<PlayerColor, MaterialType, LocationType>(move)) {
    return <></>
  }
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const hockeyPlayerCardsMaterial = new Material<PlayerColor, MaterialType, LocationType>(
    MaterialType.HockeyPlayerCard,
    gameContext.game.items[MaterialType.HockeyPlayerCard]
  )
  const winningPlayer = gameContext.game.players.find((p) => hockeyPlayerCardsMaterial.player(p).length > 0)!
  const winningPlayerName = usePlayerName(winningPlayer)
  const fanPoints = playoffFanPoint[gameContext.game.players.length][0]
  return (
    <Trans
      i18nKey="history.playOffsPhase.winner"
      values={{ name: winningPlayerName, fanPoints: fanPoints }}
      components={{ supporterIcon: <SupportersIconComponent contour={COLORS_NEEDING_CONTOUR.includes(winningPlayer)} /> }}
    />
  )
}
