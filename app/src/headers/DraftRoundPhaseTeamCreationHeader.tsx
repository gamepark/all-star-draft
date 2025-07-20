/** @jsxImportSource @emotion/react */
import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { useLegalMoves, usePlayerId, usePlayerIds, usePlayerName, useRules } from '@gamepark/react-game'
import { isDeleteItemType, isMoveItemType, Material, MaterialMove } from '@gamepark/rules-api'
import { FC, ReactElement } from 'react'
import { Trans } from 'react-i18next'

function getHeadersWhenSpectating(
  players: PlayerColor[],
  hockeyPlayerCardsInTeamsMaterial: Material<PlayerColor, MaterialType, LocationType> | undefined,
  roundNumber: number,
  playerNames: Record<PlayerColor, string>,
  rules: AllStarDraftRules | undefined
): ReactElement | null {
  const playersAbleToSwap = roundNumber === 1 ? [] : players.filter((p) => hockeyPlayerCardsInTeamsMaterial?.locationId(roundNumber).player(p).length === 0)
  if (playersAbleToSwap.length > 1) {
    return <Trans defaults="header.draft.exchangeAssemble.players" />
  } else if (playersAbleToSwap.length === 1) {
    return <Trans defaults="header.draft.exchangeAssemble.player" values={{ name: playerNames[playersAbleToSwap[0]] }} />
  }
  const playersCreatingTheirTeams = players.filter((p) => (hockeyPlayerCardsInTeamsMaterial?.locationId(roundNumber).player(p).length ?? 0) < 5)
  if (playersCreatingTheirTeams.length > 1) {
    return <Trans defaults="header.draft.assembleTeam.players" />
  } else if (playersCreatingTheirTeams.length === 1) {
    return <Trans defaults="header.draft.assembleTeam.player" values={{ name: playerNames[playersCreatingTheirTeams[0]] }} />
  }
  if (rules?.game.rule?.players?.length === 2) {
    return <Trans defaults="header.draft.dispatch.players" />
  } else if (rules?.game.rule?.players?.length === 1) {
    const playingPlayer = rules.game.rule.players[0]
    return <Trans defaults="header.draft.dispatch.player" values={{ name: playerNames[playingPlayer] }} />
  }
  return null
}

export const DraftRoundPhaseTeamCreationHeader: FC = () => {
  const rules = useRules<AllStarDraftRules>()
  const players = usePlayerIds<PlayerColor>()
  const activePlayer = usePlayerId<PlayerColor>()
  const moves = useLegalMoves<MaterialMove<PlayerColor, MaterialType, LocationType>>()
  const roundNumber = rules?.material(MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot).length ?? 0
  const twoPlayersOpponent = players.find((player) => player !== activePlayer)!
  const playerNames = players.reduce((accumulator, player) => ({ ...accumulator, [player]: usePlayerName(player) }), {} as Record<PlayerColor, string>)
  const hockeyPlayerCardsInHandsMaterial = rules?.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerHandSpot)
  const hockeyPlayerCardsInTeamsMaterial = rules?.material(MaterialType.HockeyPlayerCard).location(LocationType.PlayerHockeyPlayerTeamSpot)
  if (activePlayer !== undefined) {
    if (moves.length > 0) {
      if (players.length === 2 && moves.some((move) => isDeleteItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move))) {
        return <Trans defaults="header.draft.discard.you" />
      }
      if (moves.some((move) => isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) && move.location.x !== undefined)) {
        return <Trans defaults="header.draft.exchangeAssemble.you" values={{ roundNumber: roundNumber }} components={{ sup: <sup></sup> }} />
      }
      if (
        moves.every((move) => isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.HockeyPlayerCard)(move) && move.location.id === roundNumber)
      ) {
        return <Trans defaults="header.draft.assembleTeam.you" />
      }
      if (moves.every((move) => isMoveItemType<PlayerColor, MaterialType, LocationType>(MaterialType.BusToken)(move))) {
        return <Trans defaults="header.draft.dispatch.you" />
      }
      return null
    } else {
      const opponentNeedsToDiscardCard = players.length === 2 && hockeyPlayerCardsInHandsMaterial?.player(twoPlayersOpponent).length === 6 + roundNumber
      if (opponentNeedsToDiscardCard) {
        return <Trans defaults="header.draft.discard.player" values={{ name: playerNames[twoPlayersOpponent] }} />
      }
      return getHeadersWhenSpectating(players, hockeyPlayerCardsInTeamsMaterial, roundNumber, playerNames, rules)
    }
  } else {
    if (players.length === 2) {
      const playersNeedingToDiscardACard = players.filter((p) => hockeyPlayerCardsInHandsMaterial?.player(p).length === 6 + roundNumber)
      if (playersNeedingToDiscardACard.length === 2) {
        return <Trans defaults="header.draft.discard.players" />
      } else if (playersNeedingToDiscardACard.length === 1) {
        return <Trans defaults="header.draft.discard.player" values={{ name: playerNames[playersNeedingToDiscardACard[0]] }} />
      }
    }
    return getHeadersWhenSpectating(players, hockeyPlayerCardsInTeamsMaterial, roundNumber, playerNames, rules)
  }
}
