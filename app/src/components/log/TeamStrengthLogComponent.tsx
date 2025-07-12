/** @jsxImportSource @emotion/react */
import { AttributeKind, getAttributeKindPriority, TeamStrength } from '@gamepark/all-star-draft/material/TeamStrength'
import { FC } from 'react'
import { getSpeciesValueComponent, getSymbolValueComponent } from '../help/util/valueComponents'
import { MedalIconComponent } from '../symbols/MedalIconComponent'
import { TeamStrengthIconComponent } from '../symbols/TeamStrengthIconComponent'

type TeamStrengthLogComponentProps = {
  teamStrength: TeamStrength
  playerNumber: number
}

export const TeamStrengthLogComponent: FC<TeamStrengthLogComponentProps> = ({ teamStrength, playerNumber }) => {
  const medalNumber = getAttributeKindPriority(playerNumber).reverse().indexOf(teamStrength.attribute.kind) + 1
  const value =
    teamStrength.attribute.kind === AttributeKind.Symbol
      ? getSymbolValueComponent(teamStrength.attribute.value)
      : teamStrength.attribute.kind === AttributeKind.Species
        ? getSpeciesValueComponent(teamStrength.attribute.value)
        : teamStrength.attribute.value
  return (
    <>
      <TeamStrengthIconComponent strength={teamStrength.strength} />
      <MedalIconComponent medalNumber={medalNumber} height={50} />
      {value}
    </>
  )
}
