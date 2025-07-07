import { MaterialHelpProps } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const PlayoffPointCardHelp: FC<MaterialHelpProps<number, MaterialType, LocationType>> = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('help.playoffCard.title')}</h2>
      <p>{t('help.playoffCard.description')}</p>
      <p>{t('help.playoffCard.description2')}</p>
    </>
  )
}
