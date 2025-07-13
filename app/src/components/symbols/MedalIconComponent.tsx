/** @jsxImportSource @emotion/react */
import { Picture } from '@gamepark/react-game'
import { FC } from 'react'
import goldMedal from '../../images/Symbols/MedalGold.png'
import silverMedal from '../../images/Symbols/MedalSilver.png'
import bronzeMedal from '../../images/Symbols/MedalBronze.png'

type MedalIconComponentProps = {
  medalNumber: number
  height?: number
}

export const MedalIconComponent: FC<MedalIconComponentProps> = ({ medalNumber, height }) => {
  return (
    <Picture
      src={medalNumber === 1 ? goldMedal : medalNumber === 2 ? silverMedal : bronzeMedal}
      style={{ verticalAlign: 'middle', margin: '0 0.25em' }}
      height={height}
    />
  )
}
