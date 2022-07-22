import { AnchorWallet } from '@solana/wallet-adapter-react'
import { Keypair, Transaction } from '@solana/web3.js'

export const anchorWalletWithFallback = (wallet?: AnchorWallet) => {
  return (
    wallet ||
    ({
      publicKey: new Keypair().publicKey,
      signTransaction: (tx: Transaction) => Promise.resolve(tx),
      signAllTransactions: (txs: Transaction[]) => Promise.resolve(txs),
    } as AnchorWallet)
  )
}
