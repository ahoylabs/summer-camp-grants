export interface PinataResponse {
  /** This is the IPFS multi-hash provided back for your content */
  IpfsHash: string
  /** This is how large (in bytes) the content you just pinned is */
  PinSize: number
  /** This is the timestamp for your content pinning (represented in ISO 8601 format) */
  Timestamp: string
}

export interface IPFSData {
  pinataContent: GrantForIPFS
  pinataMetadata: {
    name: 'grant' | 'submission'
  }
}

export interface GrantForIPFS {
  companyName: string
  description: string
  imageCID: string | null
  twitterSlug: string
  websiteURL: string
}

export interface SubmissionForIPFS {
  contact: string
  description: string
  githubURL: string
  imageCID: string | null
  title: string
}
