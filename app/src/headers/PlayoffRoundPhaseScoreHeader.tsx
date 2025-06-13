/** @jsxImportSource @emotion/react */

import { useTranslation } from 'react-i18next'

export const PlayoffRoundPhaseScoreHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.PlayoffRoundPhaseScore')}</>
}
