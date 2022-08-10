import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";

import {
  IDL as SplTokenFaucetIDL,
  SplTokenFaucet,
} from "../types/spl_token_faucet";

const SPL_TOKEN_FAUCET_PROGRAM_ID = new anchor.web3.PublicKey(
  "4sN8PnN2ki2W4TFXAfzR645FWs8nimmsYeNtxM8RBK6A"
);

const initFaucet = async (): Promise<void> => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const tokenFaucet = new Program<SplTokenFaucet>(
    SplTokenFaucetIDL,
    SPL_TOKEN_FAUCET_PROGRAM_ID,
    provider
  );

  const [mintPda, mintPdaBump] = await anchor.web3.PublicKey.findProgramAddress(
    [Buffer.from(anchor.utils.bytes.utf8.encode("faucet-mint"))],
    tokenFaucet.programId
  );

  // Initialize simulated USDC faucet (this creates the mint)
  await tokenFaucet.methods
    .initializeFaucet(mintPdaBump)
    .accounts({
      mint: mintPda,
      payer: provider.wallet.publicKey,
    })
    .rpc();

  console.log(`Created mint: ${mintPda.toBase58()}`);
  console.log(`Faucet program ID: ${SPL_TOKEN_FAUCET_PROGRAM_ID.toBase58()}`);
};

initFaucet();
