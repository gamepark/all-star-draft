/** @jsxImportSource @emotion/react */

import { useTranslation } from 'react-i18next'

export const PlayoffRoundPhaseMainMatchHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.PlayoffRoundPhaseMainMatch')}</>
}
