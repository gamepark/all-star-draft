/** @jsxImportSource @emotion/react */

import { useTranslation } from 'react-i18next'

export const DraftRoundPhaseMatchScoreHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.draft.score')}</>
}
