import { ENVTypes } from './envTypes'

export const envVars: ENVTypes = {
  app: {
    NEXT_PUBLIC_HEAP_ANALYTICS_KEY: '',
    NEXT_PUBLIC_HEAP_ENABLED: 'false',
    NEXT_PUBLIC_PROGRAM_ID: '',
    NEXT_PUBLIC_SENTRY_DSN: '',
    NEXT_PUBLIC_SOLANA_CLUSTER: 'localnet',
    NEXT_PUBLIC_SENTRY_ENABLED: 'false',
    NEXT_PUBLIC_USDC_MINT_ADDR: '1313131313131313131313131313131313131313131',
    /** private for Pinata server */
    PINATA_PRIVATE_API_KEY: '',
    PINATA_PUBLIC_API_KEY: '',
  },
}
