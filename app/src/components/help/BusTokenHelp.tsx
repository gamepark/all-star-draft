/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const BusTokenHelp: FC<MaterialHelpProps<number, MaterialType, LocationType>> = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('help.busToken.title')}</h2>
      <p>{t('help.busToken.description')}</p>
    </>
  )
}
