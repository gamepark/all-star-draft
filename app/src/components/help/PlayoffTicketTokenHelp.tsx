/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const PlayoffTicketTokenHelp: FC<MaterialHelpProps<number, MaterialType, LocationType>> = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('help.playoffTicket.title')}</h2>
      <p>{t('help.playoffTicket.description')}</p>
      <p>{t('help.playoffTicket.description2')}</p>
    </>
  )
}
