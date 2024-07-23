import { useAccount, useBalance, useReadContracts } from "wagmi"
import { erc20Abi } from "viem"
import {
  Heading,
  Box,
  VStack,
  HStack,
  Image,
  Text,
  Flex,
  useColorModeValue,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { ERC20_TOKENS } from "../constants"
import { ChevronRightIcon } from "@chakra-ui/icons"
import Chart from "./Chart"
import { dummyBalances as tokenBalances } from "../constants"
import { useState } from "react"

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
  if (!balance && symbol !== "ETH") return null
  const bg = useColorModeValue("gray.50", "gray.700")
  const border = useColorModeValue("1px", "2px")
  return (
    <Box
      w="100%"
      h={32}
      p={4}
      shadow="md"
      borderWidth={border}
      rounded="lg"
      overflow="auto"
      position="relative"
      cursor="pointer"
      role="group"
      _hover={{
        bg,
      }}
    >
      <HStack gap="12px">
        <Image
          boxSize="40px"
          src={icon}
          alt={`${symbol} icon`}
          marginRight={4}
        />
        <VStack align="start" spacing={1} flex={1}>
          <Text fontWeight="bold">
            {symbol} {balance}
          </Text>
          <Text fontSize="sm">{address}</Text>
          <Text fontSize="sm">
            ${usdValue.toFixed(2)} USD ({percentage.toFixed(2)}%)
          </Text>
        </VStack>
        <ChevronRightIcon
          w={8}
          h={8}
          position="absolute"
          right={1}
          top="40%"
          _groupHover={{
            transform: "translateX(8px)",
            transition: "transform",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
            transitionDuration: "150ms",
          }}
        />
      </HStack>
    </Box>
  )
}

const Asset = () => {
  const [labelType, setLabelType] = useState<"value" | "percentage" | "symbol">(
    "percentage"
  )
  const border = useColorModeValue("1px", "2px")
  const { address, isConnected } = useAccount()
  if (!isConnected) return null

  const { data: ethBalance } = useBalance({
    address,
  })
  const { data: prices, error } = useQuery({
    queryKey: ["tokenPrices"],
    queryFn: fetchTokenPrices,
  })
  if (error) throw new Error(`fetch coingecko token price error: ${error}`)

  // Get erc20 contracts value
  const contracts = ERC20_TOKENS.map((token) => ({
    address: token.address as `0x${string}`,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address],
  }))

  // *Using imported dummyData instead of real
  // const { data: tokenBalances } = useReadContracts({
  //   contracts,
  // })

  // contracts and assets have exact same index
  const assets = ERC20_TOKENS.map((token, index) => {
    const balance = tokenBalances?.[index]?.result || 0
    const usdValue = parseFloat(balance.toString()) * prices?.ethereum?.usd || 0

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
        Total Balance: {ethBalance?.symbol} {ethBalance?.formatted}
      </Heading>
      <Flex
        mt={5}
        gap={5}
        flexDirection={{ base: "column", md: "row" }}
        justify="space-between"
        w="90vw"
      >
        <VStack w="60%" alignItems="stretch" spacing={3} flexShrink={0}>
          {assets.map((asset, index) => (
            <AssetCard key={index} {...asset} />
          ))}
        </VStack>
        <Box
          w="50%"
          maxWidth="650px"
          h="500px"
          shadow="md"
          borderWidth={border}
          rounded="lg"
          position="relative"
        >
          <RadioGroup
            // @ts-ignore
            onChange={setLabelType}
            value={labelType}
            position="absolute"
            top={0}
            left={0}
            zIndex={10}
            p={2}
          >
            <Stack direction="row">
              <Radio value="percentage">Percentage</Radio>
              <Radio value="symbol">Symbol</Radio>
              <Radio value="value">USD</Radio>
            </Stack>
          </RadioGroup>
          <Chart assets={assets} labelType={labelType} />
        </Box>
      </Flex>
    </Box>
  )
}

export default Asset
