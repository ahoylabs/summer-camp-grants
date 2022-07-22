mod consts;

use anchor_lang::prelude::*;
use anchor_spl::token::TokenAccount;
use solana_security_txt::security_txt;

declare_id!("1212121212121212121212121212121212121212121");

// This is particularly nice to include since explorer.solana.com picks it up and shows the info in
// the UI.
security_txt! {
    name: "Ahoy Grants",
    project_url: "https://summercamp.ahoy.fund",
    contacts: "email:security@ahoy.fund",
    policy: "https://ahoy.fund/security"
}

#[program]
pub mod ahoy_grants {
    use super::*;

    // Create a new grant
    pub fn create(ctx: Context<Create>, content_sha256: [u8; 32]) -> Result<()> {
        let grant = &mut ctx.accounts.grant;
        let wallet = &ctx.accounts.wallet;

        grant.content_sha256 = content_sha256;
        grant.wallet = wallet.key();
        grant.initial_amount = wallet.amount;
        let clock = Clock::get()?;
        grant.created_at = clock.unix_timestamp;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init, payer = payer, space = Grant::LEN)]
    pub grant: Account<'info, Grant>,
    #[account(token::mint = consts::USDC_MINT_ADDR, token::authority = wallet_owner)]
    pub wallet: Account<'info, TokenAccount>,
    // Make the wallet owner sign to prove that they have control of the funds wallet.
    pub wallet_owner: Signer<'info>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(Default)]
pub struct Grant {
    // Hash of the content
    pub content_sha256: [u8; 32],
    // A USDC_MINT_ADDR token account which contains the grant funds intended to be distributed to
    // winning submissions.
    pub wallet: Pubkey,
    // Balance (amount) of wallet when the grant was initially created.
    pub initial_amount: u64,
    pub created_at: i64,
}

impl Grant {
    const LEN: usize = 8 // Anchor discriminator
        + 32 // content_sha256
        + 32 // wallet
        + 8 // initial_amount
        + 8; // created_at
}
