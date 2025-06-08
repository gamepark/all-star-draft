import {
  getHockeyPlayerCardSpecie,
  getHockeyPlayerCardSymbol,
  getHockeyPlayerCardValue,
  HockeyPlayerCard,
  HockeyPlayerCardSpeciesType,
  HockeyPlayerCardSymbolsType
} from './HockeyPlayerCard'

export type TeamStrength = {
  strength: number
  attribute: Attribute
  irregularsAttributes?: IrregularAttribute[]
}

type Attribute =
  | {
      kind: AttributeKind.Species
      value: HockeyPlayerCardSpeciesType
    }
  | {
      kind: AttributeKind.Number
      value: number
    }
  | {
      kind: AttributeKind.Symbol
      value: HockeyPlayerCardSymbolsType
    }

export enum AttributeKind {
  Species = 1,
  Number,
  Symbol
}

export enum IrregularAttribute {
  Straight = 1,
  FullHouse,
  OneOfEach
}

export function getTeamStrength(team: HockeyPlayerCard[], playersCount: number): TeamStrength {
  let teamStrength: TeamStrength = { strength: 0, attribute: { kind: AttributeKind.Number, value: 0 } }
  getAttributeKindPriority(playersCount).forEach((kind) => {
    let tempTeam = team
    let fetchValueFunction: (value: HockeyPlayerCard) => number
    switch (kind) {
      case AttributeKind.Species:
        fetchValueFunction = getHockeyPlayerCardSpecie
        break
      case AttributeKind.Symbol:
        fetchValueFunction = getHockeyPlayerCardSymbol
        break
      default:
        fetchValueFunction = getHockeyPlayerCardValue
        break
    }
    while ((tempTeam.length > 0, tempTeam.length >= teamStrength.strength)) {
      const hockeyPlayersToEvaluate = tempTeam.filter((hockeyPlayer) => fetchValueFunction(hockeyPlayer) === fetchValueFunction(tempTeam[0]))
      const newTeamStrength: TeamStrength = {
        strength: hockeyPlayersToEvaluate.length,
        attribute: { kind, value: fetchValueFunction(tempTeam[0]) }
      }
      tempTeam = tempTeam.filter((hockeyPlayer) => !hockeyPlayersToEvaluate.includes(hockeyPlayer))
      if (
        (newTeamStrength.attribute.kind !== AttributeKind.Symbol || newTeamStrength.attribute.value !== HockeyPlayerCardSymbolsType.None) &&
        compareTeam(newTeamStrength, teamStrength, playersCount) > 0
      )
        teamStrength = newTeamStrength
    }
  })
  return teamStrength
}

// Basic comparison. No special rules
export function compareTeam(t1: TeamStrength, t2: TeamStrength, playerCount: number): number {
  if (t1.strength < t2.strength) return -1
  if (t1.strength > t2.strength) return 1
  if (t1.attribute.kind !== t2.attribute.kind)
    return (
      getAttributeKindPriority(playerCount).findIndex((attribute) => attribute === t1.attribute.kind) -
      getAttributeKindPriority(playerCount).findIndex((attribute) => attribute === t2.attribute.kind)
    )
  switch (t1.attribute.kind) {
    case AttributeKind.Species:
      return speciesPriority.findIndex((specie) => specie === t1.attribute.value) - speciesPriority.findIndex((specie) => specie === t2.attribute.value)
    case AttributeKind.Symbol:
      return symbolPriority.findIndex((symbol) => symbol === t1.attribute.value) - symbolPriority.findIndex((symbol) => symbol === t2.attribute.value)
    default:
      return t1.attribute.value - t2.attribute.value
  }
}

function getAttributeKindPriority(playerCount: number): AttributeKind[] {
  if (playerCount > 4) return [AttributeKind.Number, AttributeKind.Species, AttributeKind.Symbol]
  return [AttributeKind.Species, AttributeKind.Number, AttributeKind.Symbol]
}

const speciesPriority = [
  HockeyPlayerCardSpeciesType.Rabbit,
  HockeyPlayerCardSpeciesType.Duck,
  HockeyPlayerCardSpeciesType.Beaver,
  HockeyPlayerCardSpeciesType.Eagle,
  HockeyPlayerCardSpeciesType.Penguin,
  HockeyPlayerCardSpeciesType.Panda,
  HockeyPlayerCardSpeciesType.Wolf,
  HockeyPlayerCardSpeciesType.Shark,
  HockeyPlayerCardSpeciesType.Tiger,
  HockeyPlayerCardSpeciesType.Horse,
  HockeyPlayerCardSpeciesType.Reindeer,
  HockeyPlayerCardSpeciesType.PolarBear
]

const symbolPriority = [
  HockeyPlayerCardSymbolsType.Skate,
  HockeyPlayerCardSymbolsType.Fist,
  HockeyPlayerCardSymbolsType.Helmet,
  HockeyPlayerCardSymbolsType.Puck,
  HockeyPlayerCardSymbolsType.Rock
]
