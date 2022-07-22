mod consts;

use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token,
    token::{Mint, Token, TokenAccount, Transfer},
};
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

        msg!(
            "Created grant {:?} by: {:?}",
            grant.key(),
            ctx.accounts.wallet_owner.key()
        );

        Ok(())
    }

    // Create a submission entry for a given grant
    pub fn submit(ctx: Context<Submit>, content_sha256: [u8; 32]) -> Result<()> {
        let submission = &mut ctx.accounts.submission;
        submission.grant = ctx.accounts.grant.key();
        submission.content_sha256 = content_sha256;
        submission.pay_to = ctx.accounts.pay_to.key();
        submission.amount_won = 0;
        let clock = Clock::get()?;
        submission.submitted_at = clock.unix_timestamp;

        msg!(
            "submission: {:?} pay_to_owner {:?} for grant {:?}",
            submission.key(),
            ctx.accounts.pay_to_owner.key(),
            ctx.accounts.grant.key()
        );

        Ok(())
    }

    // Pay a submission for a grant. ie select a submission as having won all or part of the grant.
    pub fn pay_submission(ctx: Context<PaySubmission>, amount: u64) -> Result<()> {
        let submission = &mut ctx.accounts.submission;

        let transfer_cpi_accounts = Transfer {
            from: ctx.accounts.wallet.to_account_info(),
            to: ctx.accounts.pay_to.to_account_info(),
            authority: ctx.accounts.wallet_owner.to_account_info(),
        };
        let transfer_cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            transfer_cpi_accounts,
        );
        token::transfer(transfer_cpi_ctx, amount)?;

        submission.amount_won += amount;

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

#[derive(Accounts)]
pub struct Submit<'info> {
    pub grant: Account<'info, Grant>,
    #[account(init, payer = payer, space = Submission::LEN)]
    pub submission: Account<'info, Submission>,
    #[account(address = consts::USDC_MINT_ADDR)]
    pub mint: Account<'info, Mint>,
    #[account(
        init,
        payer = payer,
        associated_token::mint = mint,
        associated_token::authority = pay_to_owner,
    )]
    pub pay_to: Account<'info, TokenAccount>,
    /// CHECK: this is just included so we can automatically create an associated token account for
    /// the submitter if they do not already have one.
    pub pay_to_owner: UncheckedAccount<'info>,
    #[account(mut)]
    pub payer: Signer<'info>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct PaySubmission<'info> {
    #[account(has_one = wallet)]
    pub grant: Account<'info, Grant>,
    #[account(mut, has_one = grant, has_one = pay_to)]
    pub submission: Account<'info, Submission>,
    #[account(
        mut,
        token::mint = consts::USDC_MINT_ADDR,
        token::authority = wallet_owner,
    )]
    pub wallet: Account<'info, TokenAccount>,
    pub wallet_owner: Signer<'info>,
    #[account(mut, token::mint = consts::USDC_MINT_ADDR)]
    pub pay_to: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
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

#[account]
#[derive(Default)]
pub struct Submission {
    // Grant this submission is target at
    pub grant: Pubkey,
    // Hash of the submission content
    pub content_sha256: [u8; 32],
    // USDC_MINT_ADDR that grant funds will be payed to if this submission is selected as a winner.
    pub pay_to: Pubkey,
    // Record of amount this submission has won from the grant. 0 if they have not (yet) won
    // anything.
    pub amount_won: u64,
    pub submitted_at: i64,
}

impl Submission {
    const LEN: usize = 8 // Anchor discriminator
        + 32 // grant
        + 32 // content_sha256
        + 32 // pay_to
        + 8 // amount_won
        + 8; // submitted_at
}
