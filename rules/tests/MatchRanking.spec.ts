import { HockeyPlayerCard } from '../src/material/HockeyPlayerCard'
import { getPlayerRanking, getWeakestPlayerFromCards, getWeakestPlayersFromTeams } from '../src/material/MatchRanking'
import { IrregularAttribute } from '../src/material/TeamStrength'
import { PlayerColor } from '../src/PlayerColor'

const actualRankingTest = ({
  teams,
  irregularAttribute,
  expectedRanking
}: {
  teams: {
    player: PlayerColor
    team: HockeyPlayerCard[]
  }[]
  irregularAttribute?: IrregularAttribute
  expectedRanking: Partial<Record<PlayerColor, number>>
}) => {
  // When
  const ranking = getPlayerRanking(teams, irregularAttribute)

  // Then
  expect(ranking).toMatchObject(expectedRanking)
}

const actualFindWeaskestPlayersFromTeamTest = ({
  teams,
  expectedPlayers
}: {
  teams: { player: PlayerColor; team: HockeyPlayerCard[] }[]
  expectedPlayers: PlayerColor[]
}) => {
  // When
  const weakestPlayer = getWeakestPlayersFromTeams(teams, teams.length)

  // Then
  expect(weakestPlayer.sort()).toMatchObject(expectedPlayers.sort())
}

const actualFindWeaskestPlayersFromCardTest = ({
  cards,
  totalPlayers,
  expectedPlayer
}: {
  cards: { player: PlayerColor; card: HockeyPlayerCard }[]
  totalPlayers: number
  expectedPlayer: PlayerColor
}) => {
  // When
  const weakestPlayer = getWeakestPlayerFromCards(cards, totalPlayers)

  // Then
  expect(weakestPlayer).toEqual(expectedPlayer)
}

