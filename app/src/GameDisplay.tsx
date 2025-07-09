/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { GameTable, GameTableNavigation } from '@gamepark/react-game'
import { PlayerPanels } from './panels/PlayerPanels'

type GameDisplayProps = {
  players: number
}

export function GameDisplay({ players }: GameDisplayProps) {
  const margin = { top: 7, left: 0, right: players > 3 ? 30 : 0, bottom: 0 }
  const tableSize = players > 3 ? { xMin: -75, xMax: 75, yMin: -46, yMax: 46 } : { xMin: -75, xMax: 40, yMin: -46, yMax: 12 }
  return (
    <>
      <GameTable
        xMin={tableSize.xMin}
        xMax={tableSize.xMax}
        yMin={tableSize.yMin}
        yMax={tableSize.yMax}
        margin={margin}
        css={process.env.NODE_ENV === 'development' && tableBorder}
      >
        <GameTableNavigation />
        <PlayerPanels />
      </GameTable>
    </>
  )
}

const tableBorder = css`
  border: 1px solid white;
`
