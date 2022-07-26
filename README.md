[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

# Ahoy Grants

A Solana program and interface for on-chain USDC grants. Built for the 2022 Solana Summer Camp Hackathon as a transparent mechanism for creating and awarding ecosystem grants. 

The grant creator designates their USDC account as the source of funds and proves ownership, but still maintains unilateral control over how / when the funds are distributed (if at all). Any number of applicants can submit their project for consideration.

Creation, submission, and payouts via the interface are direct RPC requests to the on-chain program. Metadata for grants and submissions are stored on IPFS.


**In order to prevent spam, there is a hardcoded whitelist for creating new grants via the interface. To be added, please DM us on Twitter `@ahoy_fund` and we will open a PR with your wallet address.**

