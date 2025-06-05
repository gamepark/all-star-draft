import { PlayerColor } from '../PlayerColor'
import { ArenaCard, arenasFanPoints } from './ArenaCard'
import { HockeyPlayerCard } from './HockeyPlayerCard'
import { compareTeam, getTeamStrength } from './TeamStrength'

export type MatchState = {
  arena: ArenaCard
  teams: [PlayerColor, HockeyPlayerCard[]][]
}

export function getPlayersNewFans(match: MatchState): Partial<Record<PlayerColor, number>> {
  const newFans: Partial<Record<PlayerColor, number>> = {}
  const arenaFanPoints = arenasFanPoints[match.arena]
  const ranking = getPlayerRanking(match.teams)
  for (const player of Object.keys(ranking) as unknown as PlayerColor[]) {
    newFans[player] = arenaFanPoints[ranking[player] ?? 1 - 1]
  }
  return newFans
}

function getPlayerRanking(teams: [PlayerColor, HockeyPlayerCard[]][]): Partial<Record<PlayerColor, number>> {
  const ranking: [PlayerColor, number][] = teams.map((team) => [team[0], 1])
  const playerCount = teams.length
  teams.forEach((mainTeam, index) => {
    for (let i = index + 1; i < playerCount; i++) {
      const concurrentTeam = teams[i]
      const matchResult = compareTeam(getTeamStrength(mainTeam[1], playerCount), getTeamStrength(concurrentTeam[1], playerCount), playerCount)
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
