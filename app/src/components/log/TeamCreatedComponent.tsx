/** @jsxImportSource @emotion/react */
import { HockeyPlayerCard } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { getTeamStrength, TeamStrength } from '@gamepark/all-star-draft/material/TeamStrength'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { isMoveItemType, Material, MaterialGame, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { TeamStrengthLogComponent } from './TeamStrengthLogComponent'

const getTranslationKey = (
  gameContext: MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >,
  teamStrength?: TeamStrength
) => {
  if (gameContext.game.rule?.id === RuleId.DraftRoundPhaseTeamCreation) {
    return teamStrength === undefined ? 'history.draftPhase.teamCreated' : 'history.draftPhase.teamCreatedWithStrength'
  }
  return teamStrength === undefined ? 'history.playOffsPhase.teamCreated' : 'history.playOffsPhase.teamCreatedWithStrength'
}

export const TeamCreatedComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({ move, context }) => {
  if (!isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)) {
    return <></>
  }
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const playerName = usePlayerName(move.location.player)
  const teamNumber = move.location.id ?? 1
  const hockerCardMaterial = new Material<PlayerColor, MaterialType, LocationType>(
    MaterialType.HockeyPlayerCard,
    gameContext.game.items[MaterialType.HockeyPlayerCard]
  )
  const currentTeam = hockerCardMaterial
    .location(LocationType.PlayerHockeyPlayerTeamSpot)
    .locationId(teamNumber)
    .player(move.location.player)
    .getItems<HockeyPlayerCard | undefined>()
    .concat(hockerCardMaterial.getItem<HockeyPlayerCard>(move.itemIndex))
  const teamStrength = currentTeam.every((card) => card.id !== undefined)
    ? getTeamStrength(currentTeam.map((card) => card.id!).concat(), gameContext.game.players.length)
    : undefined
  return (
    <Trans
      defaults={getTranslationKey(gameContext, teamStrength)}
      values={{ name: playerName, teamNumber: teamNumber }}
      components={{
        sup: <sup></sup>,
        strength: teamStrength === undefined ? <></> : <TeamStrengthLogComponent teamStrength={teamStrength} playerNumber={gameContext.game.players.length} />
      }}
    />
  )
}
