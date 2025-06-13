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

export const getWeakestPlayersFromTeams = (teams: { player: PlayerColor; team: HockeyPlayerCard[] }[], playerCount: number): PlayerColor[] => {
  return teams
    .map((team) => ({ player: team.player, teamStrength: getTeamStrength(team.team, playerCount) }))
    .sort((a, b) => compareTeam(a.teamStrength, b.teamStrength, playerCount))
    .filter(
      (team, _index, array) =>
        team.teamStrength.strength === array[0].teamStrength.strength &&
        team.teamStrength.attribute.kind === array[0].teamStrength.attribute.kind &&
        team.teamStrength.attribute.value === array[0].teamStrength.attribute.value
    )
    .map((team) => team.player)
}

export const getWeakestPlayerFromCards = (cards: { player: PlayerColor; card: HockeyPlayerCard }[], playerCount: number): PlayerColor => {
  return cards.sort((a, b) => compareCards(a.card, b.card, playerCount)).map((card) => card.player)[0]
}
