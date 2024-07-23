import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  useToast,
  CircularProgress,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import {
  useAccount,
  useBalance,
  useSendTransaction,
  useWaitForTransactionReceipt,
  type BaseError,
} from "wagmi"
import { parseEther } from "viem"
import { useBalanceStore } from "../stores"

interface FormValues {
  address: `0x${string}`
  value: string
}

const Transaction = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const [form, setForm] = useState<FormValues>({ address: "0x", value: "" })
  const addressError =
    !form.address || !form.address.startsWith("0x") || form.address.length < 10
  const valueError = !form.value || typeof Number(form.value) !== "number"

  const toast = useToast()
  const { address } = useAccount()
  const { data: balance } = useBalance({ address })
  const {ethBalance, assets, updateEthBalance} = useBalanceStore()

  const {
    data: hash,
    isPending,
    sendTransaction,
  } = useSendTransaction()

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleTransfer = async () => {
    if (addressError || valueError) {
      toast({
        title: "Invalid input",
        description: "Please check your input values",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
      return
    }

    try {
      const { address, value } = form
      sendTransaction({ to: address, value: parseEther(value) })
    } catch (error) {
      console.error("Failed to send transaction", error)
      toast({
        title: "Transaction failed",
        description:
          (error as BaseError).shortMessage || (error as BaseError).message,
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }
  }

  const {
    data: receipt,
    isLoading: isConfirming,
    isSuccess: isConfirmed,
  } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    if(isConfirmed){
      // TODO:Unfinished Part
      const gasUsed = receipt.gasUsed
      const gasPrice = receipt.effectiveGasPrice

      // transaction fee in wei
      const txFee = gasUsed * gasPrice

      updateEthBalance(ethBalance - Number(txFee))
      // TODO: Get real value
      // updateAssets('ETH', )
    }
  }, [ethBalance, assets])

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transfer Token</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={addressError}>
              <FormLabel>Address</FormLabel>
              <Input
                name="address"
                type="string"
                value={form.address}
                onChange={handleFormChange}
                placeholder="0xA0Cf…251e"
              />
              {!addressError ? (
                <FormHelperText>
                  Enter the address you'd like to transfer to.
                </FormHelperText>
              ) : (
                <FormErrorMessage>Invalid address format..</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={valueError} mt={4}>
              <FormLabel>Amount</FormLabel>
              <Input
                name="value"
                type="text"
                value={form.value}
                onChange={handleFormChange}
                placeholder="0.05"
              />
              {!valueError ? (
                <FormHelperText>
                  Enter the amount you'd like to transfer.
                </FormHelperText>
              ) : (
                <FormErrorMessage>Invalid amount..</FormErrorMessage>
              )}
              {balance && (
                <FormHelperText mt={2}>
                  Available balance: {Number(balance.value)} {balance.symbol}
                </FormHelperText>
              )}
            </FormControl>

            {hash && <div>Transaction Hash: {hash}</div>}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="ghost" color="black" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="solid"
              colorScheme="green"
              onClick={handleTransfer}
              isLoading={isConfirming || isPending}
              loadingText="Transferring"
              disabled={isPending}
            >
              {isPending ? (
                <CircularProgress isIndeterminate color="blue.300" />
              ) : (
                "Send"
              )}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {isConfirming && <CircularProgress isIndeterminate color="blue.300" />}
      {isConfirmed && (
        <Modal isOpen={isConfirmed} onClose={() => {}}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Transaction Successful</ModalHeader>
            <ModalBody>
              Your transfer has been completed successfully.
              {receipt.toString()}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

export default Transaction
