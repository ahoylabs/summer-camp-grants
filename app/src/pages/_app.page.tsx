import '../styles/normalize.css'
import '@solana/wallet-adapter-react-ui/styles.css'
import '../styles/global.css'

import type { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'
import { RecoilRoot } from 'recoil'

import { SolanaWalletProvider } from '../components/SolanaWalletProvider'
import { AnalyticsWrapper } from '../hooks/useHeapAnalytics'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <SnackbarProvider
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <SolanaWalletProvider>
          <AnalyticsWrapper>
            <Component {...pageProps} />
          </AnalyticsWrapper>
        </SolanaWalletProvider>
      </SnackbarProvider>
    </RecoilRoot>
  )
}

export default MyApp
