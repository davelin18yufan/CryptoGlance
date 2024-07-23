import { create } from "zustand"

type Asset = {
  symbol: string
  icon: string
  address: string
  balance: number
  usdValue: number
  percentage: number
}

interface BalanceState {
  ethBalance: number
  assets: Asset[]
  updateEthBalance: (balance: number) => void
  updateAssets: (newAssets: Asset[]) => void
  updateAssetBalance: (
    symbol: string,
    balance: number,
    usdValue: number
  ) => void
}

export const useBalanceStore = create<BalanceState>((set) => ({
  ethBalance: 0,
  assets: [],
  updateEthBalance: (balance) => set({ ethBalance: balance }),
  updateAssets: (newAssets) => set({ assets: newAssets }),
  updateAssetBalance: (symbol, balance, usdValue) =>
    set((state) => {
      const updatedAssets = state.assets.map((asset) =>
        asset.symbol === symbol ? { ...asset, balance, usdValue } : asset
      )

      const totalValue = updatedAssets.reduce(
        (sum, asset) => sum + asset.usdValue,
        0
      )

      return {
        assets: updatedAssets.map((asset) => ({
          ...asset,
          percentage: (asset.usdValue / totalValue) * 100,
        })),
      }
    }),
}))
