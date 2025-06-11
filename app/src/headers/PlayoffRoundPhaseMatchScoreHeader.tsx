/** @jsxImportSource @emotion/react */

import { useTranslation } from 'react-i18next'

export const PlayoffRoundPhaseMatchScoreHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.PlayoffRoundPhaseMatchScore')}</>
}
