import { PlayerColor } from '../PlayerColor'
import { ArenaCard, arenaIrregularAttribute, arenasFanPoints } from './ArenaCard'
import { HockeyPlayerCard } from './HockeyPlayerCard'
import { compareCards, compareTeam, getTeamStrength, IrregularAttribute } from './TeamStrength'

export type MatchState = {
  arena: ArenaCard
  teams: [PlayerColor, HockeyPlayerCard[]][]
}

export function getPlayersNewFans(match: MatchState): Partial<Record<PlayerColor, number>> {
  const newFans: Partial<Record<PlayerColor, number>> = {}
  const arenaFanPoints = arenasFanPoints[match.arena]
  const ranking = getPlayerRanking(match.teams, arenaIrregularAttribute[match.arena])
  for (const player of Object.keys(ranking) as unknown as PlayerColor[]) {
    newFans[player] = arenaFanPoints[(ranking[player] ?? 1) - 1]
  }
  return newFans
}

export function getPlayerRanking(teams: [PlayerColor, HockeyPlayerCard[]][], irregularAttribute?: IrregularAttribute): Partial<Record<PlayerColor, number>> {
  const ranking: [PlayerColor, number][] = teams.map((team) => [team[0], 1])
  const playerCount = teams.length
  teams.forEach((mainTeam, index) => {
    for (let i = index + 1; i < playerCount; i++) {
      const concurrentTeam = teams[i]
      const matchResult = compareTeam(
        getTeamStrength(mainTeam[1], playerCount),
        getTeamStrength(concurrentTeam[1], playerCount),
        playerCount,
        irregularAttribute
      )
      if (matchResult > 0) {
        const lossConcurrentTeamIndex = ranking.findIndex(([player, _]) => player === concurrentTeam[0])
        ranking[lossConcurrentTeamIndex][1] = ranking[lossConcurrentTeamIndex][1] + 1
      } else if (matchResult < 0) {
        const lossMainTeamIndex = ranking.findIndex(([player, _]) => player === mainTeam[0])
        ranking[lossMainTeamIndex][1] = ranking[lossMainTeamIndex][1] + 1
      }
    }
  })
  return Object.fromEntries(ranking) as Partial<Record<PlayerColor, number>>
}

export function getWeakestPlayersFromTeams(teams: [PlayerColor, HockeyPlayerCard[]][], playerCount: number): PlayerColor[] {
  let weakestPlayers: PlayerColor[] = teams.map((team) => team[0])
  teams.forEach((mainTeam, index) => {
    for (let i = index + 1; i < playerCount; i++) {
      const concurrentTeam = teams[i]
      const matchResult = compareTeam(getTeamStrength(mainTeam[1], playerCount), getTeamStrength(concurrentTeam[1], playerCount), playerCount)
      if (matchResult > 0) {
        // main team win and can't be last
        weakestPlayers = weakestPlayers.filter((player) => player !== mainTeam[0])
      } else if (matchResult < 0) {
        // concurrent team win and can't be last
        weakestPlayers = weakestPlayers.filter((player) => player !== concurrentTeam[0])
      }
    }
  })
  return weakestPlayers
}

export function getWeakestPlayerFromCards(cards: [PlayerColor, HockeyPlayerCard][], playerCount: number): PlayerColor {
  let weakestPlayers: PlayerColor[] = cards.map((card) => card[0])
  cards.forEach((mainCard, index) => {
    for (let i = index + 1; i < playerCount; i++) {
      const concurrentCard = cards[i]
      const matchResult = compareCards(mainCard[1], concurrentCard[1], playerCount)
      if (matchResult > 0) {
        // main team win and can't be last
        weakestPlayers = weakestPlayers.filter((player) => player !== mainCard[0])
      } else if (matchResult < 0) {
        // concurrent team win and can't be last
        weakestPlayers = weakestPlayers.filter((player) => player !== concurrentCard[0])
      }
    }
  })
  return weakestPlayers[0]
}
