import { WalletOptions } from "./components/WagmiOption"
import { Button, useColorMode } from "@chakra-ui/react"
import "./App.css"

function App() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <h1>Crypto Glance</h1>
      <Button size="sm" onClick={toggleColorMode}>
        Toggle Mode
      </Button>
      <div className="card">
        <WalletOptions />
      </div>
    </>
  )
}

export default App
