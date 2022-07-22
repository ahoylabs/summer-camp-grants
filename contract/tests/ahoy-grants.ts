import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { AhoyGrants } from "../target/types/ahoy_grants";
import {
  SplTokenFaucet,
  IDL as SplTokenFaucetIDL,
} from "../types/spl_token_faucet";
import * as token from "@solana/spl-token";
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { airdrop10Sol, createContentSHA } from "./utils/testingUtils";

const SPL_TOKEN_FAUCET_PROGRAM_ID = new anchor.web3.PublicKey(
  "4sN8PnN2ki2W4TFXAfzR645FWs8nimmsYeNtxM8RBK6A"
);

const provider = anchor.AnchorProvider.env();
// Configure the client to use the local cluster.
anchor.setProvider(provider);

console.log("SplTokenFaucetIDL", SplTokenFaucetIDL);

const program = anchor.workspace.AhoyGrants as Program<AhoyGrants>;
const tokenFaucet = new Program<SplTokenFaucet>(
  SplTokenFaucetIDL,
  SPL_TOKEN_FAUCET_PROGRAM_ID,
  provider
);

const grantKeypair = anchor.web3.Keypair.generate();
const testContentSha256 = createContentSHA("Test grant content");

let mintPda: anchor.web3.PublicKey;
let mintPdaBump: number;

const grantCreator = anchor.web3.Keypair.generate();
let grantCreatorATA: anchor.web3.PublicKey;

before("initialize accounts", async () => {
  [mintPda, mintPdaBump] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from(anchor.utils.bytes.utf8.encode("faucet-mint"))],
    tokenFaucet.programId
  );

  grantCreatorATA = await token.getAssociatedTokenAddress(
    mintPda,
    grantCreator.publicKey
  );

  // Initialize simulated USDC faucet (which will also create the mint)
  await tokenFaucet.methods
    .initializeFaucet(mintPdaBump)
    .accounts({
      mint: mintPda,
      payer: provider.publicKey,
    })
    .rpc();

  // Get some SOL for fees and rent
  await airdrop10Sol(grantCreator.publicKey, provider.connection);

  // 42 simulated USDC
  await tokenFaucet.methods
    .airdrop(mintPdaBump, new anchor.BN(42_000_000))
    .accounts({
      receiver: grantCreator.publicKey,
      payer: grantCreator.publicKey,
      mint: mintPda,
      destination: grantCreatorATA,
      tokenProgram: TOKEN_PROGRAM_ID,
      associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
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
        wallet: grantCreatorATA,
        walletOwner: grantCreator.publicKey,
        payer: grantCreator.publicKey,
      })
      .signers([grantCreator, grantKeypair])
      .rpc();

    const grant = await program.account.grant.fetch(grantKeypair.publicKey);
    console.log("created grant:", grant);
  });
});
