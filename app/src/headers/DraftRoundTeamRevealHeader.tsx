
import { useTranslation } from 'react-i18next'

export const DraftRoundTeamRevealHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.draft.reveal')}</>
}
