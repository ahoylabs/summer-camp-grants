import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { clusterApiUrl, Commitment, PublicKey } from '@solana/web3.js'

import {
  NEXT_PUBLIC_HEAP_ENABLED,
  NEXT_PUBLIC_PROGRAM_ID,
  NEXT_PUBLIC_SOLANA_CLUSTER,
} from '../__generated__/_env'

export const ProgramPublicKey = new PublicKey(NEXT_PUBLIC_PROGRAM_ID)
export const transactionCommitment: Commitment = 'confirmed'
export const isHeapEnabled = NEXT_PUBLIC_HEAP_ENABLED === 'true'

export const solanaRPCEndpoint =
  NEXT_PUBLIC_SOLANA_CLUSTER === 'localnet'
    ? 'http://127.0.0.1:8899'
    : NEXT_PUBLIC_SOLANA_CLUSTER === 'devnet'
    ? 'https://devnet.genesysgo.net/'
    : NEXT_PUBLIC_SOLANA_CLUSTER === 'testnet'
    ? clusterApiUrl(WalletAdapterNetwork.Testnet)
    : 'https://ssc-dao.genesysgo.net/'

export const canAirdrop = NEXT_PUBLIC_SOLANA_CLUSTER !== 'mainnet'
export const isLocalDevelopment = process.env.NODE_ENV !== 'production'
