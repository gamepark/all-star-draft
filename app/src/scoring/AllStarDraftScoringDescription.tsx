/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { Memory } from '@gamepark/all-star-draft/Memory'
import { PlayerColor } from '@gamepark/all-star-draft/PlayerColor'
import { Picture, ScoringDescription } from '@gamepark/react-game'
import { Trans } from 'react-i18next'
import { SupportersIconComponent } from '../components/symbols/SupportersIconComponent'
import playOffTicker from '../images/Tokens/PlayoffTicketToken.jpg'

enum ScoringKeys {
  DraftRound,
  PlayoffRound,
  PlayoffTicketTokens,
  Total
}

export class AllStarDraftScoringDescription implements ScoringDescription<PlayerColor, AllStarDraftRules, ScoringKeys> {
  public getScoringKeys(rules: AllStarDraftRules): ScoringKeys[] {
    return rules.players.length > 3
      ? [ScoringKeys.DraftRound, ScoringKeys.PlayoffRound, ScoringKeys.Total]
      : [ScoringKeys.DraftRound, ScoringKeys.PlayoffRound, ScoringKeys.PlayoffTicketTokens, ScoringKeys.Total]
  }

  getScoringHeader(key: ScoringKeys) {
    switch (key) {
      case ScoringKeys.DraftRound:
        return <Trans defaults="scoring.draft" />
      case ScoringKeys.PlayoffRound:
        return <Trans defaults="scoring.playoff" />
      case ScoringKeys.PlayoffTicketTokens:
        return (
          <div style={{ display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }}>
            <Picture src={playOffTicker} width={75} />
            <Trans defaults="scoring.ticketTokens" />
          </div>
        )
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
        return (
          <>
            {rules.remind<number>(Memory.Score, player)}
            <SupportersIconComponent />
          </>
        )
      case ScoringKeys.PlayoffRound:
        return (
          <>
            {rules.remind<number>(Memory.ScorePlayoff, player)}
            <SupportersIconComponent />
          </>
        )
      case ScoringKeys.PlayoffTicketTokens:
        return (
          <>
            {rules.remind<number>(Memory.ScoreTicket, player)}
            <SupportersIconComponent />
          </>
        )
      case ScoringKeys.Total:
        return (
          <>
            {rules.remind<number>(Memory.Score, player) + rules.remind<number>(Memory.ScorePlayoff, player) + rules.remind<number>(Memory.ScoreTicket, player)}
            <SupportersIconComponent />
          </>
        )
    }
  }
}

const bold = css`
  font-weight: bold;
`
