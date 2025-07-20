/** @jsxImportSource @emotion/react */

import { useTranslation } from 'react-i18next'

export const PlayOffsRoundPhaseTeamRevealHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.draft.reveal')}</>
}
