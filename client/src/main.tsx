import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import Providers from "./Providers.tsx"
import { Provider } from "react-redux"
import store from "./lib/store/store.ts"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <Provider store={store}>
        <App />
      </Provider>
    </Providers>
  </React.StrictMode>
)
