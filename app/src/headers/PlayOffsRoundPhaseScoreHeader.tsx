
import { useTranslation } from 'react-i18next'

export const PlayOffsRoundPhaseScoreHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.playoff.score')}</>
}
