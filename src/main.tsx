import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import WagmiProvider from "./components/WagmiProvider.tsx"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "./theme.ts"


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <WagmiProvider>
        <App />
      </WagmiProvider>
    </ChakraProvider>
  </React.StrictMode>
)
