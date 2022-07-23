# Ahoy Grants

A Solana program and UI for creating USDC-denominated Grants with transparent on-chain payouts. 

### Grant

Each Grant is an account that contains (1) the pubkey of the USDC mint token account holding funds intended for distribution to winning submissions, and (2) the CID (content identifier) of an IPFS file containing company information, description, and other metadata.

On creation, the Grant creator proves control of the USDC account specified in the account. **They still maintain unilateral control of how / when / to-whom the funds are distributed, if at all.** 

### Submission

Each Submission is an account that contains (1) the pubkey of the USDC mint token account where grant funds will be payed if the submission is selected as a winner, and (2) the CID of an IPFS file containing the submitter's Github repo, project description, and contact information.

The Grant creator can choose to pay out any number of submissions. 
