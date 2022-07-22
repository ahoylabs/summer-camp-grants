import { Connection, PublicKey } from "@solana/web3.js";
import { createHash } from "crypto";
import { ContentSHA256 } from "./types/ContentSHA256";

export const airdrop10Sol = async (
  publicKey: PublicKey,
  connection: Connection
) => {
  await connection.confirmTransaction(
    await connection.requestAirdrop(publicKey, 10_000_000_000),
    "confirmed"
  );
};

export const createContentSHA = (content: string) => {
  return [
    ...createHash("sha256").update(content, "utf8").digest(),
  ] as ContentSHA256;
};
