import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { MaterialHelpProps, useRules } from '@gamepark/react-game'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { SupportersIconComponent } from '../symbols/SupportersIconComponent'

export const PlayoffTicketTokenHelp: FC<MaterialHelpProps<number, MaterialType, LocationType>> = () => {
  const { t } = useTranslation()
  const rules = useRules<AllStarDraftRules>()
  const playerCount = rules?.players.length
  return (
    <>
      <h2>{t('help.playoffTicket.title')}</h2>
      <p>{t('help.playoffTicket.description')}</p>
      <p>
        <Trans i18nKey="help.playoffTicket.description2" values={{ fanPoints: playerCount }} components={{ supportersIcon: <SupportersIconComponent /> }} />
      </p>
    </>
  )
}
