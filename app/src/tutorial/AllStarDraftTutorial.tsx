import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import SkinColor from '@gamepark/avataaars/dist/avatar/SkinColor'
import HairColorName from '@gamepark/avataaars/dist/avatar/top/HairColorName'
import { TopType, FacialHairType, ClotheType, EyeType, EyebrowType, MouthType } from '@gamepark/avataaars'
import { MaterialTutorial, TutorialStep } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import { AllStarDraftTutorialSetup, me, opponent1, opponent2 } from './AllStarDraftTutorialSetup'

export class AllStarDraftTutorial extends MaterialTutorial<PlayerColor, MaterialType, LocationType> {
  version = 1
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
      name: 'Thomas',
      avatar: {
        topType: TopType.LongHairBun,
        hairColor: HairColorName.Blonde,
        facialHairType: FacialHairType.BeardLight,
        facialHairColor: HairColorName.Blonde,
        clotheType: ClotheType.BlazerShirt,
        eyeType: EyeType.Default,
        eyebrowType: EyebrowType.DefaultNatural,
        mouthType: MouthType.Smile,
        skinColor: SkinColor.Pale
      }
    },
    {
      id: opponent2,
      name: 'Joseph',
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
        text: () => <Trans defaults="tuto.goal" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.hand" />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.recruitFirst" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.attributes" components={{ bold: <strong /> }} />
      }
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
    {
      popup: {
        text: () => <Trans defaults="tuto.draftDefinition" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.recruitSecond" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.continueDraft" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.endDraft" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.arenaIntro" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.powerExplanation" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.buildTeam" />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.busExplanation" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.busPlacement" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.tieBreakers" components={{ bold: <strong />, italic: <em /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.busMovement" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.startRound2" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.round2Intro" />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.round2Explanation" components={{ bold: <strong />, italic: <em />, whistle: <span className="icon-whistle" /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.recruitingGoalRound2" components={{ bold: <strong />, italic: <em /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.passDirection2" />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.recruitRound2" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.endDraft2" />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.swapPlayer" />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.buildTeam2" />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.sendBuses" />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.resolveArenas2" />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.round3Intro" />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.arenaSpecialIcon" components={{ bold: <strong />, icon: <span className="icon-special" /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.otherIcons" />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.recruitRound3" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.swapEachTeam" />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.buildTeam3" />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.sendFinalBuses" />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.resolveArenas3" />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.playoffsIntro" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.playoffTickets" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.playoffExplanation" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.playoffElimination" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.mandatoryChanges" components={{ bold: <strong /> }} />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.playoffsLoop" />
      }
    },
    {
      popup: {
        text: () => <Trans defaults="tuto.playoffsEnd" components={{ bold: <strong /> }} />
      }
    }
  ]

  // private isMoveForKitsuCard(
  //   cardId: KitsuCard,
  //   move: MaterialMove<number, MaterialType, LocationType>,
  //   game: MaterialGame<number, MaterialType, LocationType>
  // ) {
  //   return (
  //     isMoveItemType<number, MaterialType, LocationType>(MaterialType.KitsuCard)(move) &&
  //     this.material(game, MaterialType.KitsuCard).getItem<KitsuCard>(move.itemIndex).id === cardId
  //   )
  // }
}
