import pinataSDK, { PinataPinResponse } from '@pinata/sdk'
import axios from 'axios'
import { NextApiHandler } from 'next'

const pinata = pinataSDK(
  process.env.PINATA_PUBLIC_API_KEY,
  process.env.PINATA_PRIVATE_API_KEY,
)

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json('{}')

  try {
    const result: PinataPinResponse = await pinata.pinJSONToIPFS(req.body)

    const validPinCheckRes = await axios.get(
      `https://ipfs.ahoy.fund/ipfs/${result.IpfsHash}`,
    )
    if (
      validPinCheckRes.status != 200 ||
      JSON.stringify(validPinCheckRes.data) !== JSON.stringify(req.body)
    )
      throw new Error('Could not retrieve JSON from IPFS after pinning.')

    return res.status(200).json(result)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: error })
  }
}

export default handler
