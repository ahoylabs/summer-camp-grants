import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import * as token from "@solana/spl-token";
import { assert } from "chai";

import { AhoyGrants } from "../target/types/ahoy_grants";
import {
  IDL as SplTokenFaucetIDL,
  SplTokenFaucet,
} from "../types/spl_token_faucet";
import { airdrop10Sol, createContentSHA } from "./utils/testingUtils";

const SPL_TOKEN_FAUCET_PROGRAM_ID = new anchor.web3.PublicKey(
  "4sN8PnN2ki2W4TFXAfzR645FWs8nimmsYeNtxM8RBK6A"
);

const provider = anchor.AnchorProvider.env();
// Configure the client to use the local cluster.
anchor.setProvider(provider);

const program = anchor.workspace.AhoyGrants as Program<AhoyGrants>;
const tokenFaucet = new Program<SplTokenFaucet>(
  SplTokenFaucetIDL,
  SPL_TOKEN_FAUCET_PROGRAM_ID,
  provider
);

const grantKeypair = anchor.web3.Keypair.generate();
const submissionKeypair = anchor.web3.Keypair.generate();
const testContentSha256 = createContentSHA("Test grant content");
const testSubmissionSha256 = createContentSHA("Test submission content");

let mintPda: anchor.web3.PublicKey;
let mintPdaBump: number;

const grantCreator = anchor.web3.Keypair.generate();
let grantCreatorATA: anchor.web3.PublicKey;
const submitter = anchor.web3.Keypair.generate();
let submitterATA: anchor.web3.PublicKey;

before("initialize accounts", async () => {
  [mintPda, mintPdaBump] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from(anchor.utils.bytes.utf8.encode("faucet-mint"))],
    tokenFaucet.programId
  );

  grantCreatorATA = await token.getAssociatedTokenAddress(
    mintPda,
    grantCreator.publicKey
  );
  submitterATA = await token.getAssociatedTokenAddress(
    mintPda,
    submitter.publicKey
  );

  // Initialize simulated USDC faucet (which will also create the mint)
  await tokenFaucet.methods
    .initializeFaucet(mintPdaBump)
    .accounts({
      mint: mintPda,
      payer: provider.wallet.publicKey,
    })
    .rpc();

  // Get some SOL for fees and rent
  await airdrop10Sol(grantCreator.publicKey, provider.connection);
  await airdrop10Sol(submitter.publicKey, provider.connection);

  // 42 simulated USDC
  await tokenFaucet.methods
    .airdrop(mintPdaBump, new anchor.BN(42_000_000))
    .accounts({
      destination: grantCreatorATA,
      mint: mintPda,
      payer: grantCreator.publicKey,
      receiver: grantCreator.publicKey,
    })
    .signers([grantCreator])
    .rpc();
});

describe("ahoy-grants", () => {
  it("create", async () => {
    await program.methods
      .create(testContentSha256)
      .accounts({
        grant: grantKeypair.publicKey,
        payer: grantCreator.publicKey,
        wallet: grantCreatorATA,
        walletOwner: grantCreator.publicKey,
      })
      .signers([grantCreator, grantKeypair])
      .rpc();

    const grant = await program.account.grant.fetch(grantKeypair.publicKey);
    console.log("created grant:", grant);
  });

  it("submit", async () => {
    await program.methods
      .submit(testSubmissionSha256)
      .accounts({
        grant: grantKeypair.publicKey,
        mint: mintPda,
        payTo: submitterATA,
        payToOwner: submitter.publicKey,
        payer: submitter.publicKey,
        submission: submissionKeypair.publicKey,
      })
      .signers([submitter, submissionKeypair])
      .rpc();

    const submission = await program.account.submission.fetch(
      submissionKeypair.publicKey
    );
    console.log("created submission:", submission);
  });

  it("pay submission", async () => {
    await program.methods
      .paySubmission(new anchor.BN(12_000_000))
      .accounts({
        grant: grantKeypair.publicKey,
        payTo: submitterATA,
        submission: submissionKeypair.publicKey,
        wallet: grantCreatorATA,
        walletOwner: grantCreator.publicKey,
      })
      .signers([grantCreator])
      .rpc();

    const submission = await program.account.submission.fetch(
      submissionKeypair.publicKey
    );
    console.log("paid submission:", submission);
    assert.equal(
      submission.amountWon.toString(),
      new anchor.BN(12_000_000).toString()
    );

    const submitterAccount = await token.getAccount(
      provider.connection,
      submitterATA
    );
    assert.equal(submitterAccount.amount, BigInt(12_000_000));

    const grantCreatorAccount = await token.getAccount(
      provider.connection,
      grantCreatorATA
    );
    assert.equal(grantCreatorAccount.amount, BigInt(30_000_000));
  });
});
