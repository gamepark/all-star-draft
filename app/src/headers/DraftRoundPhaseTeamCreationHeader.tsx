/** @jsxImportSource @emotion/react */
import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { LocationType } from '@gamepark/all-star-draft/material/LocationType'
import { MaterialType } from '@gamepark/all-star-draft/material/MaterialType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { DraftRoundPhaseTeamCreationRule } from '@gamepark/all-star-draft/rules/DraftRoundPhaseTeamCreationRule'
import { usePlayerId, usePlayerIds, usePlayerName, useRules } from '@gamepark/react-game'
import { Material } from '@gamepark/rules-api'
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
    return <Trans defaults="header.draft.exchangeAssemble.players" values={{ roundNumber: roundNumber }} />
  } else if (playersAbleToSwap.length === 1) {
    return <Trans defaults="header.draft.exchangeAssemble.player" values={{ name: playerNames[playersAbleToSwap[0]], roundNumber: roundNumber }} />
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
  const teamCreationRules = rules?.rulesStep as DraftRoundPhaseTeamCreationRule | undefined
  const players = usePlayerIds<PlayerColor>()
  const activePlayer = usePlayerId<PlayerColor>()
  const roundNumber = rules?.material(MaterialType.ArenaCard).location(LocationType.CurrentArenasRowSpot).length ?? 0
  const twoPlayersOpponent = players.find((player) => player !== activePlayer)!
  const playerNames = players.reduce((accumulator, player) => ({ ...accumulator, [player]: usePlayerName(player) }), {} as Record<PlayerColor, string>)
  const hockeyPlayerCardsMaterial = rules?.material(MaterialType.HockeyPlayerCard)
  const hockeyPlayerCardsInHandsMaterial = hockeyPlayerCardsMaterial?.location(LocationType.PlayerHockeyPlayerHandSpot)
  const hockeyPlayerCardsInTeamsMaterial = hockeyPlayerCardsMaterial?.location(LocationType.PlayerHockeyPlayerTeamSpot)
  if (activePlayer !== undefined) {
    if (teamCreationRules?.is2PlayersGameAndNeedToDiscardACard(hockeyPlayerCardsInHandsMaterial?.player(activePlayer), roundNumber)) {
      return <Trans defaults="header.draft.discard.you" />
    }
    const currentRoundTeam = hockeyPlayerCardsInTeamsMaterial?.locationId(roundNumber).player(activePlayer)
    if (teamCreationRules?.canSwapTeamMembers(roundNumber, activePlayer, currentRoundTeam)) {
      return <Trans defaults="header.draft.exchangeAssemble.you" values={{ roundNumber: roundNumber }} components={{ sup: <sup></sup> }} />
    }
    if (!teamCreationRules?.canSwapTeamMembers(roundNumber, activePlayer, currentRoundTeam) && !teamCreationRules?.canSendBuses(currentRoundTeam)) {
      return <Trans defaults="header.draft.assembleTeam.you" />
    }
    if (teamCreationRules.canSendBuses(currentRoundTeam)) {
      return <Trans defaults="header.draft.dispatch.you" />
    }
    const opponentNeedsToDiscardCard = teamCreationRules.is2PlayersGameAndNeedToDiscardACard(
      hockeyPlayerCardsInHandsMaterial?.player(twoPlayersOpponent),
      roundNumber
    )
    if (opponentNeedsToDiscardCard) {
      return <Trans defaults="header.draft.discard.player" values={{ name: playerNames[twoPlayersOpponent] }} />
    }
    return getHeadersWhenSpectating(players, hockeyPlayerCardsInTeamsMaterial, roundNumber, playerNames, rules)
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
