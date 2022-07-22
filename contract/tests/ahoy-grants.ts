import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { AhoyGrants } from "../target/types/ahoy_grants";

describe("ahoy-grants", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.AhoyGrants as Program<AhoyGrants>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
