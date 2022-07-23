import { css } from 'linaria'
import Link from 'next/link'
import { FC } from 'react'

import { urls } from '../constants/urls'
import { colors } from '../ui/colors'
import { Spacers } from './Spacers'
import { BrandTwitterSVG } from './svgs/BrandTwitterSVG'

const footer = css`
  display: flex;
  flex-direction: column;
  background-color: ${colors.spot.green};
  position: sticky;
  bottom: 0;
  width: 100%;
  justify-content: center;
  z-index: 0;
`

// BOTTOM
const bottomContentContainer = css`
  width: 100%;
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  > a {
    border-bottom: 1px solid ${colors.line.white};
    cursor: pointer;
    :hover {
      text-decoration: none;
      border-bottom: 1px solid ${colors.text.whitePrimary};
    }
  }
  @media only screen and (max-width: 720px) {
    flex-direction: column;
    padding: 0px 16px;
    align-items: center;
  }
`
const bottomSection = css`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.text.whiteSecondary};
  padding: 24px 0px;
  background-color: #000000a8;
`

const onlyMobile = css`
  display: none;
  @media only screen and (max-width: 720px) {
    display: block;
  }
`

export const Footer: FC = () => (
  <>
    <div className={footer}>
      <div className={bottomSection}>
        <div className={bottomContentContainer}>
          <Link href={urls.terms}>
            <a>Terms of Use</a>
          </Link>
          <Spacers.Horizontal._24px />
          <div className={onlyMobile}>
            <Spacers.Vertical._24px />
          </div>
          <Link href={urls.privacy}>
            <a>Privacy Policy</a>
          </Link>
          <Spacers.Horizontal._24px />
          <div className={onlyMobile}>
            <Spacers.Vertical._24px />
          </div>
          <div className={onlyMobile}>
            <Spacers.Vertical._24px />
          </div>
          <div>© 2022 Ahoy Labs, Inc. </div>
          <div className={onlyMobile}>
            <Spacers.Vertical._24px />
          </div>
          <a href={urls.external.twitter} target="_blank" rel="noreferrer">
            <BrandTwitterSVG width={16} />
            <Spacers.Horizontal._8px />
            Follow us on Twitter
          </a>
        </div>
      </div>
    </div>
  </>
)
