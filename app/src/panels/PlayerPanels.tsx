/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { StyledPlayerPanel, usePlayers } from '@gamepark/react-game'
import { createPortal } from 'react-dom'

export const PlayerPanels = () => {
  const players = usePlayers<PlayerColor>({ sortFromMe: true })
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) => (
        <StyledPlayerPanel key={player.id} player={player} color={playerColorCode[player.id]} css={panelPosition(index)} />
      ))}
    </>,
    root
  )
}
const panelPosition = (index: number) => css`
  position: absolute;
  right: 1em;
  top: ${8.5 + index * 16}em;
  width: 28em;
`

export const playerColorCode: Record<PlayerColor, string> = {
  [PlayerColor.Yellow]: 'yellow',
  [PlayerColor.Purple]: 'purple',
  [PlayerColor.Blue]: 'blue',
  [PlayerColor.Green]: 'green',
  [PlayerColor.Black]: 'black',
  [PlayerColor.Red]: 'red'
}
