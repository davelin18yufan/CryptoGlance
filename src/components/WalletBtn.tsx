import { Button, useColorModeValue } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { useWeb3Modal } from "@web3modal/wagmi/react"
import { useEffect } from "react"
import { erc20Abi } from "viem"
import { useAccount, useBalance, useReadContracts } from "wagmi"
import { ERC20_TOKENS } from "../constants"
import { useBalanceStore } from "../stores"

const fetchTokenPrices = async () => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,usd-coin&vs_currencies=usd"
  )
  return response.json()
}

export const WalletConnectButton = () => {
  const { open } = useWeb3Modal()
  const { address, isConnected } = useAccount()
  const { data: ethBalance } = useBalance({ address })
  const {
    data: prices,
    error,
    isLoading: isFetching,
  } = useQuery({
    queryKey: ["tokenPrices"],
    queryFn: fetchTokenPrices,
    enabled: isConnected,
  })
  if (error) throw new Error(`fetch coingecko token price error: ${error}`)

  const { updateEthBalance, updateAssets } = useBalanceStore()
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

  useEffect(() => {
    if (isConnected && address && !isFetching) {
      updateEthBalance(Number(ethBalance?.value))

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
            ? (parseFloat(balance.toString()) / Number(ethBalance?.value!)) *
              100
            : 0,
        }
      })
      updateAssets(assets)
    }
  }, [isConnected, address, isFetching])

  const bg = useColorModeValue("teal.200", "teal.500")
  return (
    <Button onClick={() => open()} rounded="full" bg={bg}>
      {address
        ? `${address.slice(0, 6)}...${address.slice(-4)}`
        : "Connect Wallet"}
    </Button>
  )
}
