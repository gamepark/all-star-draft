/** @jsxImportSource @emotion/react */
import { ArenaCard } from '@gamepark/all-star-draft/material/ArenaCard'
import { KnownBusTokenId } from '@gamepark/all-star-draft/material/BusToken'
import { HockeyPlayerCard } from '@gamepark/all-star-draft/material/HockeyPlayerCard'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { getTeamStrength } from '@gamepark/all-star-draft/material/TeamStrength'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { RuleId } from '@gamepark/all-star-draft/rules/RuleId'
import { MoveComponentContext, MoveComponentProps, usePlayerName } from '@gamepark/react-game'
import { isMoveItemTypeAtOnce, Material, MaterialGame, MaterialMove, MoveItemsAtOnce } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { TeamStrengthLogComponent } from './TeamStrengthLogComponent'

const getTeam = (
  move: MoveItemsAtOnce<PlayerColor, MaterialType, LocationType>,
  gameContext: MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
) => {
  const hockeyCardsMaterial = new Material<PlayerColor, MaterialType, LocationType>(
    MaterialType.HockeyPlayerCard,
    gameContext.game.items[MaterialType.HockeyPlayerCard]
  )
  const playerCards = hockeyCardsMaterial
    .location(LocationType.PlayerHockeyPlayerTeamSpot)
    .player(move.location.player)
    .locationId(move.location.id)
    .getItems<HockeyPlayerCard | undefined>()
    .filter((card) => card.id !== undefined)
    .map((card) => card.id!)
  return move.reveal === undefined ? playerCards : playerCards.concat(...move.indexes.map((index) => move.reveal![index].id as HockeyPlayerCard))
}

export const TeamRevealComponent: FC<MoveComponentProps<MaterialMove<PlayerColor, MaterialType, LocationType>, PlayerColor>> = ({ move, context }) => {
  const { t } = useTranslation()
  if (!isMoveItemTypeAtOnce<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move)) {
    return <></>
  }
  const gameContext = context as MoveComponentContext<
    MaterialMove<PlayerColor, MaterialType, LocationType>,
    PlayerColor,
    MaterialGame<PlayerColor, MaterialType, LocationType, RuleId>
  >
  const team = getTeam(move, gameContext)
  const bus = new Material<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken, gameContext.game.items[MaterialType.BusToken])
    .player(move.location.player)
    .location(LocationType.PlayerBusTokenTeamSpot)
    .locationId(move.location.id)
    .getItem<KnownBusTokenId>()
  const arena =
    bus === undefined
      ? undefined
      : new Material<PlayerColor, MaterialType, LocationType>(MaterialType.ArenaCard, gameContext.game.items[MaterialType.ArenaCard])
          .location((l) => l.type === LocationType.CurrentArenasRowSpot && l.x === move.location.id - 1)
          .getItem<ArenaCard>()
  const playerNumber = gameContext.game.players.length
  const teamStrength = getTeamStrength(team, playerNumber)
  const playerName = usePlayerName(move.location.player)
  return (
    <Trans
      defaults={gameContext.game.rule?.id === RuleId.DraftRoundPhaseTeamReveal ? 'history.draftPhase.revealTeam' : 'history.playOffsPhase.revealTeam'}
      values={{
        name: playerName,
        teamNumber: move.location.id,
        arenaNumber: move.location.id,
        arena: arena === undefined ? undefined : t(`arena.${ArenaCard[arena.id]}`)
      }}
      components={{ sup: <sup></sup>, strength: <TeamStrengthLogComponent teamStrength={teamStrength} playerNumber={playerNumber} /> }}
    />
  )
}
