import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { AttributeKind, getAttributeKindPriority } from '@gamepark/all-star-draft/material/TeamStrength'
import { MaterialHelpProps, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const TieBreakerCardHelp: FC<MaterialHelpProps<number, MaterialType, LocationType>> = () => {
  const { t } = useTranslation()
  const rules = useRules<AllStarDraftRules>()
  const isSpeciesSilverAttribute =
    getAttributeKindPriority(rules?.players.length ?? 2)
      .reverse()
      .indexOf(AttributeKind.Species) === 1
  return (
    <>
      <h2>{t('help.tieBreakerCard.title')}</h2>
      <p>{t('help.tieBreakerCard.description1')}</p>
      <ul>
        <li>
          {t('help.tieBreakerCard.description2', {
            silverTieBreaker: isSpeciesSilverAttribute ? t('attributeKind.specie') : t('attributeKind.number'),
            bronzeTieBreaker: isSpeciesSilverAttribute ? t('attributeKind.number') : t('attributeKind.specie')
          })}
        </li>
        <li>{t('help.tieBreakerCard.description3')}</li>
      </ul>
    </>
  )
}
