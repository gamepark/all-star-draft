/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { CustomMoveType } from '@gamepark/all-star-draft/material/CustomMoveType'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { ItemMenuButton, transformCss, useMaterialContext } from '@gamepark/react-game'
import { range } from 'lodash'
import { useTranslation } from 'react-i18next'
import { playerHockeyPlayerHandSpotLocator } from '../locators/PlayerHockeyPlayerHandSpotLocator'
import { MedalIconComponent } from './symbols/MedalIconComponent'

type Props = {
  xMin: number
  yMin: number
}

export const HandSortButtons = ({ xMin, yMin }: Props) => {
  const { t } = useTranslation()
  const context = useMaterialContext()
  const player = context.player
  if (!player) return null
  const location = { type: LocationType.PlayerHockeyPlayerHandSpot, player, x: 0 }
  if (playerHockeyPlayerHandSpotLocator.countItems(location, context) < 2) return null
  const transforms = playerHockeyPlayerHandSpotLocator.placeLocation(location, context)
  transforms.push('translateX(-5em)')
  const players = context.rules.players.length
  return (
    <>
      {range(1, 4).map((medal) => (
        <ItemMenuButton
          key={medal}
          label={t(`sort.${medal === 1 ? 'equipment' : (medal === 2 && players < 5) || (medal === 3 && players > 4) ? 'number' : 'species'}`)}
          labelPosition="left"
          css={[position(xMin, yMin), transformCss(...transforms, `translateY(${medal * 3 - 7}em)`, 'translateZ(2em)')]}
          move={context.rules.customMove(CustomMoveType.SortHand, medal)}
          options={{ transient: true }}
        >
          <MedalIconComponent medalNumber={medal} css={medalCss} />
        </ItemMenuButton>
      ))}
    </>
  )
}

const position = (xMin: number, yMin: number) => css`
  position: absolute;
  left: ${-xMin}em;
  top: ${-yMin}em;
`

const medalCss = css`
  height: 1.7em;
`
