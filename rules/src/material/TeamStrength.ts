import { union, maxBy, intersection } from 'lodash'
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

const getCombinationsOfLength = (
  teamCharacteristics: {
    teams: Map<HockeyPlayerCardSpeciesType, HockeyPlayerCard[]>
    symbols: Map<HockeyPlayerCardSymbolsType, HockeyPlayerCard[]>
    numbers: Map<number, HockeyPlayerCard[]>
  },
  length: number
) => {
  return [teamCharacteristics.teams, teamCharacteristics.symbols, teamCharacteristics.numbers].flatMap((map) =>
    Array.from(map.values()).filter((cardArray) => cardArray.length === length)
  )
}

const getTeamStrengthFromCharacteristics = (
  teamCharacteristics: {
    teams: Map<HockeyPlayerCardSpeciesType, HockeyPlayerCard[]>
    symbols: Map<HockeyPlayerCardSymbolsType, HockeyPlayerCard[]>
    numbers: Map<number, HockeyPlayerCard[]>
  },
  attributeKind: AttributeKind
): TeamStrength => {
  const iterable =
    attributeKind === AttributeKind.Species
      ? teamCharacteristics.teams.entries()
      : attributeKind === AttributeKind.Symbol
        ? teamCharacteristics.symbols
        : teamCharacteristics.numbers
  const teamStrength = Array.from(iterable).reduce<TeamStrength>(
    (maxObject, currentEntry): TeamStrength => {
      const value = currentEntry[0]
      const strength = currentEntry[1].length
      if (strength > maxObject.strength) {
        maxObject.strength = strength
        maxObject.attribute.value = value
      } else if (strength == maxObject.strength && value > maxObject.attribute.value) {
        maxObject.attribute.value = value
      }
      return maxObject
    },
    { strength: 0, attribute: { kind: attributeKind, value: 0 } }
  )
  if (Array.from(teamCharacteristics.symbols.keys()).length === 5) {
    teamStrength.irregularsAttributes = [IrregularAttribute.OneOfEach]
  }
  const cardValues = Array.from(teamCharacteristics.numbers.keys())
  if (cardValues.length === 5 && cardValues.slice(0, 4).every((value, index) => value === cardValues[index + 1] - 1)) {
    if (teamStrength.irregularsAttributes !== undefined) {
      teamStrength.irregularsAttributes.push(IrregularAttribute.Straight)
    } else {
      teamStrength.irregularsAttributes = [IrregularAttribute.Straight]
    }
  }
  const fourOfAKind = getCombinationsOfLength(teamCharacteristics, 4)
  const threeOfAKind = getCombinationsOfLength(teamCharacteristics, 3)
  const pairs = getCombinationsOfLength(teamCharacteristics, 2)
  if (
    threeOfAKind.some((threeOfAKindArray) => pairs.some((pairArray) => union(threeOfAKindArray, pairArray).length === 5)) ||
    threeOfAKind.some((threeOfAKindArray) =>
      threeOfAKind.some(
        (secondThreeOfAKindArray) =>
          union(threeOfAKindArray, secondThreeOfAKindArray).length === 5 && intersection(threeOfAKindArray, secondThreeOfAKindArray).length === 1
      )
    ) ||
    fourOfAKind.some((fourOfAKindArray) =>
      pairs.some((pairsArray) => union(fourOfAKindArray, pairsArray).length === 5 && intersection(fourOfAKindArray, pairsArray).length === 1)
    )
  ) {
    if (teamStrength.irregularsAttributes !== undefined) {
      teamStrength.irregularsAttributes.push(IrregularAttribute.FullHouse)
    } else {
      teamStrength.irregularsAttributes = [IrregularAttribute.FullHouse]
    }
  }
  return teamStrength
}