describe('MatchRanking tests during draft phase', () => {
  describe('Test for 5 players with different strength', () => {
    test.each([
      {
        teams: [
          {
            player: PlayerColor.Black, // Strength : 5, value : Rabbit
            team: [HockeyPlayerCard.Rabbit1, HockeyPlayerCard.Rabbit2, HockeyPlayerCard.Rabbit3, HockeyPlayerCard.Rabbit4, HockeyPlayerCard.Rabbit5]
          },
          {
            player: PlayerColor.Blue, // Strength : 2, value 2
            team: [HockeyPlayerCard.Duck2, HockeyPlayerCard.Beaver2, HockeyPlayerCard.Eagle4, HockeyPlayerCard.Penguin3, HockeyPlayerCard.Panda6]
          },
          {
            player: PlayerColor.Green, // Strength : 1, value : Goal
            team: [HockeyPlayerCard.Duck3, HockeyPlayerCard.Beaver4, HockeyPlayerCard.Eagle6, HockeyPlayerCard.Penguin1, HockeyPlayerCard.Panda2]
          },
          {
            player: PlayerColor.Purple, // Strength : 3,  value : Helmet
            team: [HockeyPlayerCard.Panda1, HockeyPlayerCard.Wolf2, HockeyPlayerCard.Shark6, HockeyPlayerCard.Wolf1, HockeyPlayerCard.Panda3]
          },
          {
            player: PlayerColor.Red, // Strength : 4, value : Horse
            team: [HockeyPlayerCard.Horse1, HockeyPlayerCard.Horse2, HockeyPlayerCard.Horse3, HockeyPlayerCard.Horse4, HockeyPlayerCard.Penguin8]
          }
        ] as { player: PlayerColor; team: HockeyPlayerCard[] }[],
        expectedRanking: {
          [PlayerColor.Black]: 1,
          [PlayerColor.Blue]: 4,
          [PlayerColor.Green]: 5,
          [PlayerColor.Purple]: 3,
          [PlayerColor.Red]: 2
        }
      }
    ])('getRanking should return the correct match between player and rank', actualRankingTest)
  })

  describe('Test for 6 players with ties', () => {
    test.each([
      {
        teams: [
          {
            player: PlayerColor.Black, // Strength : 5, value : Rabbit
            team: [HockeyPlayerCard.Rabbit1, HockeyPlayerCard.Rabbit2, HockeyPlayerCard.Rabbit3, HockeyPlayerCard.Rabbit4, HockeyPlayerCard.Rabbit5]
          },
          {
            player: PlayerColor.Blue, // Strength : 2, value 2
            team: [HockeyPlayerCard.Duck2, HockeyPlayerCard.Beaver2, HockeyPlayerCard.Eagle4, HockeyPlayerCard.Penguin3, HockeyPlayerCard.Panda6]
          },
          {
            player: PlayerColor.Green, // Strength : 1, value : Goal
            team: [HockeyPlayerCard.Duck3, HockeyPlayerCard.Beaver4, HockeyPlayerCard.Eagle6, HockeyPlayerCard.Penguin1, HockeyPlayerCard.Panda2]
          },
          {
            player: PlayerColor.Purple, // Strength : 3,  value : Helmet
            team: [HockeyPlayerCard.PolarBear9, HockeyPlayerCard.Wolf2, HockeyPlayerCard.Tiger2, HockeyPlayerCard.Reindeer8, HockeyPlayerCard.Panda3]
          },
          {
            player: PlayerColor.Red, // Strength : 4, value : Horse
            team: [HockeyPlayerCard.Horse1, HockeyPlayerCard.Horse2, HockeyPlayerCard.Horse3, HockeyPlayerCard.Horse4, HockeyPlayerCard.Penguin8]
          },
          {
            player: PlayerColor.Yellow, // Strength : 4, value : Horse
            team: [HockeyPlayerCard.Horse5, HockeyPlayerCard.Horse6, HockeyPlayerCard.Horse7, HockeyPlayerCard.Horse8, HockeyPlayerCard.Penguin9]
          }
        ] as { player: PlayerColor; team: HockeyPlayerCard[] }[],
        expectedRanking: {
          [PlayerColor.Black]: 1,
          [PlayerColor.Blue]: 4,
          [PlayerColor.Green]: 6,
          [PlayerColor.Purple]: 4,
          [PlayerColor.Red]: 2,
          [PlayerColor.Yellow]: 2
        }
      }
    ])('getRanking should return the correct match between player and rank', actualRankingTest)
  })

  describe('Test priority for 3 player', () => {
    test.each([
      {
        teams: [
          {
            player: PlayerColor.Black, // Strength : 3, attribute : Symbol
            team: [HockeyPlayerCard.Rabbit5, HockeyPlayerCard.Duck6, HockeyPlayerCard.Beaver7, HockeyPlayerCard.Rabbit1, HockeyPlayerCard.Duck2]
          },
          {
            player: PlayerColor.Blue, // Strength : 3, attribute : Specie
            team: [HockeyPlayerCard.Eagle1, HockeyPlayerCard.Eagle2, HockeyPlayerCard.Eagle3, HockeyPlayerCard.Penguin1, HockeyPlayerCard.Penguin2]
          },
          {
            player: PlayerColor.Green, // Strength : 3, attribute : Number
            team: [HockeyPlayerCard.Panda1, HockeyPlayerCard.Wolf1, HockeyPlayerCard.Shark1, HockeyPlayerCard.Panda2, HockeyPlayerCard.Wolf2]
          }
        ] as { player: PlayerColor; team: HockeyPlayerCard[] }[],
        expectedRanking: {
          [PlayerColor.Black]: 1,
          [PlayerColor.Blue]: 3,
          [PlayerColor.Green]: 2
        }
      }
    ])('getRanking should return the correct match between player and rank', actualRankingTest)
  })

  describe('Test priority for 5 player', () => {
    test.each([
      {
        teams: [
          {
            player: PlayerColor.Black, // Strength : 3, attribute : Symbol
            team: [HockeyPlayerCard.Rabbit5, HockeyPlayerCard.Duck6, HockeyPlayerCard.Beaver7, HockeyPlayerCard.Rabbit1, HockeyPlayerCard.Duck2]
          },
          {
            player: PlayerColor.Blue, // Strength : 3, attribute : Specie
            team: [HockeyPlayerCard.Eagle1, HockeyPlayerCard.Eagle2, HockeyPlayerCard.Eagle3, HockeyPlayerCard.Penguin1, HockeyPlayerCard.Penguin2]
          },
          {
            player: PlayerColor.Green, // Strength : 3, attribute : Number
            team: [HockeyPlayerCard.Panda1, HockeyPlayerCard.Wolf1, HockeyPlayerCard.Shark1, HockeyPlayerCard.Panda2, HockeyPlayerCard.Wolf2]
          },
          {
            player: PlayerColor.Purple, // Strength : 4, attribute : Horse
            team: [HockeyPlayerCard.Horse1, HockeyPlayerCard.Horse2, HockeyPlayerCard.Horse3, HockeyPlayerCard.Horse4, HockeyPlayerCard.Wolf3]
          },
          {
            player: PlayerColor.Red, // Strength : 4, attribute : Horse
            team: [HockeyPlayerCard.Horse5, HockeyPlayerCard.Horse6, HockeyPlayerCard.Horse7, HockeyPlayerCard.Horse8, HockeyPlayerCard.Wolf4]
          }
        ] as { player: PlayerColor; team: HockeyPlayerCard[] }[],
        expectedRanking: {
          [PlayerColor.Black]: 3,
          [PlayerColor.Blue]: 4,
          [PlayerColor.Green]: 5,
          [PlayerColor.Purple]: 1,
          [PlayerColor.Red]: 1
        }
      }
    ])('getRanking should return the correct match between player and rank', actualRankingTest)
  })

  describe('Test priority for same attribute and different value', () => {
    test.each([
      {
        teams: [
          {
            player: PlayerColor.Black, // Strength : 5, attribute : Symbol, value : Skate
            team: [HockeyPlayerCard.Rabbit9, HockeyPlayerCard.Duck1, HockeyPlayerCard.Beaver2, HockeyPlayerCard.Eagle7, HockeyPlayerCard.Panda6]
          },
          {
            player: PlayerColor.Blue, // Strength : 5, attribute : Specie, value : Puck
            team: [HockeyPlayerCard.Rabbit6, HockeyPlayerCard.Duck7, HockeyPlayerCard.Beaver8, HockeyPlayerCard.Eagle5, HockeyPlayerCard.Penguin2]
          },
          {
            player: PlayerColor.Green, // Strength : 5, attribute : Specie, value : Goal
            team: [HockeyPlayerCard.Rabbit5, HockeyPlayerCard.Duck6, HockeyPlayerCard.Beaver7, HockeyPlayerCard.Eagle3, HockeyPlayerCard.Penguin1]
          },
          {
            player: PlayerColor.Purple, // Strength : 5, attribute : Specie, value : Glove
            team: [HockeyPlayerCard.Rabbit8, HockeyPlayerCard.Duck9, HockeyPlayerCard.Beaver1, HockeyPlayerCard.Eagle2, HockeyPlayerCard.Penguin5]
          },
          {
            player: PlayerColor.Red, // Strength : 5, attribute : Specie, value : Helmet
            team: [HockeyPlayerCard.Rabbit7, HockeyPlayerCard.Duck8, HockeyPlayerCard.Beaver9, HockeyPlayerCard.Eagle1, HockeyPlayerCard.Penguin4]
          }
        ] as { player: PlayerColor; team: HockeyPlayerCard[] }[],
        expectedRanking: {
          [PlayerColor.Black]: 5,
          [PlayerColor.Blue]: 2,
          [PlayerColor.Green]: 1,
          [PlayerColor.Purple]: 4,
          [PlayerColor.Red]: 3
        }
      },
      {
        teams: [
          {
            player: PlayerColor.Black, // Strength : 5, attribute : Specie, value : Rabbit
            team: [HockeyPlayerCard.Rabbit1, HockeyPlayerCard.Rabbit2, HockeyPlayerCard.Rabbit3, HockeyPlayerCard.Rabbit4, HockeyPlayerCard.Rabbit5]
          },
          {
            player: PlayerColor.Blue, // Strength : 5, attribute : Specie, value : Wolf
            team: [HockeyPlayerCard.Wolf1, HockeyPlayerCard.Wolf2, HockeyPlayerCard.Wolf3, HockeyPlayerCard.Wolf4, HockeyPlayerCard.Wolf5]
          },
          {
            player: PlayerColor.Green, // Strength : 5, attribute : Specie, value : Beaver
            team: [HockeyPlayerCard.Beaver1, HockeyPlayerCard.Beaver2, HockeyPlayerCard.Beaver3, HockeyPlayerCard.Beaver4, HockeyPlayerCard.Beaver5]
          },
          {
            player: PlayerColor.Purple, // Strength : 5, attribute : Specie, value : PolarBear
            team: [
              HockeyPlayerCard.PolarBear1,
              HockeyPlayerCard.PolarBear2,
              HockeyPlayerCard.PolarBear3,
              HockeyPlayerCard.PolarBear4,
              HockeyPlayerCard.PolarBear5
            ]
          },
          {
            player: PlayerColor.Red, // Strength : 5, attribute : Specie, value : Eagle
            team: [HockeyPlayerCard.Eagle1, HockeyPlayerCard.Eagle2, HockeyPlayerCard.Eagle3, HockeyPlayerCard.Eagle4, HockeyPlayerCard.Eagle5]
          }
        ] as { player: PlayerColor; team: HockeyPlayerCard[] }[],
        expectedRanking: {
          [PlayerColor.Black]: 5,
          [PlayerColor.Blue]: 2,
          [PlayerColor.Green]: 4,
          [PlayerColor.Purple]: 1,
          [PlayerColor.Red]: 3
        }
      },
      {
        teams: [
          {
            player: PlayerColor.Black, // Strength : 5, attribute : Number, value : 9
            team: [HockeyPlayerCard.Rabbit9, HockeyPlayerCard.Duck9, HockeyPlayerCard.Beaver9, HockeyPlayerCard.Eagle9, HockeyPlayerCard.Panda9]
          },
          {
            player: PlayerColor.Blue, // Strength : 5, attribute : Number, value : 1
            team: [HockeyPlayerCard.Rabbit1, HockeyPlayerCard.Duck1, HockeyPlayerCard.Beaver1, HockeyPlayerCard.Eagle1, HockeyPlayerCard.Panda1]
          },
          {
            player: PlayerColor.Green, // Strength : 5, attribute : Number, value : 7
            team: [HockeyPlayerCard.Rabbit7, HockeyPlayerCard.Duck7, HockeyPlayerCard.Beaver7, HockeyPlayerCard.Eagle7, HockeyPlayerCard.Panda7]
          },
          {
            player: PlayerColor.Purple, // Strength : 5, attribute : Number, value : 6
            team: [HockeyPlayerCard.Rabbit6, HockeyPlayerCard.Duck6, HockeyPlayerCard.Beaver6, HockeyPlayerCard.Eagle6, HockeyPlayerCard.Panda6]
          },
          {
            player: PlayerColor.Red, // Strength : 5, attribute : Number, value : 4
            team: [HockeyPlayerCard.Rabbit4, HockeyPlayerCard.Duck4, HockeyPlayerCard.Beaver4, HockeyPlayerCard.Eagle4, HockeyPlayerCard.Panda4]
          }
        ] as { player: PlayerColor; team: HockeyPlayerCard[] }[],
        expectedRanking: {
          [PlayerColor.Black]: 1,
          [PlayerColor.Blue]: 5,
          [PlayerColor.Green]: 2,
          [PlayerColor.Purple]: 3,
          [PlayerColor.Red]: 4
        }
      }
    ])('getRanking should return the correct match between player and rank', actualRankingTest)
  })

  describe('Test irregular attributes take priority when needed', () => {
    test.each([
      {
        irregularAttribute: IrregularAttribute.FullHouse,
        teams: [
          {
            player: PlayerColor.Black, // Strength : FullHouse or 3, value : 3 Helmet & 3 Rabbit
            team: [HockeyPlayerCard.Rabbit7, HockeyPlayerCard.Duck8, HockeyPlayerCard.Beaver9, HockeyPlayerCard.Rabbit1, HockeyPlayerCard.Rabbit2]
          },
          {
            player: PlayerColor.Blue, // Strength : 5, attribute : Duck
            team: [HockeyPlayerCard.Duck1, HockeyPlayerCard.Duck2, HockeyPlayerCard.Duck3, HockeyPlayerCard.Duck4, HockeyPlayerCard.Duck5]
          }
        ] as { player: PlayerColor; team: HockeyPlayerCard[] }[],
        expectedRanking: {
          [PlayerColor.Black]: 1,
          [PlayerColor.Blue]: 2
        }
      },
      {
        // irregularAttribute : IrregularAttribute.FullHouse,
        teams: [
          {
            player: PlayerColor.Black, // Strength : FullHouse or 3, value : 3 Helmet & 3 Rabbit
            team: [HockeyPlayerCard.Rabbit7, HockeyPlayerCard.Duck8, HockeyPlayerCard.Beaver9, HockeyPlayerCard.Rabbit1, HockeyPlayerCard.Rabbit2]
          },
          {
            player: PlayerColor.Blue, // Strength : 5, attribute : Duck
            team: [HockeyPlayerCard.Duck1, HockeyPlayerCard.Duck2, HockeyPlayerCard.Duck3, HockeyPlayerCard.Duck4, HockeyPlayerCard.Duck5]
          }
        ] as { player: PlayerColor; team: HockeyPlayerCard[] }[],
        expectedRanking: {
          [PlayerColor.Black]: 2,
          [PlayerColor.Blue]: 1
        }
      },
      {
        irregularAttribute: IrregularAttribute.OneOfEach,
        teams: [
          {
            player: PlayerColor.Black, // Strength : OneOfEach or 3, value : 9
            team: [HockeyPlayerCard.Rabbit9, HockeyPlayerCard.Duck9, HockeyPlayerCard.Beaver9, HockeyPlayerCard.Eagle5, HockeyPlayerCard.Penguin1]
          },
          {
            player: PlayerColor.Blue, // Strength : 5, attribute : Duck
            team: [HockeyPlayerCard.Duck1, HockeyPlayerCard.Duck2, HockeyPlayerCard.Duck3, HockeyPlayerCard.Duck4, HockeyPlayerCard.Duck5]
          }
        ] as { player: PlayerColor; team: HockeyPlayerCard[] }[],
        expectedRanking: {
          [PlayerColor.Black]: 1,
          [PlayerColor.Blue]: 2
        }
      },
      {
        // irregularAttribute : IrregularAttribute.OneOfEach,
        teams: [
          {
            player: PlayerColor.Black, // Strength : OneOfEach or 3, value : 9
            team: [HockeyPlayerCard.Rabbit9, HockeyPlayerCard.Duck9, HockeyPlayerCard.Beaver9, HockeyPlayerCard.Eagle5, HockeyPlayerCard.Penguin1]
          },
          {
            player: PlayerColor.Blue, // Strength : 5, attribute : Duck
            team: [HockeyPlayerCard.Duck1, HockeyPlayerCard.Duck2, HockeyPlayerCard.Duck3, HockeyPlayerCard.Duck4, HockeyPlayerCard.Duck5]
          }
        ] as { player: PlayerColor; team: HockeyPlayerCard[] }[],
        expectedRanking: {
          [PlayerColor.Black]: 2,
          [PlayerColor.Blue]: 1
        }
      },
      {
        irregularAttribute: IrregularAttribute.Straight,
        teams: [
          {
            player: PlayerColor.Black, // Strength : Straight or 3, value : Rabbit
            team: [HockeyPlayerCard.Rabbit1, HockeyPlayerCard.Rabbit2, HockeyPlayerCard.Duck3, HockeyPlayerCard.Beaver4, HockeyPlayerCard.Rabbit5]
          },
          {
            player: PlayerColor.Blue, // Strength : 5, attribute : Duck
            team: [HockeyPlayerCard.Duck1, HockeyPlayerCard.Duck2, HockeyPlayerCard.Duck4, HockeyPlayerCard.Duck5, HockeyPlayerCard.Duck6]
          }
        ] as { player: PlayerColor; team: HockeyPlayerCard[] }[],
        expectedRanking: {
          [PlayerColor.Black]: 1,
          [PlayerColor.Blue]: 2
        }
      },
      {
        // irregularAttribute : IrregularAttribute.Straight,
        teams: [
          {
            player: PlayerColor.Black, // Strength : Straight or 3, value : Rabbit
            team: [HockeyPlayerCard.Rabbit1, HockeyPlayerCard.Rabbit2, HockeyPlayerCard.Duck3, HockeyPlayerCard.Beaver4, HockeyPlayerCard.Rabbit5]
          },
          {
            player: PlayerColor.Blue, // Strength : 5, attribute : Duck
            team: [HockeyPlayerCard.Duck1, HockeyPlayerCard.Duck2, HockeyPlayerCard.Duck3, HockeyPlayerCard.Duck4, HockeyPlayerCard.Duck5]
          }
        ] as { player: PlayerColor; team: HockeyPlayerCard[] }[],
        expectedRanking: {
          [PlayerColor.Black]: 2,
          [PlayerColor.Blue]: 1
        }
      }
    ])('getRanking should return the correct match between player and rank', actualRankingTest)
  })
})

