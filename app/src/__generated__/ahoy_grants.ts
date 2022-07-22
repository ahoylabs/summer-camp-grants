export type AhoyGrants = {
  version: '0.1.0'
  name: 'ahoy_grants'
  instructions: [
    {
      name: 'create'
      accounts: [
        {
          name: 'grant'
          isMut: true
          isSigner: true
        },
        {
          name: 'wallet'
          isMut: false
          isSigner: false
        },
        {
          name: 'walletOwner'
          isMut: false
          isSigner: true
        },
        {
          name: 'payer'
          isMut: true
          isSigner: true
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'contentSha256'
          type: {
            array: ['u8', 32]
          }
        },
      ]
    },
  ]
  accounts: [
    {
      name: 'grant'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'contentSha256'
            type: {
              array: ['u8', 32]
            }
          },
          {
            name: 'wallet'
            type: 'publicKey'
          },
          {
            name: 'initialAmount'
            type: 'u64'
          },
        ]
      }
    },
  ]
}

export const IDL: AhoyGrants = {
  version: '0.1.0',
  name: 'ahoy_grants',
  instructions: [
    {
      name: 'create',
      accounts: [
        {
          name: 'grant',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'wallet',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'walletOwner',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'contentSha256',
          type: {
            array: ['u8', 32],
          },
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'grant',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'contentSha256',
            type: {
              array: ['u8', 32],
            },
          },
          {
            name: 'wallet',
            type: 'publicKey',
          },
          {
            name: 'initialAmount',
            type: 'u64',
          },
        ],
      },
    },
  ],
}
