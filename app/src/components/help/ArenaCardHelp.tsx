/** @jsxImportSource @emotion/react */
import {
  ArenaCard,
  arenaIrregularAttribute,
  arenasFanPoints,
  isArenaForTwoPlayer,
  isArenaWithIrregularFanCount
} from '@gamepark/all-star-draft/material/ArenaCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { IrregularAttribute } from '@gamepark/all-star-draft/material/TeamStrength'
import { MaterialHelpProps, Picture, useRules } from '@gamepark/react-game'
import { TFunction } from 'i18next'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { SupportersIconComponent } from '../symbols/SupportersIconComponent'
import allGear from '../../images/Symbols/ArenaAllGear.png'
import straight from '../../images/Symbols/ArenaStraight.png'
import whistle from '../../images/Symbols/ArenaWhistle.png'
import notForTwoPlayers from '../../images/Symbols/ArenaNot2Players.png'
import threeAndPair from '../../images/Symbols/ArenaThreeOfAKindPair.png'
import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'

const getIrregularAttributeSymbol = (arenaIrregularAttributeElement: IrregularAttribute) => {
  switch (arenaIrregularAttributeElement) {
    case IrregularAttribute.Straight:
      return <Picture src={straight} height={50} />
    case IrregularAttribute.FullHouse:
      return <Picture src={threeAndPair} height={50} />
    case IrregularAttribute.OneOfEach:
      return <Picture src={allGear} height={50} />
  }
}

export const ArenaCardHelp: FC<MaterialHelpProps<number, MaterialType, LocationType>> = ({ item }) => {
  const { t } = useTranslation()
  if (item.id !== undefined) {
    const rules = useRules<AllStarDraftRules>()
    const playerCount = rules?.game.players.length ?? 6
    const arenaId = item.id as ArenaCard
    const fanPoints = arenasFanPoints[arenaId].slice(0, playerCount)
    const isIrregularFanCount = isArenaWithIrregularFanCount(arenaId)
    const irregularAttribute = arenaIrregularAttribute[arenaId]
    return (
      <>
        <h2>{t('help.arenaCard.title')}</h2>
        <h4>{t('help.arenaCard.fanPoints')}</h4>
        <table style={{ tableLayout: 'fixed', border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
          <tbody>
            <tr>
              <th style={{ border: '1px solid black', textAlign: 'center' }}>{t('help.arenaCard.rank')}</th>
              {Array(playerCount)
                .fill(1)
                .map((_, index) => (
                  <td style={{ border: '1px solid black', textAlign: 'center', fontWeight: 'bold' }} key={`rank-index-${index}`}>
                    <Trans defaults="help.arenaCard.rankOrdinal" values={{ rank: index + 1, ordinal: true }} components={{ sup: <sup></sup> }} />
                  </td>
                ))}
            </tr>
            <tr>
              <th>
                <SupportersIconComponent />
              </th>
              {fanPoints.map((points, index) => (
                <td key={`points-${index}`} style={{ border: '1px solid black', textAlign: 'center' }}>
                  {points}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        {irregularAttribute !== undefined && (
          <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h4>{t('help.arenaCard.additionnalRule')}</h4>
              {getIrregularAttributeSymbol(irregularAttribute)}
            </div>
            <p>{getTranslatedAdditionnalRuleKey(irregularAttribute, t)}</p>
          </>
        )}
        {isIrregularFanCount && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Picture src={whistle} width={50} />
            <p>{t('help.arenaCard.irregularFanPoint')}</p>
          </div>
        )}
        {!isArenaForTwoPlayer(arenaId) && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Picture src={notForTwoPlayers} width={50} />
            <p>{t('help.arenaCard.notFor2Players')}</p>
          </div>
        )}
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
