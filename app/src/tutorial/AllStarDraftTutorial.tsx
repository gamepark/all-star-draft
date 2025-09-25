import { ArenaCard } from '@gamepark/all-star-draft/material/ArenaCard'
import { getBusTokenValue, KnownBusTokenId } from '@gamepark/all-star-draft/material/BusToken'
import { getHockeyPlayerCardSymbol, HockeyPlayerCard, HockeyPlayerCardSymbolsType } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { compareTeam, getTeamStrength, TeamStrength } from '@gamepark/all-star-draft/material/TeamStrength'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { ClotheType, EyebrowType, EyeType, FacialHairType, MouthType, TopType } from '@gamepark/avataaars'
import SkinColor from '@gamepark/avataaars/dist/avatar/SkinColor'
import HairColorName from '@gamepark/avataaars/dist/avatar/top/HairColorName'
import { MaterialTutorial, Picture, TutorialStep } from '@gamepark/react-game'
import { isMoveItemType, isMoveItemTypeAtOnce, Material, MaterialGame, MaterialMove, MoveItem } from '@gamepark/rules-api'
import { range } from 'es-toolkit/compat'
import { Trans } from 'react-i18next'
import { SupportersIconComponent } from '../components/symbols/SupportersIconComponent'
import { TeamStrengthIconComponent } from '../components/symbols/TeamStrengthIconComponent'
import allGear from '../images/Symbols/ArenaAllGear.png'
import whistle from '../images/Symbols/ArenaWhistle.png'
import { busStationBoardDescription } from '../material/BusStationBoardDescription'
import { playoffPointCardDescription } from '../material/PlayoffPointCardDescription'
import { tieBreakerCardDrescription } from '../material/TieBreakerCardDescription'
import { AllStarDraftTutorialSetup, me, opponent1, opponent2 } from './AllStarDraftTutorialSetup'

const noDraftHoverSteps: TutorialStep<PlayerColor, MaterialType, LocationType>[] = [
  {
    popup: {
      text: () => <Trans i18nKey="tuto.hand" />,
      position: { x: 0, y: -25 }
    },
    focus: (game) => ({
      materials: [
        new Material<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard, game.items[MaterialType.HockeyPlayerCard])
          .location(LocationType.HockeyPlayerDraftSpot)
          .player(me)
      ],
      locations: [{ type: LocationType.HockeyPlayerDraftSpot, player: me }]
    })
  },
  {
    popup: {
      text: () => <Trans i18nKey="tuto.recruitFirst" components={{ bold: <strong /> }} />,
      position: { y: -20 }
    },
    focus: (game) => ({
      materials: [
        new Material<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard, game.items[MaterialType.HockeyPlayerCard])
          .location(LocationType.HockeyPlayerDraftSpot)
          .player(me)
          .id((id) => getHockeyPlayerCardSymbol(id as HockeyPlayerCard) !== HockeyPlayerCardSymbolsType.None)
          .limit(1)
      ],
      locations: [{ type: LocationType.PlayerHockeyPlayerHandSpot, player: me }]
    }),
    move: {
      filter: (move, game) => {
        const cardToMove = new Material<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard, game.items[MaterialType.HockeyPlayerCard])
          .location(LocationType.HockeyPlayerDraftSpot)
          .player(me)
          .id((id) => getHockeyPlayerCardSymbol(id as HockeyPlayerCard) !== HockeyPlayerCardSymbolsType.None)
          .limit(1)
          .getItems()[0].id as HockeyPlayerCard
        return isMoveForHockeyPlayerCard(move, game, cardToMove)
      }
    }
  },
  {
    popup: {
      text: () => <Trans i18nKey="tuto.attributes" components={{ bold: <strong /> }} />,
      position: { x: 20 }
    },
    focus: (game) => ({
      materials: [
        new Material<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard, game.items[MaterialType.HockeyPlayerCard])
          .location(LocationType.PlayerHockeyPlayerHandSpot)
          .player(me)
      ],
      margin: { right: 20 },
      scale: 5
    })
  }
]

