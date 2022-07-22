export type ClusterType = 'mainnet' | 'testnet' | 'devnet' | 'localnet'
export type ENVTypes = {
  app: {
    // public vars for web
    NEXT_PUBLIC_HEAP_ANALYTICS_KEY: string
    NEXT_PUBLIC_HEAP_ENABLED: 'true' | 'false'
    NEXT_PUBLIC_PROGRAM_ID: string
    NEXT_PUBLIC_SENTRY_DSN: string
    NEXT_PUBLIC_SENTRY_ENABLED: 'true' | 'false'
    NEXT_PUBLIC_SOLANA_CLUSTER: ClusterType
    NEXT_PUBLIC_USDC_MINT_ADDR: string
    /** private for Pinata server */
    PINATA_PRIVATE_API_KEY: string
    PINATA_PUBLIC_API_KEY: string
  }
}
