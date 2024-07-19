import {
  Button,
  useColorMode,
  Box,
  Heading,
  VStack,
  Flex,
  Divider,
  Spacer,
  ButtonGroup
} from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import WalletConnectButton from "./components/WalletBtn"

function App() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box textAlign="center" fontSize="xl" p={3} width="100%">
      <VStack spacing={5}>
        <Heading textAlign="center">Crypto Glance</Heading>
        <Flex minWidth="max-content" alignItems="center" gap="2" align='center'>
          <Button onClick={toggleColorMode} marginRight={2}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Spacer />
          <ButtonGroup gap="2" alignItems='center'>
            <w3m-network-button />
            <WalletConnectButton />
          </ButtonGroup>
        </Flex>
        <Divider />
        {/* <BalanceDisplay /> */}
      </VStack>
    </Box>
  )
}

export default App
