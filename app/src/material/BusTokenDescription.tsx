/** @jsxImportSource @emotion/react */
import { fa1, fa2, fa3 } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { BusToken, BusTokenId } from '@gamepark/all-star-draft/material/BusToken'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { ItemButtonProps, ItemContext, ItemMenuButton, TokenDescription } from '@gamepark/react-game'
import { isMoveItemType, MaterialItem, MaterialMove } from '@gamepark/rules-api'
import { ReactNode } from 'react'
import { BusTokenHelp } from '../components/help/BusTokenHelp'
import Black1 from '../images/Tokens/Bus/Black1.png'
import Black2 from '../images/Tokens/Bus/Black2.png'
import Black3 from '../images/Tokens/Bus/Black3.png'
import BlackBack from '../images/Tokens/Bus/BlackBack.png'
import Blue1 from '../images/Tokens/Bus/Blue1.png'
import Blue2 from '../images/Tokens/Bus/Blue2.png'
import Blue3 from '../images/Tokens/Bus/Blue3.png'
import BlueBack from '../images/Tokens/Bus/BlueBack.png'
import Green1 from '../images/Tokens/Bus/Green1.png'
import Green2 from '../images/Tokens/Bus/Green2.png'
import Green3 from '../images/Tokens/Bus/Green3.png'
import GreenBack from '../images/Tokens/Bus/GreenBack.png'
import Purple1 from '../images/Tokens/Bus/Purple1.png'
import Purple2 from '../images/Tokens/Bus/Purple2.png'
import Purple3 from '../images/Tokens/Bus/Purple3.png'
import PurpleBack from '../images/Tokens/Bus/PurpleBack.png'
import Red1 from '../images/Tokens/Bus/Red1.png'
import Red2 from '../images/Tokens/Bus/Red2.png'
import Red3 from '../images/Tokens/Bus/Red3.png'
import RedBack from '../images/Tokens/Bus/RedBack.png'
import Yellow1 from '../images/Tokens/Bus/Yellow1.png'
import Yellow2 from '../images/Tokens/Bus/Yellow2.png'
import Yellow3 from '../images/Tokens/Bus/Yellow3.png'
import YellowBack from '../images/Tokens/Bus/YellowBack.png'

const dispatchButtonProps: { coordinates: Partial<ItemButtonProps>; icon: FontAwesomeIconProps['icon'] }[] = [
  { coordinates: { x: 1, y: -1 }, icon: fa1 },
  { coordinates: { x: 3.4, y: -1 }, icon: fa2 },
  { coordinates: { x: 2.2, y: 1 }, icon: fa3 }
]

class BusTokenDescription extends TokenDescription<PlayerColor, MaterialType, LocationType, BusTokenId> {
  height = 2.2
  width = 3
  images = {
    [BusToken.Black1]: Black1,
    [BusToken.Black2]: Black2,
    [BusToken.Black3]: Black3,
    [BusToken.Blue1]: Blue1,
    [BusToken.Blue2]: Blue2,
    [BusToken.Blue3]: Blue3,
    [BusToken.Green1]: Green1,
    [BusToken.Green2]: Green2,
    [BusToken.Green3]: Green3,
    [BusToken.Purple1]: Purple1,
    [BusToken.Purple2]: Purple2,
    [BusToken.Purple3]: Purple3,
    [BusToken.Red1]: Red1,
    [BusToken.Red2]: Red2,
    [BusToken.Red3]: Red3,
    [BusToken.Yellow1]: Yellow1,
    [BusToken.Yellow2]: Yellow2,
    [BusToken.Yellow3]: Yellow3
  }
  backImages = {
    [PlayerColor.Black]: BlackBack,
    [PlayerColor.Blue]: BlueBack,
    [PlayerColor.Green]: GreenBack,
    [PlayerColor.Purple]: PurpleBack,
    [PlayerColor.Red]: RedBack,
    [PlayerColor.Yellow]: YellowBack
  }

  help = BusTokenHelp

  getItemMenu(
    item: MaterialItem<PlayerColor, LocationType>,
    context: ItemContext<PlayerColor, MaterialType, LocationType>,
    legalMoves: MaterialMove<PlayerColor, MaterialType, LocationType>[]
  ): ReactNode {
    if (context.player !== undefined && item.location.player === context.player && context.rules.game.rule !== undefined) {
      const ruleId = context.rules.game.rule.id
      const locationType = item.location.type
      const currentItemIndex = context.rules.material(MaterialType.BusToken).id(item.id).getIndex()
      const movesForThisItem = legalMoves
        .filter(isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken))
        .filter((move) => move.itemIndex === currentItemIndex)
      if (ruleId === RuleId.DraftRoundPhaseBusDispatch && locationType === LocationType.PlayerBusTokenReserveSpot && movesForThisItem.length > 0) {
        return (
          <>
            {movesForThisItem.map((move) => {
              const moveLocationIndex: number = move.location.id - 1
              return (
                <ItemMenuButton key={`draft-card-move-${moveLocationIndex}`} move={move} {...dispatchButtonProps[moveLocationIndex].coordinates}>
                  <FontAwesomeIcon icon={dispatchButtonProps[moveLocationIndex].icon} size="lg" />
                </ItemMenuButton>
              )
            })}
          </>
        )
      }
    }
    return undefined
  }
}

export const busTokenDescription = new BusTokenDescription()
