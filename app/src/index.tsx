/** @jsxImportSource @emotion/react */
import { AllStarDraftOptionsSpec } from '@gamepark/all-star-draft/AllStarDraftOptions'
import { AllStarDraftRules } from '@gamepark/all-star-draft/AllStarDraftRules'
import { AllStarDraftSetup } from '@gamepark/all-star-draft/AllStarDraftSetup'
import { GameProvider, setupTranslation } from '@gamepark/react-game'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { gameAnimations } from './animations/GameAnimations'
import App from './App'
import { Locators } from './locators/Locators'
import { Material } from './material/Material'
import translations from './translations.json'

setupTranslation(translations, { debug: false })

ReactDOM.render(
  <StrictMode>
    <GameProvider
      game="all-star-draft"
      Rules={AllStarDraftRules}
      optionsSpec={AllStarDraftOptionsSpec}
      GameSetup={AllStarDraftSetup}
      material={Material}
      locators={Locators}
      animations={gameAnimations}
    >
      <App />
    </GameProvider>
  </StrictMode>,
  document.getElementById('root')
)
