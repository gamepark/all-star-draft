import { BusTokenId } from '@gamepark/all-star-draft/material/BusToken'
import { HockeyPlayerCardSpeciesType, HockeyPlayerCardSymbolsType } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
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
import { busTokenDescription } from '../../material/BusTokenDescription'

const verticalAlignMiddleStyle: CSSProperties = {
  verticalAlign: 'middle',
  margin: '0 0.25em'
}

export const getSymbolValueComponent = (value: HockeyPlayerCardSymbolsType) => {
  switch (value) {
    case HockeyPlayerCardSymbolsType.Glove:
      return <Picture src={glove} height={50} style={verticalAlignMiddleStyle} />
    case HockeyPlayerCardSymbolsType.Skate:
      return <Picture src={skates} height={50} style={verticalAlignMiddleStyle} />
    case HockeyPlayerCardSymbolsType.Helmet:
      return <Picture src={helmet} height={50} style={verticalAlignMiddleStyle} />
    case HockeyPlayerCardSymbolsType.Goal:
      return <Picture src={goal} height={50} style={verticalAlignMiddleStyle} />
    case HockeyPlayerCardSymbolsType.Puck:
      return <Picture src={puck} height={50} style={verticalAlignMiddleStyle} />
    default:
      return undefined
  }
}
export const getSpeciesValueComponent = (value: HockeyPlayerCardSpeciesType) => {
  switch (value) {
    case HockeyPlayerCardSpeciesType.Rabbit:
      return <Picture src={rabbit} height={50} style={verticalAlignMiddleStyle} />
    case HockeyPlayerCardSpeciesType.Duck:
      return <Picture src={duck} height={50} style={verticalAlignMiddleStyle} />
    case HockeyPlayerCardSpeciesType.Beaver:
      return <Picture src={beaver} height={50} style={verticalAlignMiddleStyle} />
    case HockeyPlayerCardSpeciesType.Eagle:
      return <Picture src={eagle} height={50} style={verticalAlignMiddleStyle} />
    case HockeyPlayerCardSpeciesType.Penguin:
      return <Picture src={penguin} height={50} style={verticalAlignMiddleStyle} />
    case HockeyPlayerCardSpeciesType.Panda:
      return <Picture src={panda} height={50} style={verticalAlignMiddleStyle} />
    case HockeyPlayerCardSpeciesType.Wolf:
      return <Picture src={wolf} height={50} style={verticalAlignMiddleStyle} />
    case HockeyPlayerCardSpeciesType.Shark:
      return <Picture src={shark} height={50} style={verticalAlignMiddleStyle} />
    case HockeyPlayerCardSpeciesType.Tiger:
      return <Picture src={tiger} height={50} style={verticalAlignMiddleStyle} />
    case HockeyPlayerCardSpeciesType.Horse:
      return <Picture src={horse} height={50} style={verticalAlignMiddleStyle} />
    case HockeyPlayerCardSpeciesType.Reindeer:
      return <Picture src={reindeer} height={50} style={verticalAlignMiddleStyle} />
    case HockeyPlayerCardSpeciesType.PolarBear:
      return <Picture src={polarBear} height={50} style={verticalAlignMiddleStyle} />
    default:
      return undefined
  }
}

export const getBusValueComponent = (value: BusTokenId) => {
  if (value.front === undefined) {
    return <Picture src={busTokenDescription.backImages[value.back]} height={50} style={verticalAlignMiddleStyle} />
  }
  return <Picture src={busTokenDescription.images[value.front]} height={50} style={verticalAlignMiddleStyle} />
}
