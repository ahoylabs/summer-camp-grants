import pinataSDK, { PinataPinResponse } from '@pinata/sdk'
import axios from 'axios'
import { File, IncomingForm } from 'formidable'
import fs from 'fs'
import { NextApiHandler } from 'next'

const pinata = pinataSDK(
  process.env.PINATA_PUBLIC_API_KEY,
  process.env.PINATA_PRIVATE_API_KEY,
)

export const config = {
  api: {
    bodyParser: false,
  },
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json('{}')

  const fileData: { data: File | null; error: any } = await new Promise(
    (resolve) => {
      const form = new IncomingForm()
      form.parse(req, (err, _, files) => {
        if (err) return resolve({ data: null, error: err })
        resolve({ data: files.file as File, error: null })
      })
    },
  )

  if (fileData.error != null || !fileData.data?.filepath)
    return res.status(500).json({})

  const path = fileData.data.filepath
  const contents = await fs.createReadStream(path)

  try {
    const result: PinataPinResponse = await pinata.pinFileToIPFS(contents)

    const validPinCheckRes = await axios.get(
      `https://ipfs.ahoy.fund/ipfs/${result.IpfsHash}`,
    )
    if (validPinCheckRes.status != 200)
      throw new Error('Could not retrieve File from IPFS after pinning.')

    return res.status(200).json(result)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: error })
  }
}

export default handler
