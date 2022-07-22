import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { clusterApiUrl, Connection } from '@solana/web3.js'

import { NEXT_PUBLIC_SOLANA_CLUSTER } from '../__generated__/_env'
import { solanaRPCEndpoint } from '../constants/environment'

// only create this once
export const connection = new Connection(solanaRPCEndpoint, {
  commitment: 'confirmed',
  wsEndpoint:
    NEXT_PUBLIC_SOLANA_CLUSTER === 'devnet'
      ? 'wss://devnet.genesysgo.net/'
      : undefined,
})

/**
 * we cannot airdrop with the GenesysGo API so we need to set the connection
 * to the solana devnet API endpoint
 */
export const airdropConnection = new Connection(
  NEXT_PUBLIC_SOLANA_CLUSTER === 'devnet'
    ? clusterApiUrl(WalletAdapterNetwork.Devnet)
    : solanaRPCEndpoint,
  'confirmed',
)
