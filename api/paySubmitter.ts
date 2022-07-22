import { Program } from "@project-serum/anchor";

interface Args {
  program: Program;
  payeePubkey: string;
  grantAccount: string;
  submissionAccount: string;
  amountWon: number;
}

export const paySubmitter = () => {};
