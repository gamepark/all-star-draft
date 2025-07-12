/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FailuresDialog, FullscreenDialog, LiveLogContainer, LoadingScreen, MaterialHeader, MaterialImageLoader, Menu, useGame } from '@gamepark/react-game'
import { MaterialGame } from '@gamepark/rules-api'
import { useEffect, useState } from 'react'
import { GameDisplay } from './GameDisplay'
import { Headers } from './headers/Headers'

const liveLogCss = css`
  position: absolute;
  left: 1em;
  bottom: 1em;
  width: 45em;
  pointer-events: none;
`

export default function App() {
  const game = useGame<MaterialGame>()
  const [isJustDisplayed, setJustDisplayed] = useState(true)
  const [isImagesLoading, setImagesLoading] = useState(true)
  useEffect(() => {
    setTimeout(() => setJustDisplayed(false), 2000)
  }, [])
  const loading = !game || isJustDisplayed || isImagesLoading
  return (
    <>
      {!!game && <GameDisplay players={game.players.length} />}
      <LoadingScreen
        display={loading}
        author="Marco Schaub"
        artist={['Malte Zirbel', 'Armand Teixier']}
        publisher="Palladis Games"
        developer={['Isilud', 'SwHawk']}
      />
      {!loading && <LiveLogContainer css={liveLogCss} />}
      <MaterialHeader rulesStepsHeaders={Headers} loading={loading} />
      <MaterialImageLoader onImagesLoad={() => setImagesLoading(false)} />
      <Menu />
      <FailuresDialog />
      <FullscreenDialog />
    </>
  )
}
