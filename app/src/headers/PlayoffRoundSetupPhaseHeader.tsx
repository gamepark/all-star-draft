/** @jsxImportSource @emotion/react */

import { useTranslation } from 'react-i18next'

export const PlayoffRoundSetupPhaseHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.playoff.setup')}</>
}
