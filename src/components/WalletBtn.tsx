import { useWeb3Modal } from "@web3modal/wagmi/react"
import { Button, useColorModeValue } from "@chakra-ui/react"
import { useAccount } from "wagmi"
import { useState, useEffect } from 'react'

export const WalletConnectButton = () => {
  const { open } = useWeb3Modal()
  const account = useAccount()
  const [address, setAddress] = useState("")

   useEffect(() => {
     if (account && account.address) {
       setAddress(account.address?.toString())
     } else {
       setAddress("")
     }
   }, [account])

  const bg = useColorModeValue("teal.200", "teal.500")

  return (
    <Button onClick={() => open()} rounded="full" bg={bg}>
      {address ? address : "Connect Wallet"}
    </Button>
  )
}
