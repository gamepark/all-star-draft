/** @jsxImportSource @emotion/react */

import { useTranslation } from 'react-i18next'

export const DraftRoundPhaseMatchMoveToStadiumHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.draft.moveToArena')}</>
}
