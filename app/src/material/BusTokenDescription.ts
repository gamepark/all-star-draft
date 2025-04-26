import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { BusToken, BusTokenId } from '@gamepark/all-star-draft/material/BusToken'
import { CardDescription } from '@gamepark/react-game'
import Black1 from '../images/Tokens/Black1.png'
import Black2 from '../images/Tokens/Black2.png'
import Black3 from '../images/Tokens/Black3.png'
import Blue1 from '../images/Tokens/Blue1.png'
import Blue2 from '../images/Tokens/Blue2.png'
import Blue3 from '../images/Tokens/Blue3.png'
import Green1 from '../images/Tokens/Green1.png'
import Green2 from '../images/Tokens/Green2.png'
import Green3 from '../images/Tokens/Green3.png'
import Purple1 from '../images/Tokens/Purple1.png'
import Purple2 from '../images/Tokens/Purple2.png'
import Purple3 from '../images/Tokens/Purple3.png'
import Red1 from '../images/Tokens/Red1.png'
import Red2 from '../images/Tokens/Red2.png'
import Red3 from '../images/Tokens/Red3.png'
import Yellow1 from '../images/Tokens/Yellow1.png'
import Yellow2 from '../images/Tokens/Yellow2.png'
import Yellow3 from '../images/Tokens/Yellow3.png'
import BlackBack from '../images/Tokens/BlackBack.png'
import BlueBack from '../images/Tokens/BlueBack.png'
import GreenBack from '../images/Tokens/GreenBack.png'
import PurpleBack from '../images/Tokens/PurpleBack.png'
import RedBack from '../images/Tokens/RedBack.png'
import YellowBack from '../images/Tokens/YellowBack.png'

class BusTokenDescription extends CardDescription<PlayerColor, MaterialType, LocationType, BusTokenId> {
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
}

export const busTokenDrescription = new BusTokenDescription()