const noArenaHoverSteps: Record<1 | 2 | 3, TutorialStep<PlayerColor, MaterialType, LocationType>[]> = {
  1: [
    {
      popup: {
        text: () => <Trans i18nKey="tuto.arenaIntro" components={{ bold: <strong /> }} />,
        position: { y: 30 }
      },
      focus: (game) => ({
        materials: [new Material<PlayerColor, MaterialType, LocationType>(MaterialType.ArenaCard, game.items[MaterialType.ArenaCard]).id(ArenaCard.Polarena1)],
        margin: { bottom: 5 },
        scale: 5
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.busPlacement" components={{ bold: <strong /> }} />,
        position: { x: 35 }
      },
      focus: (game, context) => ({
        materials: [
          new Material<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken, game.items[MaterialType.BusToken]).location(
            LocationType.BusTokenSpotBelowBusStationBoard
          )
        ],
        staticItems: { [MaterialType.BusStationBoard]: busStationBoardDescription.getStaticItems(context) },
        margin: { right: 20 }
      })
    }
  ],
  2: [
    {
      popup: {
        text: () => (
          <Trans i18nKey="tuto.round2Explanation" components={{ bold: <strong />, italic: <em />, whistle: <Picture src={whistle} width={50} /> }} />
        ),
        position: { x: 45 }
      },
      focus: (game) => ({
        materials: [
          new Material<PlayerColor, MaterialType, LocationType>(MaterialType.ArenaCard, game.items[MaterialType.ArenaCard]).location(
            LocationType.CurrentArenasRowSpot
          )
        ],
        margin: { right: 15 }
      })
    }
  ],
  3: [
    {
      popup: {
        text: () => <Trans i18nKey="tuto.round3Intro" components={{ bold: <strong /> }} />,
        position: { x: 35 }
      },
      focus: (game) => ({
        materials: [
          new Material<PlayerColor, MaterialType, LocationType>(MaterialType.ArenaCard, game.items[MaterialType.ArenaCard]).location(
            LocationType.CurrentArenasRowSpot
          )
        ],
        margin: { right: 20 }
      })
    },
    {
      popup: {
        text: () => <Trans i18nKey="tuto.arenaSpecialIcon" components={{ bold: <strong />, icon: <Picture src={allGear} width={150} /> }} />,
        position: { x: 35 }
      },
      focus: (game) => ({
        materials: [
          new Material<PlayerColor, MaterialType, LocationType>(MaterialType.ArenaCard, game.items[MaterialType.ArenaCard])
            .location(LocationType.CurrentArenasRowSpot)
            .id(ArenaCard.ComboStadium1)
        ],
        margin: { right: 20 }
      })
    }
  ]
}

const noTieBreakerHoverStep: TutorialStep<PlayerColor, MaterialType, LocationType> = {
  popup: {
    text: () => <Trans i18nKey="tuto.tieBreakers" components={{ bold: <strong />, italic: <em /> }} />
  },
  focus: (_game, context) => ({
    staticItems: { [MaterialType.TieBreakerCard]: tieBreakerCardDrescription.getStaticItems(context) },
    margin: { right: 10 }
  })
}

const noTeamAndHandHoverSteps: Record<2 | 3, TutorialStep<PlayerColor, MaterialType, LocationType>[]> = {
  2: [
    {
      popup: {
        text: () => <Trans i18nKey="tuto.swapPlayer" />,
        position: { x: 40, y: -15 }
      },
      focus: (game) => ({
        materials: [
          new Material<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard, game.items[MaterialType.HockeyPlayerCard])
            .location(LocationType.PlayerHockeyPlayerTeamSpot)
            .locationId(1)
            .player(me),
          new Material<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard, game.items[MaterialType.HockeyPlayerCard])
            .location(LocationType.PlayerHockeyPlayerHandSpot)
            .player(me)
        ],
        margin: { top: 2, right: 5 }
      }),
      move: {
        filter: (move, game) => isMoveForHockeyPlayerCard(move, game) && move.location.type === LocationType.PlayerHockeyPlayerHandSpot
      }
    }
  ],
  3: [
    {
      popup: {
        text: () => <Trans i18nKey="tuto.playoffElimination" components={{ bold: <strong /> }} />,
        position: { y: 20 }
      },
      focus: (game) => {
        const lastPlayer = game.players.find(
          (player) =>
            new Material<PlayerColor, MaterialType, LocationType>(MaterialType.PlayoffTicketToken, game.items[MaterialType.PlayoffTicketToken])
              .player(player)
              .getItems().length === 0
        )
        return {
          materials: [
            new Material<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard, game.items[MaterialType.HockeyPlayerCard])
              .location(LocationType.PlayerHockeyPlayerTeamSpot)
              .player(lastPlayer)
          ],
          scale: 0.75,
          margin: { bottom: 10 }
        }
      }
    }
  ]
}

