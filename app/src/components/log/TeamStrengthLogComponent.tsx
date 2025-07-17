/** @jsxImportSource @emotion/react */
import { AttributeKind, getAttributeKindPriority, IrregularAttribute, TeamStrength } from '@gamepark/all-star-draft/material/TeamStrength'
import { FC } from 'react'
import { MedalIconComponent } from '../symbols/MedalIconComponent'
import { TeamStrengthIconComponent } from '../symbols/TeamStrengthIconComponent'
import { getIrregularAttributeSymbol, getSpeciesValueComponent, getSymbolValueComponent } from '../util/valueComponents'

type TeamStrengthLogComponentProps = {
  teamStrength: TeamStrength
  playerNumber: number
  arenaIrregularRule?: IrregularAttribute
  displayIrregularAttribute?: boolean
}

export const TeamStrengthLogComponent: FC<TeamStrengthLogComponentProps> = ({ teamStrength, playerNumber, arenaIrregularRule, displayIrregularAttribute }) => {
  const medalNumber = getAttributeKindPriority(playerNumber).reverse().indexOf(teamStrength.attribute.kind) + 1
  const value =
    teamStrength.attribute.kind === AttributeKind.Symbol
      ? getSymbolValueComponent(teamStrength.attribute.value)
      : teamStrength.attribute.kind === AttributeKind.Species
        ? getSpeciesValueComponent(teamStrength.attribute.value)
        : teamStrength.attribute.value
  return (
    <>
      {arenaIrregularRule === undefined || !teamStrength.irregularsAttributes?.includes(arenaIrregularRule) ? (
        <>
          <TeamStrengthIconComponent strength={teamStrength.strength} />
          <MedalIconComponent medalNumber={medalNumber} style={{ height: '2.5em' }} />
          {value}
          {displayIrregularAttribute && (teamStrength.irregularsAttributes?.length ?? 0) > 0 && (
            <>
              {', '}
              {teamStrength.irregularsAttributes?.map((irregularAttribute, index) =>
                getIrregularAttributeSymbol(irregularAttribute, `player-${playerNumber}-team-irregular-${index}`)
              )}
            </>
          )}
        </>
      ) : (
        getIrregularAttributeSymbol(arenaIrregularRule)
      )}
    </>
  )
}
