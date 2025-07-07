import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import {
  getHockeyPlayerCardSpecie,
  getHockeyPlayerCardSymbol,
  getHockeyPlayerCardValue,
  getSpecieTranslationKey,
  getSymbolTranslationKey,
  HockeyPlayerCard,
  HockeyPlayerCardSymbolsType
} from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { AttributeKind, getAttributeKindPriority } from '@gamepark/all-star-draft/material/TeamStrength'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { MaterialHelpProps, usePlayerName, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { MedalIconComponent } from '../symbols/MedalIconComponent'
import { getSpeciesValueComponent, getSymbolValueComponent } from './util/valueComponents'
import { MaterialItem } from '@gamepark/rules-api'
import { TFunction } from 'i18next'

export const HockeyPlayerCardHelp: FC<MaterialHelpProps<PlayerColor, MaterialType, LocationType>> = ({ item }) => {
  const { t } = useTranslation()
  const rules = useRules<AllStarDraftRules>()
  if (item.id !== undefined) {
    const hockeyPlayerId = item.id as HockeyPlayerCard
    const translatedSpecie = getSpecieTranslationKey(getHockeyPlayerCardSpecie(hockeyPlayerId), t)
    const cardValue = getHockeyPlayerCardValue(hockeyPlayerId)
    const translatedSymbol = getSymbolTranslationKey(getHockeyPlayerCardSymbol(hockeyPlayerId), t)
    const boldComponent = <strong />
    const speciesComponent = (
      <p>
        <Trans
          defaults={'help.hockeyPlayerCard.specie'}
          components={{
            bold: boldComponent,
            medalComponent: (
              <MedalIconComponent
                medalNumber={
                  getAttributeKindPriority(rules?.players.length ?? 2)
                    .reverse()
                    .indexOf(AttributeKind.Species) + 1
                }
              />
            ),
            valueComponent: getSpeciesValueComponent(getHockeyPlayerCardSpecie(hockeyPlayerId))!
          }}
          values={{ specie: translatedSpecie }}
        />
      </p>
    )
    const numberComponent = (
      <p>
        <Trans
          defaults={'help.hockeyPlayerCard.number'}
          components={{
            bold: boldComponent,
            medalComponent: (
              <MedalIconComponent
                medalNumber={
                  getAttributeKindPriority(rules?.players.length ?? 2)
                    .reverse()
                    .indexOf(AttributeKind.Number) + 1
                }
              />
            )
          }}
          values={{ number: cardValue.toString() }}
        />
      </p>
    )
    const isSpeciesSecondAttributeInPriority =
      getAttributeKindPriority(rules?.players.length ?? 2)
        .reverse()
        .indexOf(AttributeKind.Species) == 1
    return (
      <>
        <h2>{getTitleKey(item, t)}</h2>
        {getHockeyPlayerCardSymbol(hockeyPlayerId) !== HockeyPlayerCardSymbolsType.None && (
          <p>
            <Trans
              defaults={'help.hockeyPlayerCard.symbol'}
              components={{
                bold: boldComponent,
                medalComponent: <MedalIconComponent medalNumber={1} />,
                valueComponent: getSymbolValueComponent(getHockeyPlayerCardSymbol(hockeyPlayerId))!
              }}
              values={{ symbol: translatedSymbol }}
            />
          </p>
        )}
        {isSpeciesSecondAttributeInPriority ? speciesComponent : numberComponent}
        {isSpeciesSecondAttributeInPriority ? numberComponent : speciesComponent}
      </>
    )
  }
  return <h2>{getTitleKey(item, t)}</h2>
}

function getTitleKey(item: Partial<MaterialItem<PlayerColor, LocationType>>, t: TFunction): string {
  const { location } = item
  if (location?.type === LocationType.PlayerHockeyPlayerHandSpot) {
    return t('help.hockeyPlayerCard.handTitle', { playerName: usePlayerName(location.player) })
  }
  if (location?.type === LocationType.HockeyPlayerDraftSpot) {
    return t('help.hockeyPlayerCard.draftTitle', { playerName: usePlayerName(location.player) })
  }
  return t('help.hockeyPlayerCard.title')
}
