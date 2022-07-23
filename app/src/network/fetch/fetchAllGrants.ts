import { getAccount } from '@solana/spl-token'
import { AnchorWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import axios, { AxiosResponse } from 'axios'

import { urls } from '../../constants/urls'
import { connection } from '../connection'
import { getGrantProgram } from '../getGrantProgram'
import { contentSha256ToIpfsCID } from '../ipfs/convertContentSha256'
import { GrantForIPFS } from '../ipfs/types'
import { formatGrant, Grant } from '../types/models/Grant'
import { ContentSHA256 } from './../types/ContentSHA256'

interface Args {
  wallet: AnchorWallet
}

export const fetchAllGrants = async ({ wallet }: Args) => {
  const program = getGrantProgram(wallet, connection)
  const rawGrants = await program.account.grant.all()
  const grants: Grant[] = []
  for (const g of rawGrants) {
    // definitely not ideal to be firing off this many network calls,
    // but for the time being we won't have that many grants...
    const res: AxiosResponse = await axios.get(
      urls.ipfs(
        contentSha256ToIpfsCID(g.account.contentSha256 as ContentSHA256),
      ),
    )
    const ata = await getAccount(connection, new PublicKey(g.account.wallet))
    const owner = ata.owner
    const grant = formatGrant(
      g.publicKey,
      g.account,
      res.data as GrantForIPFS,
      owner,
    )
    grants.push(grant)
  }
  return grants
}
