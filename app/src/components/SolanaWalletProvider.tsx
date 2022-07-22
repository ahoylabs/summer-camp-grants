import { BitKeepWalletAdapter } from '@solana/wallet-adapter-bitkeep'
import { CloverWalletAdapter } from '@solana/wallet-adapter-clover'
import { Coin98WalletAdapter } from '@solana/wallet-adapter-coin98'
import { GlowWalletAdapter } from '@solana/wallet-adapter-glow'
import { HuobiWalletAdapter } from '@solana/wallet-adapter-huobi'
import { LedgerWalletAdapter } from '@solana/wallet-adapter-ledger'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom'
import { WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import { SafePalWalletAdapter } from '@solana/wallet-adapter-safepal'
import { SlopeWalletAdapter } from '@solana/wallet-adapter-slope'
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare'
import { SolletWalletAdapter } from '@solana/wallet-adapter-sollet'
import { TorusWalletAdapter } from '@solana/wallet-adapter-torus'
import { FC, useMemo } from 'react'

import { NEXT_PUBLIC_SOLANA_CLUSTER } from '../__generated__/_env'

export const SolanaWalletProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const wallets = useMemo(
    () => [
      new BitKeepWalletAdapter(),
      new CloverWalletAdapter(),
      new Coin98WalletAdapter(),
      new GlowWalletAdapter(),
      new HuobiWalletAdapter(),
      new LedgerWalletAdapter(),
      new PhantomWalletAdapter(),
      new SafePalWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter(),
      new SolletWalletAdapter(),
      new TorusWalletAdapter({
        params: {
          network:
            NEXT_PUBLIC_SOLANA_CLUSTER === 'devnet' ? 'devnet' : 'mainnet-beta',
        },
      }),
    ],
    [],
  )

  return (
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>{children}</WalletModalProvider>
    </WalletProvider>
  )
}
