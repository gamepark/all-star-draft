/** @jsxImportSource @emotion/react */
import { HockeyPlayerCard } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { getTeamStrength } from '@gamepark/all-star-draft/material/TeamStrength'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { Material, MaterialGame, MaterialMove, MoveItem } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { TeamStrengthLogComponent } from './TeamStrengthLogComponent'

export const TeamCreatedComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({ move, context }) => {
  const cardMove = move as MoveItem<PlayerColor, MaterialType, LocationType>
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const playerName = usePlayerName(cardMove.location.player)
  const teamNumber = cardMove.location.id ?? 1
  const hockerCardMaterial = new Material<PlayerColor, MaterialType, LocationType>(
    MaterialType.HockeyPlayerCard,
    gameContext.game.items[MaterialType.HockeyPlayerCard]
  )
  const currentTeam = hockerCardMaterial
    .location(LocationType.PlayerHockeyPlayerTeamSpot)
    .locationId(teamNumber)
    .player(cardMove.location.player)
    .getItems<HockeyPlayerCard | undefined>()
    .concat(hockerCardMaterial.getItem<HockeyPlayerCard>(cardMove.itemIndex))
  const teamStrength = currentTeam.every((card) => card.id !== undefined)
    ? getTeamStrength(currentTeam.map((card) => card.id!).concat(), gameContext.game.players.length)
    : undefined
  const components =
    teamStrength === undefined
      ? { sup: <sup></sup>, strength: <></> }
      : {
          sup: <sup></sup>,
          strength: <TeamStrengthLogComponent teamStrength={teamStrength} playerNumber={gameContext.game.players.length} />
        }
  return (
    <Trans
      defaults={teamStrength === undefined ? 'log.draftPhase.teamCreated' : 'log.draftPhase.teamCreatedWithStrength'}
      values={{ name: playerName, teamNumber: teamNumber }}
      components={components}
    />
  )
}
