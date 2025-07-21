/** @jsxImportSource @emotion/react */
import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { PlayoffSubstitutePlayersRule } from '@gamepark/all-star-draft/rules/PlayoffSubstitutePlayersRule'
import { usePlayerId, useRules } from '@gamepark/react-game'
import { FC } from 'react'
import { SimultaneousRuleHeaderComponent } from '../components/headers/SimultaneousRuleHeaderComponent'

export const PlayOffsRoundPhaseTeamSubstituteHeader: FC = () => {
  const rules = useRules<AllStarDraftRules>()
  const substituteRules = rules?.rulesStep as PlayoffSubstitutePlayersRule | undefined
  const activePlayer = usePlayerId<PlayerColor>()
  if (activePlayer !== undefined) {
    if (substituteRules?.isFirstPlayOffRound()) {
      return <SimultaneousRuleHeaderComponent translationGroupKey="header.playoff.assembleTeam" />
    } else {
      return <SimultaneousRuleHeaderComponent translationGroupKey="header.playoff.substitute" pass />
    }
  }
  if (!substituteRules?.isFirstPlayOffRound()) {
    return <SimultaneousRuleHeaderComponent translationGroupKey="header.playoff.substitute" />
  } else {
    return <SimultaneousRuleHeaderComponent translationGroupKey="header.playoff.assembleTeam" />
  }
}
