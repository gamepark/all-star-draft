import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { ArenaCard } from '@gamepark/all-star-draft/material/ArenaCard'
import { CardDescription } from '@gamepark/react-game'
import ComboStadium1 from '../images/Cards/Arena/ComboStadium1.jpg'
import ComboStadium2 from '../images/Cards/Arena/ComboStadium2.jpg'
import ComboStadium3 from '../images/Cards/Arena/ComboStadium3.jpg'
import DamStadium1 from '../images/Cards/Arena/DamStadium1.jpg'
import DamStadium2 from '../images/Cards/Arena/DamStadium2.jpg'
import DamStadium3 from '../images/Cards/Arena/DamStadium3.jpg'
import Polarena1 from '../images/Cards/Arena/Polarena1.jpg'
import Polarena2 from '../images/Cards/Arena/Polarena2.jpg'
import Polarena3 from '../images/Cards/Arena/Polarena3.jpg'
import PuddlePark1 from '../images/Cards/Arena/PuddlePark1.jpg'
import PuddlePark2 from '../images/Cards/Arena/PuddlePark2.jpg'
import PuddlePark3 from '../images/Cards/Arena/PuddlePark3.jpg'
import StadiumFall1 from '../images/Cards/Arena/StadiumFall1.jpg'
import StadiumFall2 from '../images/Cards/Arena/StadiumFall2.jpg'
import StadiumFall3 from '../images/Cards/Arena/StadiumFall3.jpg'
import ArenaCardBack from '../images/Cards/Arena/ArenaCardBack.jpg'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { ArenaCardHelp } from '../components/help/ArenaCardHelp'

class ArenaCardDescription extends CardDescription<PlayerColor, MaterialType, LocationType, ArenaCard> {
  height = 9
  width = 16
  images = {
    [ArenaCard.ComboStadium1]: ComboStadium1,
    [ArenaCard.ComboStadium2]: ComboStadium2,
    [ArenaCard.ComboStadium3]: ComboStadium3,
    [ArenaCard.DamStadium1]: DamStadium1,
    [ArenaCard.DamStadium2]: DamStadium2,
    [ArenaCard.DamStadium3]: DamStadium3,
    [ArenaCard.Polarena1]: Polarena1,
    [ArenaCard.Polarena2]: Polarena2,
    [ArenaCard.Polarena3]: Polarena3,
    [ArenaCard.PuddlePark1]: PuddlePark1,
    [ArenaCard.PuddlePark2]: PuddlePark2,
    [ArenaCard.PuddlePark3]: PuddlePark3,
    [ArenaCard.StadiumFall1]: StadiumFall1,
    [ArenaCard.StadiumFall2]: StadiumFall2,
    [ArenaCard.StadiumFall3]: StadiumFall3
  }
  backImage = ArenaCardBack

  help = ArenaCardHelp
}

export const arenaCardDrescription = new ArenaCardDescription()
