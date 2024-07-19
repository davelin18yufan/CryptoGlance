import { useAccount, useBalance } from "wagmi"
import { Heading, Box } from "@chakra-ui/react"

const Balance = () => {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({
    address,
  })
  const account = useAccount()
  console.log(isConnected)

  if (!isConnected) return 'null'

  return (
    <Box>
      <Heading size="md">Your Balance</Heading>
      <p>
        {balance?.symbol}
        {balance?.decimals}
      </p>
    </Box>
  )
}

export default Balance
