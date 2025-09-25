
import { useTranslation } from 'react-i18next'

export const PlayOffsRoundPhaseMainMatchHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.playoff.match')}</>
}