describe('MatchRanking tests during playoff phase', () => {
  describe('Test teams for 4 players priority', () => {
    test.each([
      {
        teams: [
          {
            player: PlayerColor.Black,
            team: [HockeyPlayerCard.Rabbit4, HockeyPlayerCard.Rabbit5, HockeyPlayerCard.Rabbit6, HockeyPlayerCard.Duck4, HockeyPlayerCard.Beaver4]
          },
          {
            player: PlayerColor.Blue,
            team: [HockeyPlayerCard.Beaver1, HockeyPlayerCard.Beaver2, HockeyPlayerCard.Beaver3, HockeyPlayerCard.Rabbit1, HockeyPlayerCard.Duck1]
          },
          {
            player: PlayerColor.Green,
            team: [HockeyPlayerCard.Eagle1, HockeyPlayerCard.Eagle2, HockeyPlayerCard.Eagle3, HockeyPlayerCard.Eagle4, HockeyPlayerCard.Eagle5]
          },
          {
            player: PlayerColor.Purple,
            team: [HockeyPlayerCard.Horse1, HockeyPlayerCard.Horse2, HockeyPlayerCard.Horse3, HockeyPlayerCard.Horse4, HockeyPlayerCard.Horse5]
          }
        ],
        expectedPlayers: [PlayerColor.Blue]
      }
    ])('getWeakestPlayersFromTeams should return the correct players array', actualFindWeaskestPlayersFromTeamTest)
  })

  describe('Test teams for 5 players priority', () => {
    test.each([
      {
        teams: [
          {
            player: PlayerColor.Black,
            team: [HockeyPlayerCard.Rabbit4, HockeyPlayerCard.Rabbit5, HockeyPlayerCard.Rabbit6, HockeyPlayerCard.Duck4, HockeyPlayerCard.Beaver4]
          },
          {
            player: PlayerColor.Blue,
            team: [HockeyPlayerCard.Beaver1, HockeyPlayerCard.Beaver2, HockeyPlayerCard.Beaver3, HockeyPlayerCard.Rabbit1, HockeyPlayerCard.Duck1]
          },
          {
            player: PlayerColor.Green,
            team: [HockeyPlayerCard.Eagle1, HockeyPlayerCard.Eagle2, HockeyPlayerCard.Eagle3, HockeyPlayerCard.Eagle4, HockeyPlayerCard.Eagle5]
          },
          {
            player: PlayerColor.Purple,
            team: [HockeyPlayerCard.Horse1, HockeyPlayerCard.Horse2, HockeyPlayerCard.Horse3, HockeyPlayerCard.Horse4, HockeyPlayerCard.Horse5]
          },
          {
            player: PlayerColor.Red,
            team: [HockeyPlayerCard.Panda1, HockeyPlayerCard.Panda2, HockeyPlayerCard.Panda3, HockeyPlayerCard.Panda4, HockeyPlayerCard.Panda5]
          }
        ],
        expectedPlayers: [PlayerColor.Black]
      }
    ])('getWeakestPlayersFromTeams should return the correct players array', actualFindWeaskestPlayersFromTeamTest)
  })

  describe('Test teams for 3 players with a tie', () => {
    test.each([
      {
        teams: [
          {
            player: PlayerColor.Black,
            team: [HockeyPlayerCard.Rabbit1, HockeyPlayerCard.Rabbit2, HockeyPlayerCard.Rabbit3, HockeyPlayerCard.Duck1, HockeyPlayerCard.Duck2]
          },
          {
            player: PlayerColor.Blue,
            team: [HockeyPlayerCard.Rabbit4, HockeyPlayerCard.Rabbit5, HockeyPlayerCard.Rabbit6, HockeyPlayerCard.Duck3, HockeyPlayerCard.Duck4]
          },
          {
            player: PlayerColor.Green,
            team: [HockeyPlayerCard.Eagle1, HockeyPlayerCard.Eagle2, HockeyPlayerCard.Eagle3, HockeyPlayerCard.Eagle4, HockeyPlayerCard.Eagle5]
          }
        ],
        expectedPlayers: [PlayerColor.Black, PlayerColor.Blue]
      }
    ])('getWeakestPlayersFromTeams should return the correct players array', actualFindWeaskestPlayersFromTeamTest)
  })

  describe('Test cards for 2-4 players priority', () => {
    test.each([
      {
        totalPlayers: 4,
        cards: [
          { player: PlayerColor.Black, card: HockeyPlayerCard.Duck2 },
          { player: PlayerColor.Blue, card: HockeyPlayerCard.Rabbit4 }
        ],
        expectedPlayer: PlayerColor.Black
      }
    ])('getWeakestPlayersFromTeams should return the correct players array', actualFindWeaskestPlayersFromCardTest)
  })

  describe('Test cards for 5-6 players priority', () => {
    test.each([
      {
        totalPlayers: 5,
        cards: [
          { player: PlayerColor.Black, card: HockeyPlayerCard.Duck2 },
          { player: PlayerColor.Blue, card: HockeyPlayerCard.Rabbit4 }
        ],
        expectedPlayer: PlayerColor.Blue
      }
    ])('getWeakestPlayersFromTeams should return the correct players array', actualFindWeaskestPlayersFromCardTest)
  })
})
