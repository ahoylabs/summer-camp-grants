import type { PublicKey } from '@solana/web3.js'

export const urls = {
  home: '/',
  grant: (pubKey: PublicKey | string) =>
    `/grant/${typeof pubKey === 'string' ? pubKey : pubKey.toBase58()}`,
  createGrant: '/grant/create',

  external: {
    twitter: 'https://twitter.com/ahoy_labs',
    newsletter: 'https://newsletter.ahoy.fund',
  },

  api: {
    pinJSONToIPFS: '/api/ipfs/pinJSONToIPFS',
    pinFileToIPFS: '/api/ipfs/pinFileToIPFS',
  },
  socialIntent: {
    twitter: (text: string) => {
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text,
      )}&original_referer=https://ahoy.fund`
    },
  },
}
