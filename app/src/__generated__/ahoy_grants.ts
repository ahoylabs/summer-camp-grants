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
    {
      name: 'submit'
      accounts: [
        {
          name: 'grant'
          isMut: false
          isSigner: false
        },
        {
          name: 'submission'
          isMut: true
          isSigner: true
        },
        {
          name: 'mint'
          isMut: false
          isSigner: false
        },
        {
          name: 'payTo'
          isMut: true
          isSigner: false
        },
        {
          name: 'payToOwner'
          isMut: false
          isSigner: false
        },
        {
          name: 'payer'
          isMut: true
          isSigner: true
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'associatedTokenProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'systemProgram'
          isMut: false
          isSigner: false
        },
        {
          name: 'rent'
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
    {
      name: 'paySubmission'
      accounts: [
        {
          name: 'grant'
          isMut: false
          isSigner: false
        },
        {
          name: 'submission'
          isMut: true
          isSigner: false
        },
        {
          name: 'wallet'
          isMut: true
          isSigner: false
        },
        {
          name: 'walletOwner'
          isMut: false
          isSigner: true
        },
        {
          name: 'payTo'
          isMut: true
          isSigner: false
        },
        {
          name: 'tokenProgram'
          isMut: false
          isSigner: false
        },
      ]
      args: [
        {
          name: 'amount'
          type: 'u64'
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
          {
            name: 'createdAt'
            type: 'i64'
          },
        ]
      }
    },
    {
      name: 'submission'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'grant'
            type: 'publicKey'
          },
          {
            name: 'contentSha256'
            type: {
              array: ['u8', 32]
            }
          },
          {
            name: 'payTo'
            type: 'publicKey'
          },
          {
            name: 'amountWon'
            type: 'u64'
          },
          {
            name: 'submittedAt'
            type: 'i64'
          },
          {
            name: 'wonAt'
            type: 'i64'
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
    {
      name: 'submit',
      accounts: [
        {
          name: 'grant',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'submission',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'mint',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'payTo',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'payToOwner',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'payer',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'associatedTokenProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'rent',
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
    {
      name: 'paySubmission',
      accounts: [
        {
          name: 'grant',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'submission',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'wallet',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'walletOwner',
          isMut: false,
          isSigner: true,
        },
        {
          name: 'payTo',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'tokenProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'amount',
          type: 'u64',
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
          {
            name: 'createdAt',
            type: 'i64',
          },
        ],
      },
    },
    {
      name: 'submission',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'grant',
            type: 'publicKey',
          },
          {
            name: 'contentSha256',
            type: {
              array: ['u8', 32],
            },
          },
          {
            name: 'payTo',
            type: 'publicKey',
          },
          {
            name: 'amountWon',
            type: 'u64',
          },
          {
            name: 'submittedAt',
            type: 'i64',
          },
          {
            name: 'wonAt',
            type: 'i64',
          },
        ],
      },
    },
  ],
}
