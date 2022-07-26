import axios from 'axios'

import { urls } from '../../constants/urls'
import { ContentSHA256 } from '../types/ContentSHA256'
import { ipfsCIDToContentSha256 } from './convertContentSha256'
import { GrantForIPFS, PinataResponse, SubmissionForIPFS } from './types'

export const pinFileToIPFS = async (
  imageFile: File | null,
): Promise<string | null> => {
  if (!imageFile) return Promise.resolve(null)
  const formData = new FormData()
  formData.append('file', imageFile)
  const res = await axios.post(urls.api.pinFileToIPFS, formData)
  const data: PinataResponse = await res.data
  return data.IpfsHash
}

export const pinGrantToIPFS = async (
  companyName: string,
  description: string,
  twitterSlug: string,
  websiteURL: string,
  imageFile: File | null,
): Promise<ContentSHA256> => {
  const imageIpfsCID: string | null = await pinFileToIPFS(imageFile)
  const ipfsObj: GrantForIPFS = {
    companyName,
    description,
    imageCID: imageIpfsCID,
    twitterSlug,
    websiteURL,
  }

  const res = await axios.post(urls.api.pinJSONToIPFS, ipfsObj)
  const data: PinataResponse = await res.data
  return ipfsCIDToContentSha256(data.IpfsHash)
}

export const pinSubmissionToIPFS = async (
  contact: string,
  description: string,
  githubURL: string,
  title: string,
  imageFile: File | null,
): Promise<ContentSHA256> => {
  const imageIpfsCID: string | null = await pinFileToIPFS(imageFile)
  const ipfsObj: SubmissionForIPFS = {
    contact,
    description,
    githubURL,
    title,
    imageCID: imageIpfsCID,
  }
  const res = await axios.post(urls.api.pinJSONToIPFS, ipfsObj)
  const data: PinataResponse = await res.data
  return ipfsCIDToContentSha256(data.IpfsHash)
}
