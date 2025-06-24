/** @jsxImportSource @emotion/react */

import { useTranslation } from 'react-i18next'

export const PlayoffRoundPhaseInterMatchDiscardPlayerHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.playoff.discardPlayer')}</>
}
