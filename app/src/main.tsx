import { AllStarDraftOptionsSpecV2 } from '@gamepark/all-star-draft/AllStarDraftOptions'
import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { AllStarDraftSetup } from '@gamepark/all-star-draft/AllStarDraftSetup'
import { GameProvider } from '@gamepark/react-game'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { gameAnimations } from './animations/GameAnimations'
import { App } from './App'
import { AllStarDraftHistory } from './history/AllStarDraftHistory.ts'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import { AllStarDraftScoringDescription } from './scoring/AllStarDraftScoringDescription.tsx'
import { AllStarDraftTutorial } from './tutorial/AllStarDraftTutorial.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider
      game="all-star-draft"
      Rules={AllStarDraftRules}
      optionsSpec={AllStarDraftOptionsSpecV2}
      GameSetup={AllStarDraftSetup}
      material={Material}
      locators={Locators}
      animations={gameAnimations}
      tutorial={new AllStarDraftTutorial()}
      scoring={new AllStarDraftScoringDescription()}
      logs={new AllStarDraftHistory()}
    >
      <App />
    </GameProvider>
  </StrictMode>
)
