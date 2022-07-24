import { PublicKey } from '@solana/web3.js'
import { css } from 'linaria'
import { FC } from 'react'

import { colors } from '../ui/colors'
import { displayPublicKey } from '../utils/displayPublicKey'
import { Spacers } from './Spacers'
import { ExternalLinkSVG } from './svgs/ExternalLinkSVG'
import { WalletSVG } from './svgs/WalletSVG'

const walletContainer = css`
  display: flex;
  background-color: ${colors.bg.green};
  border: 1px solid ${colors.line.black};
  padding: 16px;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
`
const leftSideWalletContainer = css`
  display: flex;
  flex-direction: column;
`

const leftSideWalletContainerBalance = css`
  display: flex;
  align-items: center;
  font-weight: bold;
  color: ${colors.spot.green};
  line-height: 1.4;
`
const leftSideWalletContainerAddress = css`
  color: ${colors.text.blackSecondary};
  font-weight: medium;
  font-size: 14px;
`

const viewOnSolanaExplorerButton = css`
  display: flex;
  color: ${colors.spot.green};
  border: 1.5px solid ${colors.spot.green};
  border-radius: 8px;
  padding: 10px 16px;
  font-weight: 500;
  text-align: center;
  :hover {
    background-color: ${colors.spot.green};
    color: ${colors.text.whitePrimary};
  }
`

const currentBalanceText = css`
  color: ${colors.text.blackSecondary};
`

export const CurrentWalletBalanceCard: FC<{
  associatedUSDCTokenAccount: PublicKey
  usdcBalance: number
}> = ({ usdcBalance, associatedUSDCTokenAccount }) => {
  return (
    <div className={walletContainer}>
      <div className={leftSideWalletContainer}>
        <div className={leftSideWalletContainerBalance}>
          <div className={currentBalanceText}>Current Balance:</div>
          <Spacers.Horizontal._4px />
          <WalletSVG width={24} />
          <Spacers.Horizontal._4px />${Math.floor(
            usdcBalance,
          ).toLocaleString()}{' '}
          USDC
        </div>
        <Spacers.Vertical._4px />
        <div className={leftSideWalletContainerAddress}>
          {displayPublicKey(associatedUSDCTokenAccount)}
        </div>
      </div>
      <a
        href={`https://explorer.solana.com/address/${associatedUSDCTokenAccount.toBase58()}`}
        target="_blank"
        className={viewOnSolanaExplorerButton}
        rel="noreferrer"
      >
        View on Solana Explorer <Spacers.Horizontal._4px />
        <ExternalLinkSVG style={{ flexShrink: 0 }} width={16} />
      </a>
    </div>
  )
}
