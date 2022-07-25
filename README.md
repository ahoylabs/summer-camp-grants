# Ahoy Grants

A Solana program and UI for creating USDC-denominated Grants with transparent on-chain payouts. 

### Grant Account

Each Grant contains:
- public key of the USDC token account holding the grant funds 
- CID (content identifier) of an IPFS file containing company information, description, and other metadata

On creation, the Grant creator proves control of the USDC account specified. **They still maintain unilateral control of how / when / to-whom the funds are distributed, if at all, to winnng submissions.** 

### Submission Account

Each Submission contains:
- public key of the USDC token account where grant funds should be payed (if the submission is selected as a winner)
- CID of an IPFS file containing the submitter's Github repo, project description, and contact information

The Grant creator can choose to pay out any number of submissions via the UI. 
