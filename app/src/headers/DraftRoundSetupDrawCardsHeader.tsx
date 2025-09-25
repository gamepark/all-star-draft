
import { useTranslation } from 'react-i18next'

export const DraftRoundSetupDrawCardsHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.draft.setup')}</>
}