const noPlayOffsPointsCardsHoverMoves: TutorialStep<PlayerColor, MaterialType, LocationType>[] = [
  {
    popup: {
      text: () => <Trans i18nKey="tuto.playoffsIntro" components={{ bold: <strong /> }} />,
      position: { x: 10 }
    },
    focus: (_game, context) => ({
      staticItems: { [MaterialType.PlayoffPointsCard]: playoffPointCardDescription.getStaticItems(context) }
    })
  }
]

const tutorialSteps: TutorialStep<PlayerColor, MaterialType, LocationType>[] = [
  {
    popup: {
      text: () => <Trans i18nKey="tuto.welcome" components={{ bold: <strong /> }} />
    }
  },
  {
    popup: {
      text: () => <Trans i18nKey="tuto.role" />
    }
  },
  {
    popup: {
      text: () => <Trans i18nKey="tuto.goal" components={{ bold: <strong />, supporterIcon: <SupportersIconComponent /> }} />
    }
  },
  ...noDraftHoverSteps,
  {
    popup: {
      text: () => <Trans i18nKey="tuto.teamObjective" components={{ bold: <strong /> }} />
    }
  },
  {
    popup: {
      text: () => <Trans i18nKey="tuto.opponents" />
    }
  },
  { move: { player: opponent1 } },
  { move: { player: opponent2, interrupt: (move) => isMoveItemTypeAtOnce(MaterialType.HockeyPlayerCard)(move) } },
  {
    popup: {
      text: () => <Trans i18nKey="tuto.draftDefinition" components={{ bold: <strong /> }} />
    },
    move: {}
  },
  {
    popup: {
      text: () => <Trans i18nKey="tuto.recruitSecond" components={{ bold: <strong /> }} />
    },
    move: {
      filter: (move, game) => isMoveForHockeyPlayerCard(move, game)
    }
  },
  {
    move: {
      player: opponent1
    }
  },
  {
    move: {
      player: opponent2
    }
  },
  {
    popup: {
      text: () => <Trans i18nKey="tuto.continueDraft" components={{ bold: <strong /> }} />
    },
    move: {
      filter: (move, game) => isMoveForHockeyPlayerCard(move, game)
    }
  },
  {
    move: {
      player: opponent1
    }
  },
  {
    move: {
      player: opponent2
    }
  },
  {
    move: {
      filter: (move, game) => isMoveForHockeyPlayerCard(move, game)
    }
  },
  {
    move: {
      player: opponent1
    }
  },
  {
    move: {
      player: opponent2
    }
  },
  {
    move: {
      filter: (move, game) => isMoveForHockeyPlayerCard(move, game)
    }
  },
  {
    move: {
      player: opponent1
    }
  },
  {
    move: {
      player: opponent2
    }
  },
  {
    popup: {
      text: () => <Trans i18nKey="tuto.endDraft" components={{ bold: <strong /> }} />
    }
  },
  noArenaHoverSteps[1][0],
  {
    popup: {
      text: () => (
        <Trans
          i18nKey="tuto.powerExplanation"
          components={{
            bold: <strong />,
            strengthSymbolMin: <TeamStrengthIconComponent strength={1} />,
            strengthSymbolMax: <TeamStrengthIconComponent strength={5} />
          }}
        />
      )
    }
  },
  {
    popup: {
      text: () => <Trans i18nKey="tuto.buildTeam" />
    },
    move: {
      filter: (move, game) => isMoveForHockeyPlayerCard(move, game)
    }
  },
  ...Array(4)
    .fill(1)
    .map(
      (): TutorialStep => ({
        move: {
          filter: (move, game) => isMoveForHockeyPlayerCard(move, game)
        }
      })
    ),
  ...Array(5)
    .fill(1)
    .map(
      (): TutorialStep => ({
        move: {
          player: opponent1
        }
      })
    ),
  ...Array(5)
    .fill(1)
    .map(
      (): TutorialStep => ({
        move: {
          player: opponent2
        }
      })
    ),
  {
    popup: {
      text: () => <Trans i18nKey="tuto.busExplanation" components={{ bold: <strong /> }} />,
      position: { x: 30 }
    },
    move: {
      filter: (move) => isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken)(move)
    },
    focus: (game) => ({
      materials: [
        new Material<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken, game.items[MaterialType.BusToken])
          .location(LocationType.PlayerBusTokenReserveSpot)
          .player(me)
          .id((id) => getBusTokenValue((id as KnownBusTokenId).front) === 1)
      ],
      locations: [{ type: LocationType.PlayerBusTokenTeamSpot, player: me }]
    })
  },
  { move: { player: opponent1 } },
  {
    move: {
      player: opponent2,
      interrupt: (move) =>
        isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken)(move) && move.location.type === LocationType.BusSpotOnArenaCardLadder
    }
  },
  noArenaHoverSteps[1][1],
  noTieBreakerHoverStep,
  {
    popup: {
      text: () => <Trans i18nKey="tuto.startRound2" components={{ bold: <strong /> }} />
    },
    move: {}
  },
  {
    popup: {
      text: () => <Trans i18nKey="tuto.round2Intro" />
    }
  },
  noArenaHoverSteps[2][0],
  {
    popup: {
      text: () => <Trans i18nKey="tuto.recruitingGoalRound2" components={{ bold: <strong />, italic: <em /> }} />
    },
    move: {
      filter: (move, game) => isMoveForHockeyPlayerCard(move, game)
    }
  },
  { move: { player: opponent1 } },
  { move: { player: opponent2, interrupt: (move) => isMoveItemTypeAtOnce(MaterialType.HockeyPlayerCard)(move) } },
  {
    popup: {
      text: () => <Trans i18nKey="tuto.passDirection2" components={{ bold: <strong /> }} />
    },
    move: {}
  },
  {
    popup: {
      text: () => <Trans i18nKey="tuto.recruitRound2" components={{ bold: <strong /> }} />
    },
    move: {
      filter: (move, game) => isMoveForHockeyPlayerCard(move, game)
    }
  },
  {
    move: {
      player: opponent1
    }
  },
  {
    move: {
      player: opponent2
    }
  },
  {
    move: {
      filter: (move, game) => isMoveForHockeyPlayerCard(move, game)
    }
  },
  {
    move: {
      player: opponent1
    }
  },
  {
    move: {
      player: opponent2
    }
  },
  {
    move: {
      filter: (move, game) => isMoveForHockeyPlayerCard(move, game)
    }
  },
  {
    move: {
      player: opponent1
    }
  },
  {
    move: {
      player: opponent2
    }
  },
  {
    move: {
      filter: (move, game) => isMoveForHockeyPlayerCard(move, game)
    }
  },
  {
    move: {
      player: opponent1
    }
  },
  {
    move: {
      player: opponent2
    }
  },
  {
    popup: {
      text: () => <Trans i18nKey="tuto.endDraft2" />
    }
  },
  noTeamAndHandHoverSteps[2][0],
  {
    move: {
      player: me
    }
  },
  {
    move: {
      filter: (move, game) => isMoveForHockeyPlayerCard(move, game) && move.location.x !== undefined,
      player: opponent1
    }
  },
  {
    move: {
      filter: (move, game) => isMoveForHockeyPlayerCard(move, game) && move.location.x !== undefined,
      player: opponent2
    }
  },
  {
    popup: {
      text: () => <Trans i18nKey="tuto.buildTeam2" />
    },
    move: {
      filter: (move, game) => isMoveForHockeyPlayerCard(move, game)
    }
  },
  ...Array(4)
    .fill(1)
    .map(
      (): TutorialStep => ({
        move: {
          filter: (move, game) => isMoveForHockeyPlayerCard(move, game)
        }
      })
    ),
  ...Array(5)
    .fill(1)
    .map(
      (): TutorialStep => ({
        move: {
          player: opponent2
        }
      })
    ),
  ...Array(5)
    .fill(1)
    .map(
      (): TutorialStep => ({
        move: {
          player: opponent1
        }
      })
    ),
  {
    popup: {
      text: () => <Trans i18nKey="tuto.sendBuses" />
    },
    move: {
      player: me
    }
  },
  {
    move: {
      player: me
    }
  },
  {
    move: {
      player: opponent1
    }
  },
  {
    move: {
      player: opponent1
    }
  },
  {
    move: {
      player: opponent2
    }
  },
  {
    move: {
      player: opponent2,
      interrupt: (move) =>
        isMoveItemType<number, MaterialType, LocationType>(MaterialType.BusToken)(move) && move.location.type === LocationType.BusTokenSpotBelowBusStationBoard
    }
  },
  {
    popup: {
      text: () => <Trans i18nKey="tuto.resolveArenas2" />
    },
    move: {}
  },
  ...noArenaHoverSteps[3],
  {
    popup: {
      text: () => <Trans i18nKey="tuto.otherIcons" />
    }
  },
  {
    popup: {
      text: () => <Trans i18nKey="tuto.recruitRound3" components={{ bold: <strong /> }} />
    },
    move: {
      player: me
    }
  },
  {
    move: {
      player: opponent1
    }
  },
  {
    move: {
      player: opponent2
    }
  },
  ...Array(4)
    .fill(1)
    .flatMap((): TutorialStep[] => [
      {
        move: {
          player: me
        }
      },
      {
        move: {
          player: opponent1
        }
      },
      {
        move: {
          player: opponent2
        }
      }
    ]),
  {
    popup: {
      text: () => <Trans i18nKey="tuto.swapEachTeam" />
    },
    move: {
      player: me,
      filter: (move, game) =>
        isMoveForHockeyPlayerCard(move, game) &&
        move.location.type === LocationType.PlayerHockeyPlayerHandSpot &&
        game.items[MaterialType.HockeyPlayerCard]![move.itemIndex].location.id === 1
    }
  },
  {
    move: {
      player: me
    }
  },
  {
    move: {
      player: me,
      filter: (move, game) =>
        isMoveForHockeyPlayerCard(move, game) &&
        move.location.type === LocationType.PlayerHockeyPlayerHandSpot &&
        game.items[MaterialType.HockeyPlayerCard]![move.itemIndex].location.id === 2
    }
  },
  {
    move: {
      player: me
    }
  },
  {
    move: {
      player: opponent1,
      filter: (move, game) =>
        isMoveForHockeyPlayerCard(move, game) &&
        move.location.type === LocationType.PlayerHockeyPlayerTeamSpot &&
        move.location.id === 1 &&
        move.location.x !== undefined
    }
  },
  {
    move: {
      player: opponent1,
      filter: (move, game) =>
        isMoveForHockeyPlayerCard(move, game) &&
        move.location.type === LocationType.PlayerHockeyPlayerTeamSpot &&
        move.location.id === 2 &&
        move.location.x !== undefined
    }
  },
  {
    move: {
      player: opponent2,
      filter: (move, game) =>
        isMoveForHockeyPlayerCard(move, game) &&
        move.location.type === LocationType.PlayerHockeyPlayerTeamSpot &&
        move.location.id === 1 &&
        move.location.x !== undefined
    }
  },
  {
    move: {
      player: opponent2,
      filter: (move, game) =>
        isMoveForHockeyPlayerCard(move, game) &&
        move.location.type === LocationType.PlayerHockeyPlayerTeamSpot &&
        move.location.id === 2 &&
        move.location.x !== undefined
    }
  },
  {
    popup: {
      text: () => <Trans i18nKey="tuto.buildTeam3" />
    },
    move: {
      player: me
    }
  },
  ...Array(4)
    .fill(1)
    .map(
      (): TutorialStep => ({
        move: {
          player: me
        }
      })
    ),
  ...Array(5)
    .fill(1)
    .map(
      (): TutorialStep => ({
        move: {
          player: opponent1
        }
      })
    ),
  ...Array(5)
    .fill(1)
    .map(
      (): TutorialStep => ({
        move: {
          player: opponent2
        }
      })
    ),
  {
    popup: {
      text: () => <Trans i18nKey="tuto.sendFinalBuses" />
    },
    move: {
      player: me
    }
  },
  {
    move: {
      player: me
    }
  },
  {
    move: {
      player: me
    }
  },
  {
    move: {
      player: opponent1
    }
  },
  {
    move: {
      player: opponent1
    }
  },
  {
    move: {
      player: opponent1
    }
  },
  {
    move: {
      player: opponent2
    }
  },
  {
    move: {
      player: opponent2
    }
  },
  {
    move: {
      player: opponent2,
      interrupt: (move) =>
        isMoveItemTypeAtOnce<number, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
        move.location.type === LocationType.PlayerHockeyPlayerHandSpot
    }
  },
  {
    popup: {
      text: () => <Trans i18nKey="tuto.resolveArenas3" />
    },
    move: {}
  },
  ...noPlayOffsPointsCardsHoverMoves,
  {
    popup: {
      text: () => <Trans i18nKey="tuto.playoffTickets" components={{ bold: <strong /> }} />,
      position: { x: -20 }
    },
    focus: (game) => ({
      materials: [
        new Material<PlayerColor, MaterialType, LocationType>(MaterialType.PlayoffTicketToken, game.items[MaterialType.PlayoffTicketToken]).player(me)
      ],
      margin: { left: 10 },
      scale: 0.5
    })
  },
  {
    popup: {
      text: () => <Trans i18nKey="tuto.playoffExplanation" components={{ bold: <strong /> }} />
    },
    move: { player: me }
  },
  ...Array(4)
    .fill(1)
    .map(
      (): TutorialStep => ({
        move: {
          player: me
        }
      })
    ),
  ...Array(5)
    .fill(1)
    .map(
      (): TutorialStep => ({
        move: {
          player: opponent1,
          filter: (move, game) => isMoveForHockeyPlayerCard(move, game) && !isMoveGoingToTie(move, game)
        }
      })
    ),
  ...Array(5)
    .fill(1)
    .map(
      (): TutorialStep => ({
        move: {
          player: opponent2,
          filter: (move, game) => isMoveForHockeyPlayerCard(move, game) && !isMoveGoingToTie(move, game)
        }
      })
    ),
  ...noTeamAndHandHoverSteps[3],
  {
    popup: {
      text: () => <Trans i18nKey="tuto.mandatoryChanges" components={{ bold: <strong />, italic: <em /> }} />
    }
  },
  {
    popup: {
      text: () => <Trans i18nKey="tuto.playoffsLoop" components={{ bold: <strong /> }} />
    }
  },
  {
    popup: {
      text: () => <Trans i18nKey="tuto.playoffsEnd" components={{ bold: <strong /> }} />
    }
  }
]

