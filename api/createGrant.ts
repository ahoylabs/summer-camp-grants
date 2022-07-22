import { Program } from "@project-serum/anchor";

interface Args {
  program: Program;
  ipfsCID: string;
}

export const createGrant = ({}: Args): Promise<string> => {
  return Promise.resolve("here");
};
