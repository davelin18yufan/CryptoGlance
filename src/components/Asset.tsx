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
  useDisclosure,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react"
import { ChevronRightIcon } from "@chakra-ui/icons"
import Chart from "./Chart"
import { useState, useMemo } from "react"
import Transaction from "./Transaction"
import { formatNumber } from "../utils"
import { useBalanceStore } from "../stores"
import { useAccount } from "wagmi"

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
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue("gray.50", "gray.700")
  const border = useColorModeValue("1px", "2px")
  return (
    <Box
      onClick={onOpen}
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
            ${formatNumber(usdValue)} USD ({percentage.toFixed(2)}%)
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
      <Transaction isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}

const Asset = () => {
  const { assets, ethBalance } = useBalanceStore()
  const { isConnected } = useAccount()
  if (!isConnected) return null
  const initialSelectedAssets = useMemo(
    () =>
      assets
        .filter((asset) => asset.balance !== 0 || asset.symbol === "ETH")
        .map((asset) => asset.symbol),
    [assets]
  )

  const [labelType, setLabelType] = useState<"value" | "percentage" | "symbol">(
    "percentage"
  )
  const [selectedAssets, setSelectedAssets] = useState<string[]>(
    initialSelectedAssets
  )

  const border = useColorModeValue("1px", "2px")
  if (!assets) return null

  const filteredAssets = assets.filter((asset) =>
    selectedAssets.includes(asset.symbol)
  )

  return (
    <Box>
      <Heading size="md">Total Balance: ETH {ethBalance}</Heading>
      <Flex
        mt={5}
        gap={5}
        flexDirection={{ base: "column", md: "row" }}
        justify="space-between"
        w="90vw"
      >
        <VStack w="60%" alignItems="stretch" spacing={3} flexShrink={0}>
          <CheckboxGroup
            colorScheme="green"
            defaultValue={selectedAssets}
            onChange={(values) => setSelectedAssets(values as string[])}
          >
            <Stack
              spacing={[1, 5]}
              direction={["column", "row"]}
              overflowX="auto"
              bg="gray.800"
              py={1}
            >
              {assets.map((asset) => (
                <Checkbox key={asset.symbol} value={asset.symbol}>
                  {asset.symbol}
                </Checkbox>
              ))}
            </Stack>
          </CheckboxGroup>
          {filteredAssets.map((asset) => (
            <AssetCard key={asset.symbol} {...asset} />
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
