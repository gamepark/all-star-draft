/** @jsxImportSource @emotion/react */

import { useTranslation } from 'react-i18next'

export const DraftRoundPhaseTeamCreationHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.DraftRoundPhaseTeamCreation')}</>
}
