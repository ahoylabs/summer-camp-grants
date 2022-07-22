import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { clusterApiUrl, Commitment, Connection } from '@solana/web3.js'

import { NEXT_PUBLIC_SOLANA_CLUSTER } from '../__generated__/_env'
import { solanaRPCEndpoint } from '../constants/environment'

export const preflightCommitment: Commitment = 'confirmed'

export const connection = new Connection(solanaRPCEndpoint, {
  commitment: preflightCommitment,
  wsEndpoint:
    NEXT_PUBLIC_SOLANA_CLUSTER === 'devnet'
      ? 'wss://devnet.genesysgo.net/'
      : undefined,
})

export const airdropConnection = new Connection(
  NEXT_PUBLIC_SOLANA_CLUSTER === 'devnet'
    ? clusterApiUrl(WalletAdapterNetwork.Devnet)
    : solanaRPCEndpoint,
  preflightCommitment,
)
