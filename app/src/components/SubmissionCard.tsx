import { css } from 'linaria'
import { FC } from 'react'

import { colors } from '../ui/colors'
import { displayPublicKey } from '../utils/displayPublicKey'
import { Spacers } from './Spacers'
import { ExternalLinkSVG } from './svgs/ExternalLinkSVG'
import { WalletSVG } from './svgs/WalletSVG'

export type SubmissionInfo = {
  contact: string
  description: string
  githubURL: string
  imageURL: string
  title: string
  walletPublicKey: string
}

const singleSubmissionContainer = css`
  padding: 32px 0;
  border-top: 1px solid ${colors.line.black};
  display: flex;
  flex: 1;
  position: relative;
`
const singleSubmissionImage = css`
  border-radius: 8px;
  width: 128px;
  height: 128px;
  @media only screen and (max-width: 680px) {
    width: 80px;
    height: 80px;
  }
`
const singleSubmissionInfoContent = css`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex-shrink: 1;
  overflow-wrap: anywhere;
  flex-grow: 1;
`
const singleSubmissionTitle = css`
  text-decoration: underline;
  overflow-wrap: anywhere;
  font-weight: bold;
  display: flex;
  align-self: start;
  align-items: center;
  :hover {
    color: ${colors.spot.green};
  }
`
const singleSubmissionDescription = css`
  line-height: 1.4;
  flex-wrap: wrap;
`
const singleSubmissionSubTag = css`
  font-size: 14px;
  color: ${colors.text.blackSecondary};
  padding-right: 8px;
  display: inline-flex;
  align-items: center;
  line-height: 1.4;
`
const singleSubmissionSubmittedWallet = css`
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  color: ${colors.spot.green};
  font-weight: medium;
  position: relative;
  top: 2px;
  :hover {
    color: ${colors.hover.green};
    text-decoration: underline;
  }
`
const singleSubmissionContact = css`
  overflow-wrap: anywhere;
  font-size: 14px;
  line-height: 1.4;
`
const payProjectButton = css`
  background: ${colors.spot.green};
  color: ${colors.text.whitePrimary};
  font-weight: 600;
  border-radius: 8px;
  position: absolute;
  padding: 6px 12px;
  right: 24px;
  top: 32px;
  :hover {
    background: ${colors.hover.green};
  }
`

export const SubmissionCard: FC<{
  showPayButton: boolean
  submission: SubmissionInfo
}> = ({ submission, showPayButton }) => (
  <div className={singleSubmissionContainer}>
    {showPayButton && <button className={payProjectButton}>Pay Project</button>}
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={submission.imageURL}
      alt={`image for ${submission.title}`}
      className={singleSubmissionImage}
    />

    <Spacers.Horizontal._24px />
    <div className={singleSubmissionInfoContent}>
      <a
        href={submission.githubURL}
        target="_blank"
        className={singleSubmissionTitle}
        rel="noreferrer"
      >
        {submission.title}
        <Spacers.Horizontal._4px />
        <ExternalLinkSVG width={16} />
      </a>
      <Spacers.Vertical._24px />
      <div className={singleSubmissionDescription}>
        {submission.description}
      </div>
      <Spacers.Vertical._24px />
      <div>
        <span className={singleSubmissionSubTag}>Submitted by:</span>
        <a
          href={`https://explorer.solana.com/address/${submission.walletPublicKey}`}
          target="_blank"
          className={singleSubmissionSubmittedWallet}
          rel="noreferrer"
        >
          <WalletSVG width={16} />
          <Spacers.Horizontal._4px />
          {displayPublicKey(submission.walletPublicKey)}
        </a>
      </div>
      <Spacers.Vertical._4px />
      <div>
        <span className={singleSubmissionSubTag}>Contact:</span>
        <span className={singleSubmissionContact}>{submission.contact}</span>
      </div>
    </div>
  </div>
)
