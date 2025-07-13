import { BusTokenId } from '@gamepark/all-star-draft/material/BusToken'
import { HockeyPlayerCardSpeciesType, HockeyPlayerCardSymbolsType } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { IrregularAttribute } from '@gamepark/all-star-draft/material/TeamStrength'
import { Picture } from '@gamepark/react-game'
import { CSSProperties } from 'react'
import glove from '../../images/Symbols/GearGlove.png'
import goal from '../../images/Symbols/GearGoal.png'
import helmet from '../../images/Symbols/GearHelmet.png'
import puck from '../../images/Symbols/GearPuck.png'
import skates from '../../images/Symbols/GearSkates.png'
import beaver from '../../images/Symbols/SpeciesBeaver.png'
import duck from '../../images/Symbols/SpeciesDuck.png'
import eagle from '../../images/Symbols/SpeciesEagle.png'
import horse from '../../images/Symbols/SpeciesHorse.png'
import panda from '../../images/Symbols/SpeciesPandaBear.png'
import penguin from '../../images/Symbols/SpeciesPenguin.png'
import polarBear from '../../images/Symbols/SpeciesPolarBear.png'
import rabbit from '../../images/Symbols/SpeciesRabbit.png'
import reindeer from '../../images/Symbols/SpeciesReindeer.png'
import shark from '../../images/Symbols/SpeciesShark.png'
import tiger from '../../images/Symbols/SpeciesTiger.png'
import wolf from '../../images/Symbols/SpeciesWolf.png'
import allGear from '../../images/Symbols/TeamStrengthAllGear.png'
import fullHouse from '../../images/Symbols/TeamStrengthThreeAndPair.png'
import straight from '../../images/Symbols/TeamStrengthStraight.png'
import { busTokenDescription } from '../../material/BusTokenDescription'

const verticalAlignMiddleStyle: CSSProperties = {
  verticalAlign: 'middle',
  margin: '0 0.25em',
  height: '2.5em'
}

export const getSymbolValueComponent = (value: HockeyPlayerCardSymbolsType) => {
  switch (value) {
    case HockeyPlayerCardSymbolsType.Glove:
      return <Picture src={glove} style={verticalAlignMiddleStyle} />
    case HockeyPlayerCardSymbolsType.Skate:
      return <Picture src={skates} style={verticalAlignMiddleStyle} />
    case HockeyPlayerCardSymbolsType.Helmet:
      return <Picture src={helmet} style={verticalAlignMiddleStyle} />
    case HockeyPlayerCardSymbolsType.Goal:
      return <Picture src={goal} style={verticalAlignMiddleStyle} />
    case HockeyPlayerCardSymbolsType.Puck:
      return <Picture src={puck} style={verticalAlignMiddleStyle} />
    default:
      return undefined
  }
}

const speciesImages: Record<HockeyPlayerCardSpeciesType, string> = {
  [HockeyPlayerCardSpeciesType.Rabbit]: rabbit,
  [HockeyPlayerCardSpeciesType.Duck]: duck,
  [HockeyPlayerCardSpeciesType.Beaver]: beaver,
  [HockeyPlayerCardSpeciesType.Eagle]: eagle,
  [HockeyPlayerCardSpeciesType.Penguin]: penguin,
  [HockeyPlayerCardSpeciesType.Panda]: panda,
  [HockeyPlayerCardSpeciesType.Wolf]: wolf,
  [HockeyPlayerCardSpeciesType.Shark]: shark,
  [HockeyPlayerCardSpeciesType.Tiger]: tiger,
  [HockeyPlayerCardSpeciesType.Horse]: horse,
  [HockeyPlayerCardSpeciesType.Reindeer]: reindeer,
  [HockeyPlayerCardSpeciesType.PolarBear]: polarBear
}

export const getSpeciesValueComponent = (value: HockeyPlayerCardSpeciesType) => {
  return <Picture src={speciesImages[value]} style={verticalAlignMiddleStyle} />
}

export const getBusValueComponent = (value: BusTokenId) => {
  if (value.front === undefined) {
    return <Picture src={busTokenDescription.backImages[value.back]} style={verticalAlignMiddleStyle} />
  }
  return <Picture src={busTokenDescription.images[value.front]} style={verticalAlignMiddleStyle} />
}

const getIrregularAttributePictureSrc = (value: IrregularAttribute): string => {
  switch (value) {
    case IrregularAttribute.FullHouse:
      return fullHouse
    case IrregularAttribute.Straight:
      return straight
    case IrregularAttribute.OneOfEach:
      return allGear
  }
}
export const getIrregularAttributeSymbol = (value: IrregularAttribute, key?: string) => {
  const srcValue = getIrregularAttributePictureSrc(value)
  return <Picture key={key} src={srcValue} style={verticalAlignMiddleStyle} />
}
