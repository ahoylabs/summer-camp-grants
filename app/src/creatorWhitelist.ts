type WhitelistItem = {
  company: string
  publicKey: string
}

/** If you want to be added to the whitelist,
 * please open a PR with an addition to this array
 */
export const creatorWhitelist: WhitelistItem[] = [
  {
    company: 'Ahoy',
    publicKey: '6iNaY6hQ2F9dUkXKTP8XiDcUUBGkWAp2rSuW8yVxTeiD',
  },
  // {
  //   company: 'Your Company',
  //   publicKey: 'Your Public Key'
  // }
]