export const getTeamStrength = (team: HockeyPlayerCard[], playersCount: number): TeamStrength => {
  const teamCharacteristics = {
    teams: new Map<HockeyPlayerCardSpeciesType, HockeyPlayerCard[]>(),
    symbols: new Map<HockeyPlayerCardSymbolsType, HockeyPlayerCard[]>(),
    numbers: new Map<number, HockeyPlayerCard[]>()
  }
  team.forEach((currentCardId) => {
    const cardSpecies = getHockeyPlayerCardSpecie(currentCardId)
    const cardSymbol = getHockeyPlayerCardSymbol(currentCardId)
    const cardValue = getHockeyPlayerCardValue(currentCardId)
    if (teamCharacteristics.teams.has(cardSpecies)) {
      teamCharacteristics.teams.get(cardSpecies)?.push(currentCardId)
    } else {
      teamCharacteristics.teams.set(cardSpecies, [currentCardId])
    }
    if (teamCharacteristics.numbers.has(cardValue)) {
      teamCharacteristics.numbers.get(cardValue)?.push(currentCardId)
    } else {
      teamCharacteristics.numbers.set(cardValue, [currentCardId])
    }
    if (cardSymbol !== HockeyPlayerCardSymbolsType.None) {
      if (teamCharacteristics.symbols.has(cardSymbol)) {
        teamCharacteristics.symbols.get(cardSymbol)?.push(currentCardId)
      } else {
        teamCharacteristics.symbols.set(cardSymbol, [currentCardId])
      }
    }
  })
  return (
    maxBy(
      getAttributeKindPriority(playersCount)
        .reverse() // Needed as maxBy will return last max instead of first
        .map((attribute) => getTeamStrengthFromCharacteristics(teamCharacteristics, attribute)),
      'strength'
    ) ?? { strength: 0, attribute: { kind: AttributeKind.Number, value: 0 } }
  )
}

export function compareTeam(t1: TeamStrength, t2: TeamStrength, playerCount: number, irregularAttribute?: IrregularAttribute): number {
  if (irregularAttribute !== undefined) {
    const t1HasAttributeValue = t1.irregularsAttributes?.includes(irregularAttribute) ? 1 : 0
    const t2HasAttributeValue = t2.irregularsAttributes?.includes(irregularAttribute) ? 1 : 0
    if (t1HasAttributeValue + t2HasAttributeValue > 0) return t1HasAttributeValue - t2HasAttributeValue
  }
  if (t1.strength - t2.strength !== 0) return t1.strength - t2.strength
  if (t1.attribute.kind !== t2.attribute.kind)
    return (
      getAttributeKindPriority(playerCount).findIndex((attribute) => attribute === t1.attribute.kind) -
      getAttributeKindPriority(playerCount).findIndex((attribute) => attribute === t2.attribute.kind)
    )
  return t1.attribute.value - t2.attribute.value
}

function getAttributeKindPriority(playerCount: number): AttributeKind[] {
  if (playerCount > 4) return [AttributeKind.Number, AttributeKind.Species, AttributeKind.Symbol]
  return [AttributeKind.Species, AttributeKind.Number, AttributeKind.Symbol]
}

export function compareCards(c1: HockeyPlayerCard, c2: HockeyPlayerCard, playerCount: number): number {
  const attributes = getAttributeKindPriority(playerCount).reverse() // Needed to test the best attribute first
  const mainCardStrength: Record<AttributeKind, number> = {
    [AttributeKind.Species]: getHockeyPlayerCardSpecie(c1),
    [AttributeKind.Number]: getHockeyPlayerCardValue(c1),
    [AttributeKind.Symbol]: getHockeyPlayerCardSymbol(c1)
  }
  const concurrentCardStrength: Record<AttributeKind, number> = {
    [AttributeKind.Species]: getHockeyPlayerCardSpecie(c2),
    [AttributeKind.Number]: getHockeyPlayerCardValue(c2),
    [AttributeKind.Symbol]: getHockeyPlayerCardSymbol(c2)
  }
  for (const attribute of attributes) {
    const diff = mainCardStrength[attribute] - concurrentCardStrength[attribute]
    if (diff !== 0) return diff
  }
  return 0
}
