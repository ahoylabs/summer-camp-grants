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
    publicKey: '29gQjvnnzD25sWANYyMvG87uDWp3K1h1zgwyYqpdjM6s',
  },
  {
    company: 'Tulip',
    publicKey: '5hukfNCRxc5fF5wA6x8JCenmAAZCTq29TgGdZispWTQr',
  },
  {
    company: 'marginfi',
    publicKey: '24sJKpUSabLMyv5Z4xdtMPe1spTj9r1t4JSa9PuHcZmH',
  },
  // {
  //   company: 'Your Company',
  //   publicKey: 'Your Public Key'
  // }
]
