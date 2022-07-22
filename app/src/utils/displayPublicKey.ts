import { PublicKey } from '@solana/web3.js'

export const displayPublicKey = (pubKey: PublicKey | string) => {
  const pubKeyStr = typeof pubKey === 'string' ? pubKey : pubKey.toBase58()
  const start = pubKeyStr.substring(0, 4)
  const end = pubKeyStr.substring(pubKeyStr.length - 4)

  return `${start}...${end}`
}
