# ahoy-grants Solana program

## Deployed program address

ahoy-grants is deployed on devnet at:
`HqyLxiVTCmsGvQSAddwFMDBimV5nszGBpZSzeJWj3nZ`.

## Requirements

Install `nodejs`, `yarn`, and [Anchor Version Manager
(AVM)](https://book.anchor-lang.com/anchor_references/avm.html).

## Setup

Run `source env` to set the Anchor version in your shell.

Run `yarn` to install dependencies for the Javascript code. Instead of running
`anchor` directly, it is recommended to use `yarn anchor` which will ensure you
are using the version of anchor selected in your environment.

To get the program ID corresponding to `target/deploy/ahoy_grants-keypair.json`
and generate that file if it does not already exist, run `yarn anchor keys
list`. Set the value of `GRANT_PROGRAM_ID` in `env` to the printed program ID.
Run `source env` again to update that env var. Then you are ready to build,
test, and deploy the program.

## Building

Run `yarn build`. The build script will insert the values you sourced into your
environment into the program source files while building.

## Testing

Run `yarn test`.

## Deploying

To deploy to a local validator (ie `solana-test-validator` running on your
machine), after building run `yarn deploy-all`. This will both deploy the
program and a token faucet and mint which is there to simulate USDC when testing
off of mainnet. You can airdrop yourself the corresponding tokens at
[spl-token-faucet](https://spl-token-faucet.com/) by setting the network on that
page to `LOCALNET`.

Alternatively, you can start `solana-test-validator` with the faucet and mint
pre-created. Run

```sh
$ solana-test-validator --bpf-program 4sN8PnN2ki2W4TFXAfzR645FWs8nimmsYeNtxM8RBK6A spl_token_faucet.so --account Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr faucet_mint_Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr.json
```

Then you can just run `yarn deploy` to deploy the grant program.

### Storing the IDL on-chain

```sh
yarn anchor idl init --provider.cluster mainnet -f target/idl/ahoy_grants.json HqyLxiVTCmsGvQSAddwFMDBimV5nszGBpZSzeJWj3nZ
```

after deploying the program for the first time.
