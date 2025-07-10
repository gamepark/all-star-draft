/** @jsxImportSource @emotion/react */
import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { CustomMoveType } from '@gamepark/all-star-draft/material/CustomMoveType'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { PlayMoveButton, useLegalMove, usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { isCustomMoveType, isEndPlayerTurn, MaterialMove } from '@gamepark/rules-api'
import { FC } from 'react'
import { Trans } from 'react-i18next'

type SimultaneousRuleHeaderComponentProps = {
  translationGroupKey: string
  interpolations?: Record<string, undefined | string | number | Element>
  pass?: boolean
}

export const SimultaneousRuleHeaderComponent: FC<SimultaneousRuleHeaderComponentProps> = ({
  translationGroupKey,
  interpolations,
  pass
}: SimultaneousRuleHeaderComponentProps) => {
  const playerId = usePlayerId<PlayerColor>()
  const activePlayers = useRules<AllStarDraftRules>()?.game.rule?.players ?? []
  const player = usePlayerName(activePlayers[0])
  const passMove = useLegalMove<MaterialMove>((move) => isCustomMoveType(CustomMoveType.Pass)(move) || (isEndPlayerTurn(move) && move.player === playerId))
  if (playerId !== undefined && activePlayers.includes(playerId)) {
    return (
      <Trans
        defaults={translationGroupKey + '.you'}
        values={{ ...interpolations }}
        components={
          pass
            ? {
                pass: (
                  <PlayMoveButton move={passMove}>
                    <Trans defaults="header.pass" />
                  </PlayMoveButton>
                )
              }
            : undefined
        }
      />
    )
  } else if (activePlayers.length > 1) {
    return <Trans defaults={translationGroupKey + '.players'} values={{ ...interpolations }} />
  } else {
    return <Trans defaults={translationGroupKey + '.player'} values={{ ...interpolations, name: player }} />
  }
}
