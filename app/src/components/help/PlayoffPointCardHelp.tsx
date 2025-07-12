/** @jsxImportSource @emotion/react */
import { MaterialHelpProps, useRules } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { SupportersIconComponent } from '../symbols/SupportersIconComponent'
import { playoffFanPoint } from '@gamepark/all-star-draft/material/PlayoffPointCard'

export const PlayoffPointCardHelp: FC<MaterialHelpProps<number, MaterialType, LocationType>> = () => {
  const { t } = useTranslation()
  const rules = useRules<AllStarDraftRules>()
  const playerCount = rules?.game.players.length ?? 6
  const fanPoints = playoffFanPoint[playerCount]
  return (
    <>
      <h2>{t('help.playoffCard.title')}</h2>
      <p>{t('help.playoffCard.description')}</p>
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
      <p>{t('help.playoffCard.description2')}</p>
    </>
  )
}
