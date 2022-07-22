use solana_program::{pubkey, pubkey::Pubkey};

// This is parameterized to allow testing on localnet, devnet, etc. On mainnet the value should
// always be the USDC mint address EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v.
pub static USDC_MINT_ADDR: Pubkey = pubkey!("1313131313131313131313131313131313131313131");
