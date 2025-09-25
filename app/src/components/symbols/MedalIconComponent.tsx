import { Picture, PictureAttributes } from '@gamepark/react-game'
import { FC } from 'react'
import bronzeMedal from '../../images/Symbols/MedalBronze.png'
import goldMedal from '../../images/Symbols/MedalGold.png'
import silverMedal from '../../images/Symbols/MedalSilver.png'

type MedalIconComponentProps = {
  medalNumber: number
  height?: number
} & PictureAttributes

export const MedalIconComponent: FC<MedalIconComponentProps> = ({ medalNumber, height, ...props }) => {
  return (
    <Picture
      src={medalNumber === 1 ? goldMedal : medalNumber === 2 ? silverMedal : bronzeMedal}
      style={{ verticalAlign: 'middle', margin: '0 0.25em' }}
      height={height}
      {...props}
    />
  )
}