const getStepIndexes = (
  steps: TutorialStep<PlayerColor, MaterialType, LocationType>[],
  allSteps: TutorialStep<PlayerColor, MaterialType, LocationType>[]
): number[] => steps.map((step) => allSteps.indexOf(step)).filter((index) => index !== -1)

export const NO_PLAY_OFFS_POINTS_CARD_HOVER_STEP_INDEXES = getStepIndexes(noPlayOffsPointsCardsHoverMoves, tutorialSteps)

export const NO_TEAM_AND_HAND_HOVER_STEP_INDEXES = getStepIndexes(
  (range(2, 4) as (2 | 3)[]).flatMap((round) => noTeamAndHandHoverSteps[round]),
  tutorialSteps
)

export const NO_TIE_BREAKER8HOVER_STEP_INDEXES = getStepIndexes([noTieBreakerHoverStep], tutorialSteps)

export const NO_ARENA_HOVER_STEP_INDEXES = getStepIndexes(
  (range(1, 4) as (1 | 2 | 3)[]).flatMap((round) => noArenaHoverSteps[round]),
  tutorialSteps
)

export const NO_DRAFT_HOVER_TUTORIAL_STEPS_INDEXES = getStepIndexes(noDraftHoverSteps, tutorialSteps)

const isMoveForHockeyPlayerCard = (
  move: MaterialMove<number, MaterialType, LocationType>,
  game: MaterialGame<number, MaterialType, LocationType>,
  cardId?: HockeyPlayerCard
): move is MoveItem<PlayerColor, MaterialType.HockeyPlayerCard, LocationType> => {
  if (cardId === undefined) {
    return isMoveItemType<number, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)
  }
  return (
    isMoveItemType<number, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
    new Material<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard, game.items[MaterialType.HockeyPlayerCard]).getItem<HockeyPlayerCard>(
      move.itemIndex
    ).id === cardId
  )
}

