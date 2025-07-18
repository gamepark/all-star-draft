/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import { HandSortButtons } from './components/HandSortButtons'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number
}

export function GameDisplay({ players }: GameDisplayProps) {
  const margin = { top: 7, left: 0, right: players > 3 ? 30 : 0, bottom: 0 }
  const xMax = players === 2 ? 40 : players === 3 ? 48 : 75
  const yMax = players === 2 ? 12 : players === 3 ? 20 : 46
  const xMin = -75
  const yMin = -46
  return (
    <>
      <GameTable xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} margin={margin} css={process.env.NODE_ENV === 'development' && tableBorder}>
        <GameTableNavigation css={navigationCss(players)} />
        <PlayerPanels />
        <HandSortButtons xMin={xMin} yMin={yMin} />
      </GameTable>
    </>
  )
}

const tableBorder = css`
  border: 1px solid white;
`

const navigationCss = (players: number) => css`
  top: ${players === 2 ? 10 : 20}em;
`
