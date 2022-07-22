import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { css } from 'linaria'
import Link from 'next/link'
import { FC } from 'react'

import { urls } from '../constants/urls'
import { colors } from '../ui/colors'
import { Spacers } from './Spacers'
import { AhoyLogoSVG } from './svgs/AhoyLogoSVG'
import { SolanaLogoSVG } from './svgs/SolanaLogoSVG'

// 800 + 24px of padding on each side
const PAGE_WIDTH = 848

const pageWrap = css`
  width: 100%;
  min-height: 100vh;
  background-color: ${colors.bg.white};
  overflow-x: hidden;
`

const header = css`
  position: fixed;
  top: 0px;
  width: 100%;
  background: linear-gradient(249.51deg, #00ffa3 -47.16%, #dc1fff 140.55%);
  z-index: 1;
  box-shadow: 0px 0px 14px 0px ${colors.shadow.thin};
  height: 64px;
`
const headerContent = css`
  width: 100%;
  max-width: ${PAGE_WIDTH}px;
  padding: 16px 24px;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  color: ${colors.text.whitePrimary};
`

const sideHeader = css`
  display: flex;
  align-items: center;
`

const summerCampText = css`
  @media only screen and (max-width: 520px) {
    display: none;
  }
`

const grantsText = css`
  padding-left: 16px;
  border-left: 1px solid ${colors.line.white};
`

const poweredByContainer = css`
  display: flex;
  align-items: center;
  color: ${colors.text.whitePrimary};
  padding: 8px;
  border-radius: 0 0 4px 0;
`

const poweredByText = css`
  font-size: 14px;
  font-weight: normal;
  position: relative;
  bottom: 1px;
`

const container = css`
  width: 100%;
  max-width: ${PAGE_WIDTH}px;
  display: flex;
  justify-content: center;
  padding: 48px 24px;
  margin: 0 auto;
  flex-direction: column;
  box-sizing: border-box;
`

export const Layout: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className={pageWrap}>
    <div className={header}>
      <div className={headerContent}>
        <Link href={urls.home}>
          <a className={sideHeader}>
            <SolanaLogoSVG width={24} />
            <Spacers.Horizontal._8px />
            <div className={summerCampText}>#SolanaSummerCamp</div>
            <Spacers.Horizontal._16px />
            <div className={grantsText}>Grants</div>
          </a>
        </Link>
        <div className={sideHeader}>
          <a
            href="https://ahoy.fund?solana_summer=true"
            target="_blank"
            className={poweredByContainer}
            rel="noreferrer"
          >
            <div className={poweredByText}>Powered by</div>
            <Spacers.Horizontal._8px />
            <AhoyLogoSVG width={50} />
          </a>
          <WalletMultiButton />
        </div>
      </div>
    </div>
    <div style={{ height: 64 }} />
    <div className={container}>{children}</div>
  </div>
)
