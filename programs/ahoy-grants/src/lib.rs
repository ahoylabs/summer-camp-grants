use anchor_lang::prelude::*;
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

    // Create a new crand.
    pub fn create(ctx: Context<Create>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create {
}
