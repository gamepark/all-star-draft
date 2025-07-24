/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { Memory } from '@gamepark/all-star-draft/Memory'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { StyledPlayerPanel, usePlayers, useRules } from '@gamepark/react-game'
import { createPortal } from 'react-dom'
import supportersIcon from '../images/Symbols/Supporters.svg'

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
          mainCounter={{
            image: supportersIcon,
            value:
              (rules?.remind<number>(Memory.Score, player.id) ?? 0) +
              (rules?.remind<number>(Memory.ScorePlayoff, player.id) ?? 0) +
              (rules?.remind<number>(Memory.ScoreTicket, player.id) ?? 0)
          }}
          key={player.id}
          player={player}
          color={playerColorCode[player.id]}
          css={[panelCss, panelBackground(playerColorCode[player.id]), panelPosition(index, players.length)]}
          activeRing
        />
      ))}
    </>,
    root
  )
}

const panelCss = css`
  position: absolute;
  width: 28em;
`

const panelPosition = (index: number, players: number) => {
  switch (players) {
    case 2:
      return index === 0 ? bottomRight : topRight
    case 3:
      return index === 0 ? bottomRight : index === 1 ? topLeft : topRight
    default:
      return defaultPanelPosition(index)
  }
}

const topRight = css`
  right: 1em;
  top: 9em;
`

const bottomRight = css`
  right: 1em;
  bottom: 1em;
`

const topLeft = css`
  left: 1em;
  top: 9em;
`

const defaultPanelPosition = (index: number) => css`
  right: 1em;
  top: ${8.5 + index * 16}em;
`

const panelBackground = (color: string) => css`
  background: linear-gradient(135deg, white 0%, ${color} 100%);
`

export const playerColorCode: Record<PlayerColor, string> = {
  [PlayerColor.Yellow]: '#f3d300',
  [PlayerColor.Purple]: '#a63078',
  [PlayerColor.Blue]: '#54c0d8',
  [PlayerColor.Green]: '#c3d200',
  [PlayerColor.Black]: '#121f2b',
  [PlayerColor.Red]: '#ea4612'
}
