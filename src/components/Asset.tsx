import { useAccount, useBalance, useReadContracts } from "wagmi"
import { erc20Abi } from "viem"
import { Heading, Box, VStack, HStack, Image, Text } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { ERC20_TOKENS } from "../constants"
import { ChevronRightIcon } from "@chakra-ui/icons"

const fetchTokenPrices = async () => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,usd-coin&vs_currencies=usd"
  )
  return response.json()
}

export const AssetCard = ({
  symbol,
  icon,
  address,
  usdValue,
  balance,
  percentage,
}: {
  symbol: string
  icon: string
  address: string
  balance: number | string
  usdValue: number
  percentage: number
}) => {
  if(!balance && symbol !== 'ETH') return null
  return (
    <Box w="100%" p={5} shadow="md" borderWidth="1px" rounded="lg">
      <HStack gap="12px">
        <Image boxSize="40px" src={icon} alt={`${symbol} icon`} marginRight={4}/>
        <VStack align="start" spacing={1}>
          <Text fontWeight="bold">
            {symbol} {balance}
          </Text>
          <Text fontSize="sm">{address}</Text>
          <Text fontSize="sm">
            ${usdValue.toFixed(2)} USD ({percentage.toFixed(2)}%)
          </Text>
        </VStack>
        <ChevronRightIcon w={8} h={8}/>
      </HStack>
    </Box>
  )
}

const Asset = () => {
  const { address, isConnected } = useAccount()
  if (!isConnected) return null

  const { data: ethBalance } = useBalance({
    address,
  })
  const { data: prices, error } = useQuery({
    queryKey: ["tokenPrices"],
    queryFn: fetchTokenPrices,
  })

  // Get erc20 contracts value
  const contracts = ERC20_TOKENS.map((token) => ({
    address: token.address as `0x${string}`,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address],
  }))

  const { data: tokenBalances } = useReadContracts({
    contracts,
  })

  // contracts and assets have exact same index
  const assets = ERC20_TOKENS.map((token, index) => {
    const balance = tokenBalances?.[index]?.result || 0
    const usdValue =
      parseFloat(balance.toString()) * prices?.ethereum?.usd || 0
    return {
      symbol: token.symbol,
      icon: token.icon,
      address: token.address,
      balance: parseFloat(balance.toString()),
      usdValue,
      percentage: usdValue
        ? (parseFloat(balance.toString()) /
            parseFloat(ethBalance?.formatted!)) *
          100
        : 0,
    }
  })

  return (
    <Box>
      <Heading size="md">
        Your Balance
        <Text display="inline block">
          {ethBalance?.symbol} {ethBalance?.formatted}
        </Text>
      </Heading>
      {assets.map((asset, index) => (
        <AssetCard key={index} {...asset} />
      ))}
    </Box>
  )
}

export default Asset
