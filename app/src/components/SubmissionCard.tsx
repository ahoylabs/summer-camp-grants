import { css } from 'linaria'
import Link from 'next/link'
import { FC } from 'react'

import { urls } from '../constants/urls'
import { Submission } from '../network/types/models/Submission'
import { colors } from '../ui/colors'
import { displayPublicKey } from '../utils/displayPublicKey'
import { Spacers } from './Spacers'
import { ExternalLinkSVG } from './svgs/ExternalLinkSVG'
import { WalletSVG } from './svgs/WalletSVG'

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
  grantUID: string
  showPayButton: boolean
  submission: Submission
}> = ({ grantUID, showPayButton, submission }) => (
  <div className={singleSubmissionContainer}>
    {showPayButton && (
      <Link
        href={urls.paySubmission(grantUID, submission.publicKey.toBase58())}
      >
        <a className={payProjectButton}>Pay Project</a>
      </Link>
    )}
    {submission.info.imageCID && (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={urls.image(submission.info.imageCID, 128)}
        alt={`image for ${submission.info.title}`}
        className={singleSubmissionImage}
      />
    )}
    <Spacers.Horizontal._24px />
    <div className={singleSubmissionInfoContent}>
      <a
        href={submission.info.githubURL}
        target="_blank"
        className={singleSubmissionTitle}
        rel="noreferrer"
      >
        {submission.info.title}
        <Spacers.Horizontal._4px />
        <ExternalLinkSVG width={16} />
      </a>
      <Spacers.Vertical._24px />
      <div className={singleSubmissionDescription}>
        {submission.info.description}
      </div>
      <Spacers.Vertical._24px />
      <div>
        <span className={singleSubmissionSubTag}>Submission Account:</span>
        <a
          href={`https://explorer.solana.com/address/${submission.publicKey.toBase58()}`}
          target="_blank"
          className={singleSubmissionSubmittedWallet}
          rel="noreferrer"
        >
          <WalletSVG width={16} />
          <Spacers.Horizontal._4px />
          {displayPublicKey(submission.publicKey.toBase58())}
        </a>
      </div>
      <Spacers.Vertical._4px />
      <div>
        <span className={singleSubmissionSubTag}>Contact:</span>
        <span className={singleSubmissionContact}>
          {submission.info.contact}
        </span>
      </div>
    </div>
  </div>
)
