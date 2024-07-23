import {
  Button,
  useColorMode,
  Box,
  Heading,
  VStack,
  Flex,
  Divider,
  Spacer,
  ButtonGroup,
} from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { WalletConnectButton } from "./components/WalletBtn"
import Asset from "./components/Asset"
import { useAccount } from "wagmi"

function App() {
  const { colorMode, toggleColorMode } = useColorMode()
  const { address } = useAccount()

  return (
    <Box textAlign="center" fontSize="xl" p={3} width="100%">
      <VStack spacing={5}>
        <Heading textAlign="center">Crypto Glance</Heading>
        <Flex minWidth="max-content" alignItems="center" gap="2" align="center">
          <Button onClick={toggleColorMode} marginRight={2}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Spacer />
          <ButtonGroup gap="2" alignItems="center">
            <w3m-network-button />
            <WalletConnectButton />
          </ButtonGroup>
        </Flex>
        <Divider />
        {address ? (
          <Asset />
        ) : (
          <h1 color="gray.100" >
            Connect wallet to display
          </h1>
        )}
      </VStack>
    </Box>
  )
}

export default App
