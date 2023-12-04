import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'

import { StateProvider } from './state/state.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StateProvider>
    <Router>
      <App />
    </Router>
  </StateProvider>
)
