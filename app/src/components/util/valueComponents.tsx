import { BusToken, BusTokenId } from '@gamepark/all-star-draft/material/BusToken'
import { HockeyPlayerCardSpeciesType, HockeyPlayerCardSymbolsType } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
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
import blackBus from '../../images/Tokens/Bus/BlackBack.png'
import blackBus1 from '../../images/Tokens/Bus/Black1.png'
import blackBus2 from '../../images/Tokens/Bus/Black2.png'
import blackBus3 from '../../images/Tokens/Bus/Black3.png'
import blueBus from '../../images/Tokens/Bus/BlueBack.png'
import blueBus1 from '../../images/Tokens/Bus/Blue1.png'
import blueBus2 from '../../images/Tokens/Bus/Blue2.png'
import blueBus3 from '../../images/Tokens/Bus/Blue3.png'
import greenBus from '../../images/Tokens/Bus/GreenBack.png'
import greenBus1 from '../../images/Tokens/Bus/Green1.png'
import greenBus2 from '../../images/Tokens/Bus/Green2.png'
import greenBus3 from '../../images/Tokens/Bus/Green3.png'
import purpleBus from '../../images/Tokens/Bus/PurpleBack.png'
import purpleBus1 from '../../images/Tokens/Bus/Purple1.png'
import purpleBus2 from '../../images/Tokens/Bus/Purple2.png'
import purpleBus3 from '../../images/Tokens/Bus/Purple3.png'
import redBus from '../../images/Tokens/Bus/RedBack.png'
import redBus1 from '../../images/Tokens/Bus/Red1.png'
import redBus2 from '../../images/Tokens/Bus/Red2.png'
import redBus3 from '../../images/Tokens/Bus/Red3.png'
import yellowBus from '../../images/Tokens/Bus/YellowBack.png'
import yellowBus1 from '../../images/Tokens/Bus/Yellow1.png'
import yellowBus2 from '../../images/Tokens/Bus/Yellow2.png'
import yellowBus3 from '../../images/Tokens/Bus/Yellow3.png'

const verticalAlignMiddleStyle: CSSProperties = {
  verticalAlign: 'middle'
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
    switch (value.back) {
      case PlayerColor.Black:
        return <Picture src={blackBus} height={50} style={verticalAlignMiddleStyle} />
      case PlayerColor.Blue:
        return <Picture src={blueBus} height={50} style={verticalAlignMiddleStyle} />
      case PlayerColor.Green:
        return <Picture src={greenBus} height={50} style={verticalAlignMiddleStyle} />
      case PlayerColor.Purple:
        return <Picture src={purpleBus} height={50} style={verticalAlignMiddleStyle} />
      case PlayerColor.Red:
        return <Picture src={redBus} height={50} style={verticalAlignMiddleStyle} />
      case PlayerColor.Yellow:
        return <Picture src={yellowBus} height={50} style={verticalAlignMiddleStyle} />
    }
  }
  switch (value.front) {
    case BusToken.Black1:
      return <Picture src={blackBus1} height={50} style={verticalAlignMiddleStyle} />
    case BusToken.Black2:
      return <Picture src={blackBus2} height={50} style={verticalAlignMiddleStyle} />
    case BusToken.Black3:
      return <Picture src={blackBus3} height={50} style={verticalAlignMiddleStyle} />
    case BusToken.Blue1:
      return <Picture src={blueBus1} height={50} style={verticalAlignMiddleStyle} />
    case BusToken.Blue2:
      return <Picture src={blueBus2} height={50} style={verticalAlignMiddleStyle} />
    case BusToken.Blue3:
      return <Picture src={blueBus3} height={50} style={verticalAlignMiddleStyle} />
    case BusToken.Green1:
      return <Picture src={greenBus1} height={50} style={verticalAlignMiddleStyle} />
    case BusToken.Green2:
      return <Picture src={greenBus2} height={50} style={verticalAlignMiddleStyle} />
    case BusToken.Green3:
      return <Picture src={greenBus3} height={50} style={verticalAlignMiddleStyle} />
    case BusToken.Purple1:
      return <Picture src={purpleBus1} height={50} style={verticalAlignMiddleStyle} />
    case BusToken.Purple2:
      return <Picture src={purpleBus2} height={50} style={verticalAlignMiddleStyle} />
    case BusToken.Purple3:
      return <Picture src={purpleBus3} height={50} style={verticalAlignMiddleStyle} />
    case BusToken.Red1:
      return <Picture src={redBus1} height={50} style={verticalAlignMiddleStyle} />
    case BusToken.Red2:
      return <Picture src={redBus2} height={50} style={verticalAlignMiddleStyle} />
    case BusToken.Red3:
      return <Picture src={redBus3} height={50} style={verticalAlignMiddleStyle} />
    case BusToken.Yellow1:
      return <Picture src={yellowBus1} height={50} style={verticalAlignMiddleStyle} />
    case BusToken.Yellow2:
      return <Picture src={yellowBus2} height={50} style={verticalAlignMiddleStyle} />
    case BusToken.Yellow3:
      return <Picture src={yellowBus3} height={50} style={verticalAlignMiddleStyle} />
  }
}