const isMoveGoingToTie = (
  move: MoveItem<PlayerColor, MaterialType.HockeyPlayerCard, LocationType>,
  game: MaterialGame<PlayerColor, MaterialType, LocationType>
): boolean => {
  const activePlayer = move.location.player!
  const activePlayerTeamStrength = getPlayOffTeamStrength(activePlayer, game, move.itemIndex)
  return game.players
    .filter((player) => player !== activePlayer)
    .some((otherPlayer) => {
      const otherTeamStrength = getPlayOffTeamStrength(otherPlayer, game)
      return compareTeam(otherTeamStrength, activePlayerTeamStrength, game.players.length) === 0
    })
}

const getPlayOffTeamStrength = (player: PlayerColor, game: MaterialGame<PlayerColor, MaterialType, LocationType>, cardId?: HockeyPlayerCard): TeamStrength => {
  const team: HockeyPlayerCard[] = new Material<PlayerColor, MaterialType, LocationType>(
    MaterialType.HockeyPlayerCard,
    game.items[MaterialType.HockeyPlayerCard]
  )
    .location(LocationType.PlayerHockeyPlayerTeamSpot)
    .locationId(2)
    .player(player)
    .getItems<HockeyPlayerCard>()
    .map((card) => card.id)
  return getTeamStrength(cardId ? [...team, cardId] : team, game.players.length)
}

