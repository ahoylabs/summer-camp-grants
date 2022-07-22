import { bs58 } from '@project-serum/anchor/dist/cjs/utils/bytes'

import { ContentSHA256 } from '../types/ContentSHA256'

export const contentSha256ToIpfsCID = (sha256: ContentSHA256): string => {
  return bs58.encode(
    Buffer.concat([Buffer.from([0x12, 0x20]), Buffer.from(sha256)]),
  )
}

export const ipfsCIDToContentSha256 = (ipfsHash: string): ContentSHA256 => {
  // our ipfs hashes from the api return in the form:
  // `QmXxm3GuAsTCTzx3bV6Cw64NG9hKGusXop6aXpggYjz2yh`
  // the first two bits specifies the type and length (which is static), so we can remove
  return [...bs58.decode(ipfsHash).subarray(2)] as ContentSHA256
}
