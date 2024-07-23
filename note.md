### Completed Features and Time Spent

**Preparation:**
- Spent 2 hours understanding terminology and reading relevant documentation. Wagmi and Viem were used for the first time, which required extra time to read through the documentation and understand how to use them.
- Spent additional time finding methods to test tokens due to losing the mnemonic phrase of my previous wallet. In the end, had to rely on dummy data for testing.

**1. Wallet Connection: (~2+ hours)**
- Implemented connections with wallets like MetaMask. **(Completed)**
- Displayed connected wallet address and ETH balance. **(Completed)**
- Implemented network switching functionality (e.g., Ethereum Mainnet, Ethereum Testnet Sepolia). **(Completed)**

**2. Asset Overview: (~3+ hours)**
- Display ERC20 token and ETH (gas) balances in the connected wallet. **(Completed)**
- Implement real-time updates of asset USD values using Coingecko, Chainlink Oracle, or AAVE Oracle. **(Completed)**
  - BTC, ETH(WETH), USDC (Unclear if I should use a specific currency for conversion or all, so I used ERC20 tokens for calculation).
- Field for your assets includes at least the symbol, icon, address, USD value, and percentage. **(Completed)**
- Show asset USD values distribution in a pie chart. **(Completed)**
  - Tips: Get AAVE Sepolia Testnet assets by faucet. **(Failed, unable to proceed without ETH)**
  - Tips: Make an allow list to decide what ERC-20 to display and make a mapping for its price key. **(Completed)**

**3. Transaction Integration: (~3+ hours)**
- Due to the lack of tokens for testing, relied on existing information to create submission status. Implemented state changes for isLoading and isConfirmed, as well as form validation. Zustan for updating assets was not completed.
- Added a button beside the asset list for transferring assets. **(Completed)**
- Provided an input for the user to type the address and amounts after clicking the button. **(Completed)**

**4. Transaction Monitoring (Listen to contract events): (~3 hours)**
- If the user completes transfer assets, detect status changes and update page information. **(Completed, without proper testing)**
- Use a Toast to notify the user when asset status changes are detected. **(Completed)**
  - Let the user understand progress by loading status. **(Incomplete)**
  - Optional: Display transaction type, currency, and amount in the Toast. **(Incomplete)**

### Technology Choices

- **Vite:** Chose Vite for its lightweight nature and fast setup. Hot reload is significantly faster than CRA, facilitating rapid development.
- **Zustand:** Preferred for its lightweight state management, easier to configure compared to Redux, and can be used outside of components.
- **Web3Modal:** Provides pre-built wallet connection buttons, although setting it up required some time to read through the documentation.
- **No router used.**
- **Chakra UI:** Chose Chakra UI as an alternative to MUI to explore its capabilities, knowing it is a trusted UI library.
- **ESLint:** Familiar with using ESLint.
- **Recharts:** Opted for Recharts for its high compatibility with React, built on D3.js, and personally found it more convenient than Chart.js.

### Challenges Encountered

1. **Terminology:** Needed to understand the definitions and meanings of many terms, such as ERC20 or returned data types.
2. **Type Conversion:** Balance returns are mostly `BigInt`, requiring special conversion. This often led to errors if not handled carefully.
3. **Wallet Connection:** Lost access to my old wallet, had to create a new one with no balance. Attempted to use Sepolia faucet but couldn’t proceed without ETH. Relied on dummy data, which may lead to errors when connecting a real wallet with a balance.
4. **Transaction Status:** Designed state management based on documentation but lacked real transaction scenarios to test data formats or the information returned on successful or failed transactions. This hindered the ability to update state and store accurately.

### Additional Features If More Time Allowed

- Improve RWD (Responsive Web Design)
- Improve layout
- Unit testing

### Additional Tasks Completed

- Dark mode
- Added a button to switch chart displays