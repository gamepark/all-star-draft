/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { Memorize } from '@gamepark/all-star-draft/Memorize'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { StyledPlayerPanel, usePlayers, useRules } from '@gamepark/react-game'
import { createPortal } from 'react-dom'

export const PlayerPanels = () => {
  const players = usePlayers<PlayerColor>({ sortFromMe: true })
  const rules = useRules<AllStarDraftRules>()
  const root = document.getElementById('root')
  if (!root) {
    return null
  }

  return createPortal(
    <>
      {players.map((player, index) => (
        <StyledPlayerPanel
          mainCounter={{ image: '', value: rules?.remind<number>(Memorize.Score, player.id) ?? 0 }}
          key={player.id}
          player={player}
          color={playerColorCode[player.id]}
          css={panelPosition(index)}
        />
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
