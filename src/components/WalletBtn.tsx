import { useWeb3Modal } from "@web3modal/wagmi/react"
import { Button,useColorModeValue } from "@chakra-ui/react"

const WalletConnectButton = () => {
  const { open} = useWeb3Modal()
  const bg = useColorModeValue("teal.200", "teal.500")
  return (
    <Button onClick={() => open()} rounded="full" bg={bg}>
      Connect Wallet
    </Button>
  )
}

export default WalletConnectButton