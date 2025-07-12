/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { MaterialHelpProps, Picture } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { TeamStrengthIconComponent } from '../symbols/TeamStrengthIconComponent'
import allGear from '../../images/Symbols/TeamStrengthAllGear.png'
import straight from '../../images/Symbols/TeamStrengthStraight.png'
import threeAndPair from '../../images/Symbols/TeamStrengthThreeAndPair.png'

export const BusStationBoardHelp: FC<MaterialHelpProps<number, MaterialType, LocationType>> = () => {
  const { t } = useTranslation()

  return (
    <>
      <h2>{t('help.busStationBoard.title')}</h2>
      <p>
        <Trans
          defaults={'help.busStationBoard.description'}
          components={{ strengthSymbolMin: <TeamStrengthIconComponent strength={1} />, strengthSymbolMax: <TeamStrengthIconComponent strength={5} /> }}
        />
      </p>
      <p>
        <Trans
          defaults={'help.busStationBoard.description2'}
          components={{
            additionalAttributeListComponent: (
              <>
                <Picture src={straight} height={50} style={{ verticalAlign: 'middle' }} />
                <Picture src={threeAndPair} height={50} style={{ verticalAlign: 'middle' }} />
                <Picture src={allGear} height={50} style={{ verticalAlign: 'middle' }} />
              </>
            )
          }}
        />
      </p>
    </>
  )
}
