import '../styles/normalize.css'
import '@solana/wallet-adapter-react-ui/styles.css'
import '../styles/global.css'

import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { RecoilRoot } from 'recoil'

import { SolanaWalletProvider } from '../components/SolanaWalletProvider'
import { AnalyticsWrapper } from '../hooks/useHeapAnalytics'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SolanaWalletProvider>
        <AnalyticsWrapper>
          <Component {...pageProps} />
          <Toaster />
        </AnalyticsWrapper>
      </SolanaWalletProvider>
    </RecoilRoot>
  )
}

export default MyApp
