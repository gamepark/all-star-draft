import { LocationDescription } from '@gamepark/react-game'
import { PlayerReminder } from '../components/reminder/PlayerReminder'

export class PlayerReminderDescription extends LocationDescription {
  width = 25
  height = 4.6
  borderRadius = 1
  content = PlayerReminder
}