export class AllStarDraftTutorial extends MaterialTutorial<PlayerColor, MaterialType, LocationType> {
  version = 5
  options = {
    players: [
      {
        id: me
      },
      {
        id: opponent1
      },
      {
        id: opponent2
      }
    ]
  }
  players = [
    { id: me },
    {
      id: opponent1,
      name: 'Marco',
      avatar: {
        topType: TopType.Hat,
        hairColor: HairColorName.Blonde,
        facialHairType: FacialHairType.MoustacheMagnum,
        facialHairColor: HairColorName.Blonde,
        clotheType: ClotheType.BlazerShirt,
        eyeType: EyeType.Wink,
        eyebrowType: EyebrowType.RaisedExcited,
        mouthType: MouthType.Smile,
        skinColor: SkinColor.Pale
      }
    },
    {
      id: opponent2,
      name: 'Malte',
      avatar: {
        topType: TopType.Eyepatch,
        hairColor: HairColorName.Blonde,
        facialHairType: FacialHairType.BeardLight,
        facialHairColor: HairColorName.Blonde,
        clotheType: ClotheType.BlazerShirt,
        eyeType: EyeType.Default,
        eyebrowType: EyebrowType.DefaultNatural,
        mouthType: MouthType.Smile,
        skinColor: SkinColor.Pale
      }
    }
  ]
  setup = new AllStarDraftTutorialSetup()
  steps: TutorialStep<number, MaterialType, LocationType>[] = tutorialSteps
}
