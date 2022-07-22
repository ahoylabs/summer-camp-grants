export type SplTokenFaucet = {
  instructions: [
    {
      accounts: [
        {
          isMut: true
          isSigner: false
          name: 'mint'
        },
        {
          isMut: true
          isSigner: true
          name: 'payer'
        },
        {
          isMut: false
          isSigner: false
          name: 'systemProgram'
        },
        {
          isMut: false
          isSigner: false
          name: 'tokenProgram'
        },
        {
          isMut: false
          isSigner: false
          name: 'rent'
        },
      ]
      args: [
        {
          name: 'mintBump'
          type: 'u8'
        },
      ]
      name: 'initializeFaucet'
    },
    {
      accounts: [
        {
          isMut: true
          isSigner: false
          name: 'mint'
        },
        {
          isMut: true
          isSigner: false
          name: 'destination'
        },
        {
          isMut: true
          isSigner: true
          name: 'payer'
        },
        {
          isMut: false
          isSigner: false
          name: 'receiver'
        },
        {
          isMut: false
          isSigner: false
          name: 'systemProgram'
        },
        {
          isMut: false
          isSigner: false
          name: 'tokenProgram'
        },
        {
          isMut: false
          isSigner: false
          name: 'associatedTokenProgram'
        },
        {
          isMut: false
          isSigner: false
          name: 'rent'
        },
      ]
      args: [
        {
          name: 'mintBump'
          type: 'u8'
        },
        {
          name: 'amount'
          type: 'u64'
        },
      ]
      name: 'airdrop'
    },
  ]
  name: 'spl_token_faucet'
  version: '0.0.0'
}

export const IDL: SplTokenFaucet = {
  instructions: [
    {
      accounts: [
        {
          isMut: true,
          isSigner: false,
          name: 'mint',
        },
        {
          isMut: true,
          isSigner: true,
          name: 'payer',
        },
        {
          isMut: false,
          isSigner: false,
          name: 'systemProgram',
        },
        {
          isMut: false,
          isSigner: false,
          name: 'tokenProgram',
        },
        {
          isMut: false,
          isSigner: false,
          name: 'rent',
        },
      ],
      args: [
        {
          name: 'mintBump',
          type: 'u8',
        },
      ],
      name: 'initializeFaucet',
    },
    {
      accounts: [
        {
          isMut: true,
          isSigner: false,
          name: 'mint',
        },
        {
          isMut: true,
          isSigner: false,
          name: 'destination',
        },
        {
          isMut: true,
          isSigner: true,
          name: 'payer',
        },
        {
          isMut: false,
          isSigner: false,
          name: 'receiver',
        },
        {
          isMut: false,
          isSigner: false,
          name: 'systemProgram',
        },
        {
          isMut: false,
          isSigner: false,
          name: 'tokenProgram',
        },
        {
          isMut: false,
          isSigner: false,
          name: 'associatedTokenProgram',
        },
        {
          isMut: false,
          isSigner: false,
          name: 'rent',
        },
      ],
      args: [
        {
          name: 'mintBump',
          type: 'u8',
        },
        {
          name: 'amount',
          type: 'u64',
        },
      ],
      name: 'airdrop',
    },
  ],
  name: 'spl_token_faucet',
  version: '0.0.0',
}
