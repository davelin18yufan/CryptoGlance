export const ERC20_TOKENS = [
  {
    name: "Tether USD",
    symbol: "USDT",
    icon: "https://assets.coingecko.com/coins/images/325/thumb/Tether.png?1696501661",
    priceKey: "tether",
    address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
  },
  {
    name: "USD Coin",
    symbol: "USDC",
    icon: "https://assets.coingecko.com/coins/images/6319/thumb/usdc.png?1696506694",
    priceKey: "usd-coin",
    address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  },
  {
    name: "Shiba Inu",
    symbol: "SHIB",
    icon: "https://assets.coingecko.com/coins/images/31378/thumb/NicCageWaluigiElmo42069Inu.png?1696530195",
    priceKey: "shiba-inu",
    address: "0xfcaf0e4498e78d65526a507360f755178b804ba8",
  },
  {
    name: "Binance USD",
    symbol: "BUSD",
    icon: "https://assets.coingecko.com/coins/images/9576/thumb/BUSDLOGO.jpg?1696509654",
    priceKey: "binance-usd",
    address: "0x4fabb145d64652a948d72533023f6e7a623c7c53",
  },
  {
    name: "BNB",
    symbol: "BNB",
    icon: "https://assets.coingecko.com/coins/images/22884/thumb/BNB_wh_small.png?1696522182",
    priceKey: "Binance Coin",
    address: "0x418d75f65a02b3d53b2418fb8e1fe493759c7605",
  },
  {
    name: "DAI Stablecoin",
    symbol: "DAI",
    icon: "https://assets.coingecko.com/coins/images/9956/thumb/Badge_Dai.png?1696509996",
    priceKey: "dai",
    address: "0x6b175474e89094c44da98b954eedeac495271d0f",
  },
  {
    name: "HEX",
    symbol: "HEX",
    icon: "https://assets.coingecko.com/coins/images/10103/thumb/HEX-logo.png?1696510130",
    priceKey: "hex",
    address: "0x2b591e99afe9f32eaa6214f7b7629768c40eeb39",
  },
  {
    name: "Bitfinex LEO",
    symbol: "LEO",
    icon: "https://assets.coingecko.com/coins/images/8418/thumb/leo-token.png?1696508607",
    priceKey: "leo-token",
    address: "0x2af5d2ad76741191d15dfe7bf6ac92d4bd912ca3",
  },
  {
    name: "Maker",
    symbol: "MKR",
    icon: "https://assets.coingecko.com/coins/images/1364/thumb/Mark_Maker.png?1696502423",
    priceKey: "maker",
    address: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    priceKey: "ethereum",
    address: "0x5e21d1ee5cf0077b314c381720273ae82378d613",
  },
]

export const dummyBalances: { result: number; status: "success" | "failed" }[] = [
  { result: 2.10004, status: "success" },
  { result: 0, status: "success" },
  { result: 183.2, status: "success" },
  { result: 0, status: "success" },
  { result: 0, status: "success" },
  { result: 0, status: "success" },
  { result: 0, status: "success" },
  { result: 0, status: "success" },
  { result: 0, status: "success" },
  { result: 100, status: "success" },
]

export type TokenBalance = typeof dummyBalances
