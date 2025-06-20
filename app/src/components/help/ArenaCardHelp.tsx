import { ArenaCard, arenaIrregularAttribute, arenasFanPoints, isArenaWithIrregularFanCount } from '@gamepark/all-star-draft/material/ArenaCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { IrregularAttribute } from '@gamepark/all-star-draft/material/TeamStrength'
import { MaterialHelpProps } from '@gamepark/react-game'
import { TFunction } from 'i18next'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'

export const ArenaCardHelp: FC<MaterialHelpProps<number, MaterialType, LocationType>> = ({ item }) => {
  const { t } = useTranslation()
  if (item.id !== undefined) {
    const arenaId = item.id as ArenaCard
    const fanPoints = arenasFanPoints[arenaId]
    const isIrregularFanCount = isArenaWithIrregularFanCount(arenaId)
    return (
      <>
        <h2>{t('help.arenaCard.title')}</h2>
        <h4>{t('help.arenaCard.fanPoints')}</h4>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(6, 1fr)`,
            width: '100%',
            borderTop: '1px solid black',
            borderLeft: '1px solid black',
            textAlign: 'center'
          }}
        >
          {fanPoints.map((_, index) => (
            <div key={`index-${index}`} style={{ borderRight: '1px solid black', borderBottom: '1px solid black', fontWeight: 'bold' }}>
              {index + 1}
            </div>
          ))}
          {fanPoints.map((value, index) => (
            <div key={`value-${index}`} style={{ borderRight: '1px solid black', borderBottom: '1px solid black' }}>
              {value}
            </div>
          ))}
        </div>
        <h4>{t('help.arenaCard.additionnalRule')}</h4>
        {arenaIrregularAttribute[arenaId] !== undefined && <p>{getTranslatedAdditionnalRuleKey(arenaIrregularAttribute[arenaId]!, t)}</p>}
        {isIrregularFanCount && <p>{t('help.arenaCard.irregularFanPoint')}</p>}
      </>
    )
  }
  return <></>
}

const getTranslatedAdditionnalRuleKey = (irregularAttribute: IrregularAttribute, t: TFunction) => {
  switch (irregularAttribute) {
    case IrregularAttribute.FullHouse:
      return t('help.arenaCard.additionnalRule.fullHouse')
    case IrregularAttribute.OneOfEach:
      return t('help.arenaCard.additionnalRule.oneOfEach')
    case IrregularAttribute.Straight:
      return t('help.arenaCard.additionnalRule.straight')
    default:
      throw new Error('Invalid Special Rule')
  }
}
