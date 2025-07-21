/** @jsxImportSource @emotion/react */
import { HockeyPlayerCard } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { getTeamStrength } from '@gamepark/all-star-draft/material/TeamStrength'
import { Memorize } from '@gamepark/all-star-draft/Memorize'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps, Picture, usePlayerName } from '@gamepark/react-game'
import { isDeleteItemTypeAtOnce, Material, MaterialGame, MaterialItem, MaterialMove, PlayerMemory } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { playoffTicketTokenDescription } from '../../../material/PlayoffTicketTokenDescription'
import { SupportersIconComponent } from '../../symbols/SupportersIconComponent'
import { CardValueLogComponent } from '../util/CardValueLogComponent'
import { TeamStrengthLogComponent } from '../util/TeamStrengthLogComponent'

const COLORS_NEEDING_CONTOUR = [PlayerColor.Green, PlayerColor.Yellow, PlayerColor.Blue]

const getTranslationKey = (isShootOut: boolean, playerCount: number) => {
  if (isShootOut) {
    return playerCount > 3 ? 'history.playOffsPhase.playerEliminatedShootOut' : 'history.playOffsPhase.playerEliminatedShootOutNoTicket'
  }
  return playerCount > 3 ? 'history.playOffsPhase.playerEliminated' : 'history.playOffsPhase.playerEliminatedNoTicket'
}

export const PlayOffsPlayerEliminatedComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({
  move,
  context
}) => {
  if (!isDeleteItemTypeAtOnce<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)) {
    return <></>
  }
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const player = gameContext.game.items[MaterialType.HockeyPlayerCard]![move.indexes[0]].location.player!
  const playerNumber = gameContext.game.players.length
  const shootOutCardsMaterial = new Material<PlayerColor, MaterialType, LocationType>(
    MaterialType.HockeyPlayerCard,
    gameContext.game.items[MaterialType.HockeyPlayerCard]
  )
    .location(LocationType.PlayerHockeyPlayerTeamSpot)
    .locationId(3)
  const isShootOut = shootOutCardsMaterial.length > 0
  const team = isShootOut
    ? shootOutCardsMaterial.getItems<HockeyPlayerCard>().map((card) => card.id)
    : move.indexes
        .map((index) => gameContext.game.items[MaterialType.HockeyPlayerCard]![index] as MaterialItem<PlayerColor, LocationType, HockeyPlayerCard>)
        .filter((item) => item.location.type === LocationType.PlayerHockeyPlayerTeamSpot && item.location.id === 2)
        .map((item) => item.id)
  const teamStrength = getTeamStrength(team, playerNumber)
  const fanPoints = new PlayerMemory(gameContext.game, player).remind<number>(Memorize.ScorePlayoff)
  const playerName = usePlayerName(player)
  return (
    <Trans
      defaults={getTranslationKey(isShootOut, playerNumber)}
      values={{ name: playerName, fanPoints: fanPoints }}
      components={{
        supporterIcon: <SupportersIconComponent contour={COLORS_NEEDING_CONTOUR.includes(player)} />,
        strength: isShootOut ? (
          <CardValueLogComponent cardId={team[0]} />
        ) : (
          <TeamStrengthLogComponent teamStrength={teamStrength} playerNumber={playerNumber} />
        ),
        ticket: <Picture src={playoffTicketTokenDescription.image} style={{ height: '2.5em' }} />
      }}
    />
  )
}
