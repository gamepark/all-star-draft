/** @jsxImportSource @emotion/react */
import { ArenaCard } from '@gamepark/all-star-draft/material/ArenaCard'
import { busTokenValue, KnownBusTokenId } from '@gamepark/all-star-draft/material/BusToken'
import { getHockeyPlayerCardSymbol, HockeyPlayerCard, HockeyPlayerCardSymbolsType } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { ClotheType, EyebrowType, EyeType, FacialHairType, MouthType, TopType } from '@gamepark/avataaars'
import SkinColor from '@gamepark/avataaars/dist/avatar/SkinColor'
import HairColorName from '@gamepark/avataaars/dist/avatar/top/HairColorName'
import { MaterialTutorial, Picture, TutorialStep } from '@gamepark/react-game'
import { isMoveItemType, isMoveItemTypeAtOnce, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { Trans } from 'react-i18next'
import { SupportersIconComponent } from '../components/symbols/SupportersIconComponent'
import allGear from '../images/Symbols/ArenaAllGear.png'
import whistle from '../images/Symbols/ArenaWhistle.png'
import { busStationBoardDescription } from '../material/BusStationBoardDescription'
import { playoffPointCardDescription } from '../material/PlayoffPointCardDescription'
import { tieBreakerCardDrescription } from '../material/TieBreakerCardDescription'
import { AllStarDraftTutorialSetup, me, opponent1, opponent2 } from './AllStarDraftTutorialSetup'

export class AllStarDraftTutorial extends MaterialTutorial<PlayerColor, MaterialType, LocationType> {
  version = 2
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
  steps: TutorialStep<number, MaterialType, LocationType>[] = [
    {
      popup: {
        text: () => <Trans defaults="tuto.welcome" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.role" />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.goal" components={{ bold: <strong />, supporterIcon: <SupportersIconComponent /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.hand" />,
        position: { x: 0, y: -25 }
      },
      focus: (_game, _context) => ({
        materials: [this.material(_game, MaterialType.HockeyPlayerCard).location(LocationType.HockeyPlayerDraftSpot).player(me)],
        locations: [{ type: LocationType.HockeyPlayerDraftSpot, player: me }]
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.recruitFirst" components={{ bold: <strong /> }} />,
        position: { y: -20 }
      },
      focus: (_game, _context) => ({
        materials: [
          this.material(_game, MaterialType.HockeyPlayerCard)
            .location(LocationType.HockeyPlayerDraftSpot)
            .player(me)
            .id((id) => getHockeyPlayerCardSymbol(id as HockeyPlayerCard) !== HockeyPlayerCardSymbolsType.None)
            .limit(1)
        ],
        locations: [{ type: LocationType.PlayerHockeyPlayerHandSpot, player: me }]
      }),
      move: {
        filter: (move, _game) => {
          const cardToMove = this.material(_game, MaterialType.HockeyPlayerCard)
            .location(LocationType.HockeyPlayerDraftSpot)
            .player(me)
            .id((id) => getHockeyPlayerCardSymbol(id as HockeyPlayerCard) !== HockeyPlayerCardSymbolsType.None)
            .limit(1)
            .getItems()[0].id as HockeyPlayerCard
          return this.isMoveForHockeyPlayerCard(move, _game, cardToMove)
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.attributes" components={{ bold: <strong /> }} />,
        position: { x: 20 }
      },
      focus: (_game, _context) => ({
        materials: [this.material(_game, MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerHandSpot).player(me)],
        margin: { right: 20 },
        scale: 5
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.teamObjective" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.opponents" />
      }
    },
    { move: { player: opponent1 } },
    { move: { player: opponent2, interrupt: (move) => isMoveItemTypeAtOnce(MaterialType.HockeyPlayerCard)(move) && move.location.player === opponent1 } },
    {
      popup: {
        text: () => <Trans defaults="tuto.draftDefinition" components={{ bold: <strong /> }} />
      },
      move: {}
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.recruitSecond" components={{ bold: <strong /> }} />
      },
      move: {
        filter: (move, game) => this.isMoveForHockeyPlayerCard(move, game)
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
        text: () => <Trans defaults="tuto.continueDraft" components={{ bold: <strong /> }} />
      },
      move: {
        filter: (move, game) => this.isMoveForHockeyPlayerCard(move, game)
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
        filter: (move, game) => this.isMoveForHockeyPlayerCard(move, game)
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
        filter: (move, game) => this.isMoveForHockeyPlayerCard(move, game)
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
        text: () => <Trans defaults="tuto.endDraft" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.arenaIntro" components={{ bold: <strong /> }} />,
        position: { y: 30 }
      },
      focus: (_game, _context) => ({
        materials: [this.material(_game, MaterialType.ArenaCard).id(ArenaCard.Polarena1)],
        margin: { bottom: 5 },
        scale: 5
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.powerExplanation" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.buildTeam" />
      },
      move: {
        filter: (move, game) => this.isMoveForHockeyPlayerCard(move, game)
      }
    },
    ...Array(4)
      .fill(1)
      .map(
        (): TutorialStep => ({
          move: {
            filter: (move, game) => this.isMoveForHockeyPlayerCard(move, game)
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
        text: () => <Trans defaults="tuto.busExplanation" components={{ bold: <strong /> }} />,
        position: { x: 30 }
      },
      move: {
        filter: (move) => isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken)(move)
      },
      focus: (_game, _context) => ({
        materials: [
          this.material(_game, MaterialType.BusToken)
            .location(LocationType.PlayerBusTokenReserveSpot)
            .player(me)
            .id((id) => busTokenValue((id as KnownBusTokenId).front) === 1)
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
    {
      popup: {
        text: () => <Trans defaults="tuto.busPlacement" components={{ bold: <strong /> }} />,
        position: { x: 35 }
      },
      focus: (_game, _context) => ({
        materials: [this.material(_game, MaterialType.BusToken).location(LocationType.BusTokenSpotBelowBusStationBoard)],
        staticItems: { [MaterialType.BusStationBoard]: busStationBoardDescription.getStaticItems(_context) },
        margin: { right: 20 }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.tieBreakers" components={{ bold: <strong />, italic: <em /> }} />
      },
      focus: (_game, _context) => ({
        staticItems: { [MaterialType.TieBreakerCard]: tieBreakerCardDrescription.getStaticItems(_context) },
        margin: { right: 10 }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.startRound2" components={{ bold: <strong /> }} />
      },
      move: {}
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.round2Intro" />
      }
    },
    {
      popup: {
        text: () => (
          <Trans defaults="tuto.round2Explanation" components={{ bold: <strong />, italic: <em />, whistle: <Picture src={whistle} width={50} /> }} />
        ),
        position: { x: 45 }
      },
      focus: (_game, _context) => ({
        materials: [this.material(_game, MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot)],
        margin: { right: 15 }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.recruitingGoalRound2" components={{ bold: <strong />, italic: <em /> }} />
      },
      move: {
        filter: (move, _game) => this.isMoveForHockeyPlayerCard(move, _game)
      }
    },
    { move: { player: opponent1 } },
    { move: { player: opponent2, interrupt: (move) => isMoveItemTypeAtOnce(MaterialType.HockeyPlayerCard)(move) && move.location.player === opponent2 } },
    {
      popup: {
        text: () => <Trans defaults="tuto.passDirection2" components={{ bold: <strong /> }} />
      },
      move: {}
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.recruitRound2" components={{ bold: <strong /> }} />
      },
      move: {
        filter: (move, game) => this.isMoveForHockeyPlayerCard(move, game)
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
        filter: (move, game) => this.isMoveForHockeyPlayerCard(move, game)
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
        filter: (move, game) => this.isMoveForHockeyPlayerCard(move, game)
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
        filter: (move, game) => this.isMoveForHockeyPlayerCard(move, game)
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
        text: () => <Trans defaults="tuto.endDraft2" />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.swapPlayer" />,
        position: { x: 40, y: -15 }
      },
      focus: (_game, _context) => ({
        materials: [
          this.material(_game, MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).locationId(1).player(me),
          this.material(_game, MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerHandSpot).player(me)
        ],
        margin: { top: 2, right: 5 }
      }),
      move: {
        filter: (move, _game) => this.isMoveForHockeyPlayerCard(move, _game)
      }
    },
    {
      move: {
        filter: (move, _game) => this.isMoveForHockeyPlayerCard(move, _game)
      }
    },
    {
      move: {
        filter: (move, _game) => this.isMoveForHockeyPlayerCard(move, _game),
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
        filter: (move, _game) => this.isMoveForHockeyPlayerCard(move, _game),
        player: opponent2
      }
    },
    {
      move: {
        player: opponent2
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.buildTeam2" />
      },
      move: {
        filter: (move, _game) => this.isMoveForHockeyPlayerCard(move, _game)
      }
    },
    ...Array(4)
      .fill(1)
      .map(
        (): TutorialStep => ({
          move: {
            filter: (move, game) => this.isMoveForHockeyPlayerCard(move, game)
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
        text: () => <Trans defaults="tuto.sendBuses" />
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
          isMoveItemType<number, MaterialType, LocationType>(MaterialType.BusToken)(move) &&
          move.location.type === LocationType.BusTokenSpotBelowBusStationBoard
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.resolveArenas2" />
      },
      move: {}
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.round3Intro" components={{ bold: <strong /> }} />,
        position: { x: 35 }
      },
      focus: (_game, _context) => ({
        materials: [this.material(_game, MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot)],
        margin: { right: 20 }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.arenaSpecialIcon" components={{ bold: <strong />, icon: <Picture src={allGear} width={150} /> }} />,
        position: { x: 35 }
      },
      focus: (_game, _context) => ({
        materials: [this.material(_game, MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot).id(ArenaCard.ComboStadium1)],
        margin: { right: 20 }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.otherIcons" />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.recruitRound3" components={{ bold: <strong /> }} />
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
        text: () => <Trans defaults="tuto.swapEachTeam" />
      },
      move: {
        player: me,
        filter: (move, game) => this.isMoveForHockeyPlayerCard(move, game)
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
        filter: (move, game) => this.isMoveForHockeyPlayerCard(move, game)
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
        filter: (move, game) => this.isMoveForHockeyPlayerCard(move, game)
      }
    },
    {
      move: {
        player: opponent1
      }
    },
    {
      move: {
        player: opponent1,
        filter: (move, game) => this.isMoveForHockeyPlayerCard(move, game)
      }
    },
    {
      move: {
        player: opponent1
      }
    },
    {
      move: {
        player: opponent2,
        filter: (move, game) => this.isMoveForHockeyPlayerCard(move, game)
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
        filter: (move, game) => this.isMoveForHockeyPlayerCard(move, game)
      }
    },
    {
      move: {
        player: opponent2
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.buildTeam3" />
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
        text: () => <Trans defaults="tuto.sendFinalBuses" />
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
        text: () => <Trans defaults="tuto.resolveArenas3" />
      },
      move: {}
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.playoffsIntro" components={{ bold: <strong /> }} />,
        position: { x: 10 }
      },
      focus: (_game, _context) => ({
        staticItems: { [MaterialType.PlayoffPointsCard]: playoffPointCardDescription.getStaticItems(_context) }
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.playoffTickets" components={{ bold: <strong /> }} />,
        position: { x: -20 }
      },
      focus: (_game, _context) => ({
        materials: [this.material(_game, MaterialType.PlayoffTicketToken).player(me)],
        margin: { left: 10 },
        scale: 0.5
      })
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.playoffExplanation" components={{ bold: <strong /> }} />
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
        text: () => <Trans defaults="tuto.playoffElimination" components={{ bold: <strong /> }} />,
        position: { y: 20 }
      },
      focus: (_game, _context) => {
        const lastPlayer = _game.players.find((player) => this.material(_game, MaterialType.PlayoffTicketToken).player(player).getItems().length === 0)
        return {
          materials: [this.material(_game, MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot).player(lastPlayer)],
          scale: 0.75,
          margin: { bottom: 10 }
        }
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.mandatoryChanges" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.playoffsLoop" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.playoffsEnd" components={{ bold: <strong /> }} />
      }
    }
  ]

  private isMoveForHockeyPlayerCard(
    move: MaterialMove<number, MaterialType, LocationType>,
    game: MaterialGame<number, MaterialType, LocationType>,
    cardId?: HockeyPlayerCard
  ) {
    if (cardId === undefined) return isMoveItemType<number, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)
    return (
      isMoveItemType<number, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) &&
      this.material(game, MaterialType.HockeyPlayerCard).getItem<HockeyPlayerCard>(move.itemIndex).id === cardId
    )
  }
}
