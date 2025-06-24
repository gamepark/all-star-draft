/** @jsxImportSource @emotion/react */
import { useTranslation } from 'react-i18next'

export const DraftRoundPhaseCardSelectionHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.draft.select')}</>
}
