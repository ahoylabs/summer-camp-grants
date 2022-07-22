import { AnchorWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import axios, { AxiosResponse } from 'axios'

import { urls } from '../../constants/urls'
import { connection } from '../connection'
import { getGrantProgram } from '../getGrantProgram'
import { contentSha256ToIpfsCID } from '../ipfs/convertContentSha256'
import { GrantForIPFS } from '../ipfs/types'
import { ContentSHA256 } from '../types/ContentSHA256'
import { formatGrant } from '../types/models/Grant'

interface Args {
  grantPubkey: PublicKey
  wallet: AnchorWallet
}

export const fetchGrantWithSubmissions = async ({
  grantPubkey,
  wallet,
}: Args) => {
  const program = getGrantProgram(wallet, connection)
  const grantAccount = await program.account.grant.fetch(grantPubkey)
  const res: AxiosResponse = await axios.get(
    urls.ipfs(
      contentSha256ToIpfsCID(grantAccount.contentSha256 as ContentSHA256),
    ),
  )
  const ipfsGrant: GrantForIPFS = res.data
  // TODO image
  // if (ipfsGrant.imageCID) {
  //   const imageRes: AxiosResponse = await axios.get(
  //     urls.ipfs(ipfsGrant.imageCID),
  //   )
  //   const imageFile = imageRes.data
  // }
  const grant = formatGrant(grantPubkey, grantAccount, ipfsGrant)
  // const submissions = await fetchAllSubmissionsForGrant({
  //   grantAccount: grantPubkey,
  //   wallet,
  // })
  return grant
}
