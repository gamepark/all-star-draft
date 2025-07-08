/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { Memorize } from '@gamepark/all-star-draft/Memorize'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { ScoringDescription } from '@gamepark/react-client'
import { Trans } from 'react-i18next'

enum ScoringKeys {
  DraftRound,
  PlayoffRound,
  PlayoffTicketTokens,
  Total
}

export class AllStarDraftScoringDescription implements ScoringDescription<PlayerColor, AllStarDraftRules, ScoringKeys> {
  getScoringKeys() {
    return [ScoringKeys.DraftRound, ScoringKeys.PlayoffRound, ScoringKeys.PlayoffTicketTokens, ScoringKeys.Total]
  }

  getScoringHeader(key: ScoringKeys) {
    switch (key) {
      case ScoringKeys.DraftRound:
        return <Trans defaults="scoring.draft" />
      case ScoringKeys.PlayoffRound:
        return <Trans defaults="scoring.playoff" />
      case ScoringKeys.PlayoffTicketTokens:
        return <Trans defaults="scoring.ticketTokens" />
      case ScoringKeys.Total:
        return (
          <div css={bold}>
            <Trans defaults="scoring.total" />
          </div>
        )
    }
  }

  getScoringPlayerData(key: ScoringKeys, player: PlayerColor, rules: AllStarDraftRules) {
    switch (key) {
      case ScoringKeys.DraftRound:
        return rules.remind<number>(Memorize.Score, player)
      case ScoringKeys.PlayoffRound:
        return rules.remind<number>(Memorize.ScorePlayoff, player)
      case ScoringKeys.PlayoffTicketTokens:
        return rules.remind<number>(Memorize.ScoreTicket, player)
      case ScoringKeys.Total:
        return (
          rules.remind<number>(Memorize.Score, player) +
          rules.remind<number>(Memorize.ScorePlayoff, player) +
          rules.remind<number>(Memorize.ScoreTicket, player)
        )
    }
  }
}

const bold = css`
  font-weight: bold;
`
