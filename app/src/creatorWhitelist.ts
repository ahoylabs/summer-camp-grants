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
  {
    company: 'Tulip',
    publicKey: 'DcE1QfuxsV9eoMydXXF7hBadHBRA1vPFqCWvAUeP9ZGB',
  },
  // {
  //   company: 'Your Company',
  //   publicKey: 'Your Public Key'
  // }
]
