import type { PublicKey } from '@solana/web3.js'

export const urls = {
  home: '/',
  grant: (pubKey: PublicKey | string) =>
    `/grant/${typeof pubKey === 'string' ? pubKey : pubKey.toBase58()}`,
  createGrant: '/grant/create',
  paySubmission: (grantUID: string, submissionID: string) =>
    `/grant/${grantUID}/${submissionID}`,

  external: {
    twitter: 'https://twitter.com/intent/follow?screen_name=ahoy_labs',
    newsletter: 'https://newsletter.ahoy.fund',
  },

  terms: 'https://ahoy.fund/terms',
  privacy: 'https://ahoy.fund/privacy',

  api: {
    pinJSONToIPFS: '/api/pinJSONToIPFS',
    pinFileToIPFS: '/api/pinFileToIPFS',
  },

  ipfs: (cid: string) => `https://ipfs.ahoy.fund/ipfs/${cid}`,

  socialIntent: {
    twitter: (text: string) => {
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text,
      )}&original_referer=https://ahoy.fund`
    },
  },

  image: (imageIpfsCID: string, width: number) =>
    `https://res.cloudinary.com/ahoy-labs/image/upload/h_${width},w_${width}/bounty/${imageIpfsCID}`,
}
