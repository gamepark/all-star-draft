import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const TieBreakerCardHelp: FC<MaterialHelpProps<number, MaterialType, LocationType>> = () => {
  const { t } = useTranslation()
  return (
    <>
      <h2>{t('help.tieBreakerCard.title')}</h2>
      <p>
        {t('help.tieBreakerCard.description1')}
        <ol>
          <li>{t('help.tieBreakerCard.description2')}</li>
          <li>{t('help.tieBreakerCard.description3')}</li>
        </ol>
      </p>
    </>
  )
}
