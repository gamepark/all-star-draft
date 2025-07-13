/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { Memorize } from '@gamepark/all-star-draft/Memorize'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { GameMemory, isEndGame, MaterialGame, MaterialMove, PlayerMemory } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { SupportersIconComponent } from '../symbols/SupportersIconComponent'

export const PlayOffsWinnerComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({ move, context }) => {
  if (!isEndGame<PlayerColor, MaterialType, LocationType>(move)) {
    return <></>
  }
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const winningPlayer = new GameMemory(gameContext.game).remind<PlayerColor[]>(Memorize.ActivePlayers)[0]
  const winningPlayerName = usePlayerName(winningPlayer)
  const fanPoints = new PlayerMemory(gameContext.game, winningPlayer).remind<number>(Memorize.ScorePlayoff)
  return (
    <Trans
      defaults="history.playOffsPhase.winner"
      values={{ name: winningPlayerName, fanPoints: fanPoints }}
      components={{ supporterIcon: <SupportersIconComponent /> }}
    />
  )
}
