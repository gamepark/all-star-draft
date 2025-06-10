import { HockeyPlayerCard, HockeyPlayerCardSpeciesType, HockeyPlayerCardSymbolsType } from '../src/material/HockeyPlayerCard'
import { AttributeKind, getTeamStrength, IrregularAttribute } from '../src/material/TeamStrength'

const actualTest = ({
                      playerCount,
                      cards,
                      expectedTeamStrength,
                      expectedAttributeKind,
                      expectedAttributeValue
                    }: {
  playerCount: number,
  cards: HockeyPlayerCard[],
  expectedTeamStrength: number,
  expectedAttributeKind: AttributeKind,
  expectedAttributeValue: number | HockeyPlayerCardSpeciesType | HockeyPlayerCardSymbolsType
}) => {
  // When
  const teamStrength = getTeamStrength(cards, playerCount)

  // Then
  expect(teamStrength.strength).toBe(expectedTeamStrength)
  expect(teamStrength.attribute.kind).toBe(expectedAttributeKind)
  expect(teamStrength.attribute.value).toBe(expectedAttributeValue)
}

describe('TeamStrength tests', () => {
  describe('Tests for teams strength value of 5', () => {
    test.each([
      {
        playerCount: 2,
        cards: [
          HockeyPlayerCard.Beaver1,
          HockeyPlayerCard.Beaver3,
          HockeyPlayerCard.Beaver5,
          HockeyPlayerCard.Beaver6,
          HockeyPlayerCard.Beaver7
        ],
        expectedTeamStrength: 5,
        expectedAttributeKind: AttributeKind.Species,
        expectedAttributeValue: HockeyPlayerCardSpeciesType.Beaver
      },
      {
        playerCount: 2,
        cards: [
          HockeyPlayerCard.Beaver3,
          HockeyPlayerCard.PolarBear3,
          HockeyPlayerCard.Duck3,
          HockeyPlayerCard.Wolf3,
          HockeyPlayerCard.Eagle3
        ],
        expectedTeamStrength: 5,
        expectedAttributeKind: AttributeKind.Number,
        expectedAttributeValue: 3
      },
      {
        playerCount: 2,
        cards: [
          HockeyPlayerCard.Beaver1,
          HockeyPlayerCard.Duck9,
          HockeyPlayerCard.Eagle2,
          HockeyPlayerCard.Horse8,
          HockeyPlayerCard.Panda2
        ],
        expectedTeamStrength: 5,
        expectedAttributeKind: AttributeKind.Symbol,
        expectedAttributeValue: HockeyPlayerCardSymbolsType.Glove
      }
    ])('getTeamStrength should return a team strength wth a strength of 5 and relevant attribute kind and value', actualTest)
  })

  describe('Tests for teams strength value of 4', () => {
    test.each([
      {
        playerCount: 2,
        cards: [
          HockeyPlayerCard.Reindeer2,
          HockeyPlayerCard.Reindeer3,
          HockeyPlayerCard.Reindeer5,
          HockeyPlayerCard.Reindeer6,
          HockeyPlayerCard.Penguin6
        ],
        expectedTeamStrength: 4,
        expectedAttributeKind: AttributeKind.Species,
        expectedAttributeValue: HockeyPlayerCardSpeciesType.Reindeer
      },
      {
        playerCount: 2,
        cards: [
          HockeyPlayerCard.Horse5,
          HockeyPlayerCard.PolarBear5,
          HockeyPlayerCard.Rabbit5,
          HockeyPlayerCard.Eagle5,
          HockeyPlayerCard.PolarBear2
        ],
        expectedTeamStrength: 4,
        expectedAttributeKind: AttributeKind.Number,
        expectedAttributeValue: 5
      },
      {
        playerCount: 2,
        cards: [
          HockeyPlayerCard.Panda3,
          HockeyPlayerCard.Penguin6,
          HockeyPlayerCard.Rabbit9,
          HockeyPlayerCard.Shark8,
          HockeyPlayerCard.Tiger5
        ],
        expectedTeamStrength: 4,
        expectedAttributeKind: AttributeKind.Symbol,
        expectedAttributeValue: HockeyPlayerCardSymbolsType.Skate
      },
    ])('getTeamStrength should return a team strength wth a strength of 4 and relevant attribute kind and value', actualTest)
  })

  describe('Tests for teams strength value of 3 not depending on the player count', () => {
    test.each([
      {
        playerCount: 2,
        cards: [
          HockeyPlayerCard.Wolf9,
          HockeyPlayerCard.Rabbit5,
          HockeyPlayerCard.Panda8,
          HockeyPlayerCard.Shark8,
          HockeyPlayerCard.Tiger8
        ],
        expectedTeamStrength: 3,
        expectedAttributeKind: AttributeKind.Symbol,
        expectedAttributeValue: HockeyPlayerCardSymbolsType.Goal
      },
      {
        playerCount: 5,
        cards: [
          HockeyPlayerCard.Wolf9,
          HockeyPlayerCard.Rabbit5,
          HockeyPlayerCard.Panda8,
          HockeyPlayerCard.Shark8,
          HockeyPlayerCard.Tiger8
        ],
        expectedTeamStrength: 3,
        expectedAttributeKind: AttributeKind.Symbol,
        expectedAttributeValue: HockeyPlayerCardSymbolsType.Goal
      },
      {
        playerCount: 2,
        cards: [
          HockeyPlayerCard.Horse8,
          HockeyPlayerCard.Horse5,
          HockeyPlayerCard.Horse2,
          HockeyPlayerCard.Beaver1,
          HockeyPlayerCard.Beaver6
        ],
        expectedTeamStrength: 3,
        expectedAttributeKind: AttributeKind.Species,
        expectedAttributeValue: HockeyPlayerCardSpeciesType.Horse
      },
      {
        playerCount: 5,
        cards: [
          HockeyPlayerCard.Horse8,
          HockeyPlayerCard.Horse5,
          HockeyPlayerCard.Horse2,
          HockeyPlayerCard.Beaver1,
          HockeyPlayerCard.Beaver6
        ],
        expectedTeamStrength: 3,
        expectedAttributeKind: AttributeKind.Species,
        expectedAttributeValue: HockeyPlayerCardSpeciesType.Horse
      },
      {
        playerCount: 2,
        cards: [
          HockeyPlayerCard.Beaver7,
          HockeyPlayerCard.Horse7,
          HockeyPlayerCard.Eagle7,
          HockeyPlayerCard.Horse8,
          HockeyPlayerCard.Duck2,
        ],
        expectedTeamStrength: 3,
        expectedAttributeKind: AttributeKind.Number,
        expectedAttributeValue: 7
      },
      {
        playerCount: 5,
        cards: [
          HockeyPlayerCard.Beaver7,
          HockeyPlayerCard.Horse7,
          HockeyPlayerCard.Eagle7,
          HockeyPlayerCard.Horse8,
          HockeyPlayerCard.Duck2,
        ],
        expectedTeamStrength: 3,
        expectedAttributeKind: AttributeKind.Number,
        expectedAttributeValue: 7
      }
    ])('getTeamStrength should return a team strength wth a strength of 3 and relevant attribute kind and value', actualTest)
  })

  describe('Tests for teams strength value of 3 depending on the player count', () => {
    test.each([
      {
        playerCount: 2,
        cards: [
          HockeyPlayerCard.Reindeer2,
          HockeyPlayerCard.Reindeer3,
          HockeyPlayerCard.Reindeer5,
          HockeyPlayerCard.Beaver5,
          HockeyPlayerCard.Eagle5
        ],
        expectedTeamStrength: 3,
        expectedAttributeKind: AttributeKind.Number,
        expectedAttributeValue: 5
      },
      {
        playerCount: 5,
        cards: [
          HockeyPlayerCard.Reindeer2,
          HockeyPlayerCard.Reindeer3,
          HockeyPlayerCard.Reindeer5,
          HockeyPlayerCard.Beaver5,
          HockeyPlayerCard.Eagle5
        ],
        expectedTeamStrength: 3,
        expectedAttributeKind: AttributeKind.Species,
        expectedAttributeValue: HockeyPlayerCardSpeciesType.Reindeer
      },
      {
        playerCount: 2,
        cards: [
          HockeyPlayerCard.Beaver7,
          HockeyPlayerCard.Horse7,
          HockeyPlayerCard.Eagle7,
          HockeyPlayerCard.Horse8,
          HockeyPlayerCard.Horse2,
        ],
        expectedTeamStrength: 3,
        expectedAttributeKind: AttributeKind.Number,
        expectedAttributeValue: 7
      },
      {
        playerCount: 5,
        cards: [
          HockeyPlayerCard.Beaver7,
          HockeyPlayerCard.Horse7,
          HockeyPlayerCard.Eagle7,
          HockeyPlayerCard.Horse8,
          HockeyPlayerCard.Horse2,
        ],
        expectedTeamStrength: 3,
        expectedAttributeKind: AttributeKind.Species,
        expectedAttributeValue: HockeyPlayerCardSpeciesType.Horse
      }
    ])('getTeamStrength should return a team strength wth a strength of 3 and relevant attribute kind and value', actualTest)
  })

  describe('Tests for teams strength value of 2 not depending on the player count', () => {
    test.each([
      {
        playerCount: 2,
        cards: [
          HockeyPlayerCard.Beaver9,
          HockeyPlayerCard.Eagle1,
          HockeyPlayerCard.Reindeer7,
          HockeyPlayerCard.Eagle5,
          HockeyPlayerCard.Duck2
        ],
        expectedTeamStrength: 2,
        expectedAttributeKind: AttributeKind.Symbol,
        expectedAttributeValue: HockeyPlayerCardSymbolsType.Helmet
      },
      {
        playerCount: 5,
        cards: [
          HockeyPlayerCard.Beaver9,
          HockeyPlayerCard.Eagle1,
          HockeyPlayerCard.Reindeer7,
          HockeyPlayerCard.Eagle5,
          HockeyPlayerCard.Duck2
        ],
        expectedTeamStrength: 2,
        expectedAttributeKind: AttributeKind.Symbol,
        expectedAttributeValue: HockeyPlayerCardSymbolsType.Helmet
      },
      {
        playerCount: 2,
        cards: [
          HockeyPlayerCard.Panda1,
          HockeyPlayerCard.Panda8,
          HockeyPlayerCard.Eagle2,
          HockeyPlayerCard.Horse5,
          HockeyPlayerCard.Shark9
        ],
        expectedTeamStrength: 2,
        expectedAttributeKind: AttributeKind.Species,
        expectedAttributeValue: HockeyPlayerCardSpeciesType.Panda
      },
      {
        playerCount: 5,
        cards: [
          HockeyPlayerCard.Panda1,
          HockeyPlayerCard.Panda8,
          HockeyPlayerCard.Eagle2,
          HockeyPlayerCard.Horse5,
          HockeyPlayerCard.Shark9
        ],
        expectedTeamStrength: 2,
        expectedAttributeKind: AttributeKind.Species,
        expectedAttributeValue: HockeyPlayerCardSpeciesType.Panda
      },
      {
        playerCount: 2,
        cards: [
          HockeyPlayerCard.Beaver5,
          HockeyPlayerCard.Penguin5,
          HockeyPlayerCard.Eagle4,
          HockeyPlayerCard.Horse1,
          HockeyPlayerCard.Shark9
        ],
        expectedTeamStrength: 2,
        expectedAttributeKind: AttributeKind.Number,
        expectedAttributeValue: 5,
      },
      {
        playerCount: 5,
        cards: [
          HockeyPlayerCard.Beaver5,
          HockeyPlayerCard.Penguin5,
          HockeyPlayerCard.Eagle4,
          HockeyPlayerCard.Horse1,
          HockeyPlayerCard.Shark9
        ],
        expectedTeamStrength: 2,
        expectedAttributeKind: AttributeKind.Number,
        expectedAttributeValue: 5,
      }
    ])('getTeamStrength should return a team strength wth a strength of 2 and relevant attribute kind and value', actualTest)
  })

  describe('Irregular combinations tests', () => {
    test.each([
      {
        playerCount: 2,
        cards: [
          HockeyPlayerCard.Beaver1,
          HockeyPlayerCard.Beaver2,
          HockeyPlayerCard.Beaver7,
          HockeyPlayerCard.Beaver8,
          HockeyPlayerCard.Beaver9
        ],
        expectedIrregularCombination: IrregularAttribute.OneOfEach
      },
      {
        playerCount: 2,
        cards: [
          HockeyPlayerCard.Beaver1,
          HockeyPlayerCard.Eagle7,
          HockeyPlayerCard.Reindeer2,
          HockeyPlayerCard.Panda9,
          HockeyPlayerCard.Penguin4,
        ],
        expectedIrregularCombination: IrregularAttribute.OneOfEach
      }
    ])('getTeamStrength should return an irregular combination of OneOfAKind', ({playerCount, cards, expectedIrregularCombination}) => {
      // When
      const teamStrength = getTeamStrength(cards, playerCount)

      // Then
      expect(teamStrength.irregularsAttributes).not.toBeUndefined()
      expect(teamStrength.irregularsAttributes).toHaveLength(1)
      expect(teamStrength.irregularsAttributes).toContain(expectedIrregularCombination)
    })

    test.each([
      {
        playerCount: 2,
        cards: [
          HockeyPlayerCard.PolarBear2,
          HockeyPlayerCard.PolarBear5,
          HockeyPlayerCard.PolarBear9,
          HockeyPlayerCard.Rabbit4,
          HockeyPlayerCard.PolarBear4
        ], // 3 polar bears and 2 fours
        expectedIrregularCombination: IrregularAttribute.FullHouse
      },
      {
        playerCount: 2,
        cards: [
          HockeyPlayerCard.PolarBear2,
          HockeyPlayerCard.PolarBear5,
          HockeyPlayerCard.PolarBear9,
          HockeyPlayerCard.Beaver2,
          HockeyPlayerCard.Beaver4
        ], // 3 polar bears and 2 beavers
        expectedIrregularCombination: IrregularAttribute.FullHouse
      },
      {
        playerCount: 2,
        cards: [
          HockeyPlayerCard.Duck3,
          HockeyPlayerCard.Duck4,
          HockeyPlayerCard.Duck5,
          HockeyPlayerCard.Duck6,
          HockeyPlayerCard.Reindeer2,
        ], // 3 ducks and 2 goals
        expectedIrregularCombination: IrregularAttribute.FullHouse
      }
    ])('getTeamStrength should return an irregular combination of FullHouse', ({playerCount, cards, expectedIrregularCombination}) => {
      // When
      const teamStrength = getTeamStrength(cards, playerCount)

      // Then
      expect(teamStrength.irregularsAttributes).not.toBeUndefined()
      expect(teamStrength.irregularsAttributes).toHaveLength(1)
      expect(teamStrength.irregularsAttributes).toContain(expectedIrregularCombination)
    })

    test.each([
      {
        playerCount: 2,
        cards: [
          HockeyPlayerCard.Shark2,
          HockeyPlayerCard.Shark3,
          HockeyPlayerCard.Shark4,
          HockeyPlayerCard.Shark5,
          HockeyPlayerCard.Shark6,
        ],
        expectedIrregularCombination: IrregularAttribute.Straight
      },
      {
        playerCount: 2,
        cards: [
          HockeyPlayerCard.Beaver3,
          HockeyPlayerCard.Reindeer4,
          HockeyPlayerCard.Eagle5,
          HockeyPlayerCard.Horse6,
          HockeyPlayerCard.Shark7
        ],
        expectedIrregularCombination: IrregularAttribute.Straight
      },
      {
        playerCount: 2,
        cards: [
          HockeyPlayerCard.Horse5,
          HockeyPlayerCard.Horse6,
          HockeyPlayerCard.Shark7,
          HockeyPlayerCard.Penguin8,
          HockeyPlayerCard.Penguin9
        ],
        expectedIrregularCombination: IrregularAttribute.Straight
      }
    ])('getTeamStrength should return an irregular combination of FullHouse', ({playerCount, cards, expectedIrregularCombination}) => {
      // When
      const teamStrength = getTeamStrength(cards, playerCount)

      // Then
      expect(teamStrength.irregularsAttributes).not.toBeUndefined()
      expect(teamStrength.irregularsAttributes).toHaveLength(1)
      expect(teamStrength.irregularsAttributes).toContain(expectedIrregularCombination)
    })
  })
})