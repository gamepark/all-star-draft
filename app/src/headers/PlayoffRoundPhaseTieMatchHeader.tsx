/** @jsxImportSource @emotion/react */

import { useTranslation } from 'react-i18next'

export const PlayoffRoundPhaseTieMatchHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.playoff.tie')}</>
}
