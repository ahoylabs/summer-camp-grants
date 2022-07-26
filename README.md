[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

<center><h1>Ahoy Grants</h1>

[![Solana Summer Camp Hackaton](https://raw.githubusercontent.com/ahoylabs/ahoy-grants/main/app/public/og_generic.png)](https://summercamp.ahoy.fund)

</center>

A Solana program and interface for on-chain USDC grants. Built for the 2022 Solana Summer Camp Hackathon as a transparent mechanism for creating and awarding ecosystem grants.

The grant creator designates their USDC account as the source of funds and proves ownership, but still maintains unilateral control over how / when the funds are distributed (if at all). Any number of applicants can submit their project for consideration.

Creation, submission, and payouts via the interface are direct RPC requests to the on-chain program. Metadata for grants and submissions are stored on IPFS.

## Add a Grant

In a effort to reduce spam, we have a whitelist of creators.

In order to be added to the whitelist, create a PR and add your wallet as an entry to [`creatorWhitelist.ts`](https://github.com/ahoylabs/summer-camp-grants/blob/main/app/creatorWhitelist.ts)

Once on the whitelist, you can visit [summercamp.ahoy.fund/grant/create](https://summercamp.ahoy.fund/grant/create) to create a grant

If you need help, please contact us!

## Questions?

Email us at `contact@ahoy.fund` or DM on Twitter [@ahoy_fund](https://twitter.com/ahoy_fund).

## License

Apache 2.0 © Ahoy Labs, Inc.
