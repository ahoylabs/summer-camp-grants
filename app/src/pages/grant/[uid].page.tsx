import { getAccount } from '@solana/spl-token'
import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { css } from 'linaria'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Layout } from '../../components/Layout'
import { Spacers } from '../../components/Spacers'
import { BrandTwitterSVG } from '../../components/svgs/BrandTwitterSVG'
import { ExternalLinkSVG } from '../../components/svgs/ExternalLinkSVG'
import { PlusSVG } from '../../components/svgs/PlusSVG'
import { WalletSVG } from '../../components/svgs/WalletSVG'
import { urls } from '../../constants/urls'
import { connection } from '../../network/connection'
import { convertUnitsToUSDC } from '../../network/convertUSDC'
import { fetchGrantWithSubmissions } from '../../network/fetch/fetchGrantWithSubmissions'
import { Grant } from '../../network/types/models/Grant'
import { Submission } from '../../network/types/models/Submission'
import { colors } from '../../ui/colors'
import { displayPublicKey } from '../../utils/displayPublicKey'

const headlineContainer = css`
  display: flex;
  align-items: center;
`
const headlineImage = css`
  border-radius: 1000px;
  flex-shrink: 0;
`
const headlineText = css`
  font-size: 48px;
  font-weight: bold;
  display: flex;
  flex-wrap: wrap;
  @media only screen and (max-width: 800px) {
    font-size: 40px;
  }
  @media only screen and (max-width: 680px) {
    font-size: 32px;
  }
`
const grantAmountText = css`
  color: ${colors.spot.green};
`

const linkContainer = css`
  display: flex;
`

const externalCompanyLink = css`
  color: ${colors.text.blackSecondary};
  font-size: 14px;
  display: flex;
  span {
    box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.15);
  }
  :hover {
    color: ${colors.spot.green};
  }
`

const verticalLine = css`
  border-left: 1px solid ${colors.line.black};
`

const descriptionText = css`
  line-height: 1.4;
`

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

const h2Submissions = css`
  font-size: 24px;
  font-weight: bold;
`

const connectWalletToSubmitContainer = css`
  background-color: ${colors.bg.gray};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  border: 1px solid ${colors.line.black};
  border-radius: 8px;
`

const connectWalletToAddSubmitButton = css`
  display: flex;
  align-items: center;
  background-color: ${colors.spot.green};
  color: ${colors.text.whitePrimary};
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  border-radius: 8px;
  padding: 12px 24px;
  line-height: 1.4;
`

const singleSubmissionContainer = css`
  padding: 32px 0;
  border-top: 1px solid ${colors.line.black};
  display: flex;
  flex: 1;
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

type SubmissionInfo = {
  contact: string
  description: string
  githubURL: string
  imageURL: string
  title: string
  walletPublicKey: string
}

const sampleSubmission: SubmissionInfo = {
  contact: 'DM me @thisisareallylongtwitternameandIcannotuinders',
  description: 'This is a great project. I hope the team at Tulip likes it',
  githubURL: 'https://github.com/biw/comic-sans-everything',
  imageURL:
    'https://loremflickr.com/cache/resized/65535_51976730205_07c53e56b5_q_128_128_nofilter.jpg',
  title: 'Really Great Project',
  walletPublicKey: '7cre8AiBkVzWwFQtCA7TnEmh8CGTjZ87KJC5Mu3dZxwE',
}
const sampleSubmissionList = [
  sampleSubmission,
  sampleSubmission,
  sampleSubmission,
]

const GrantPage: NextPage = () => {
  const router = useRouter()
  const wallet = useAnchorWallet()

  const [grant, setGrant] = useState<Grant | null>(null)
  const [usdcBalance, setUsdcBalance] = useState(0)
  const [submissions, setSubmissions] = useState<Submission[] | null>(null)

  const { uid } = router.query

  useEffect(() => {
    ;(async () => {
      if (!wallet) return

      // TODO add some validation on UID from router query
      const grant = await fetchGrantWithSubmissions({
        grantPubkey: new PublicKey(uid as string),
        wallet,
      })
      try {
        // usdc ATA
        const account = await getAccount(
          connection,
          grant.associatedUSDCTokenAccount,
        )
        const balanceUSDC = convertUnitsToUSDC(account.amount)
        setUsdcBalance(balanceUSDC)
      } catch (error) {
        // could have been destroyed
        setUsdcBalance(0)
      }

      setGrant(grant)
      // setSubmissions(submissions)
    })()
  }, [uid, wallet])

  if (!grant) return <div>'loading...'</div>

  const {
    createdAt,
    info,
    associatedUSDCTokenAccount,
    initialAmountUSDC,
    publicKey,
  } = grant
  const { companyName, description, imageCID, twitterSlug, websiteURL } =
    grant.info

  return (
    <Layout>
      <div className={headlineContainer}>
        {imageCID && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            className={headlineImage}
            src={urls.image(imageCID)}
            width={48}
            height={48}
            alt={`${companyName} logo`}
          />
        )}

        <Spacers.Horizontal._8px />
        <h1 className={headlineText}>
          {companyName}
          {': '}
          <Spacers.Horizontal._8px />
          <span className={grantAmountText}>
            ${Math.floor(initialAmountUSDC).toLocaleString()} Grant
          </span>
        </h1>
      </div>
      <Spacers.Vertical._16px />
      <div className={linkContainer}>
        <a
          className={externalCompanyLink}
          href={`https://twitter.com/${twitterSlug}`}
          target="_blank"
          rel="noreferrer"
        >
          <BrandTwitterSVG width={16} />
          <Spacers.Horizontal._4px />
          <span>{twitterSlug}</span>
        </a>
        <Spacers.Horizontal._8px />
        <div className={verticalLine} />
        <Spacers.Horizontal._8px />
        <a
          className={externalCompanyLink}
          href={websiteURL}
          target="_blank"
          rel="noreferrer"
        >
          <ExternalLinkSVG width={16} />
          <Spacers.Horizontal._4px />
          <span>{websiteURL}</span>
        </a>
      </div>
      <Spacers.Vertical._32px />
      <div className={descriptionText}>{description}</div>
      <Spacers.Vertical._32px />
      <div className={walletContainer}>
        <div className={leftSideWalletContainer}>
          <div className={leftSideWalletContainerBalance}>
            <WalletSVG width={24} />
            <Spacers.Horizontal._4px />$
            {Math.floor(usdcBalance).toLocaleString()} USDC
          </div>
          <Spacers.Vertical._4px />
          <div className={leftSideWalletContainerAddress}>
            {displayPublicKey(associatedUSDCTokenAccount)}
          </div>
        </div>
        <a
          href={`https://explorer.solana.com/address/${associatedUSDCTokenAccount}`}
          target="_blank"
          className={viewOnSolanaExplorerButton}
          rel="noreferrer"
        >
          View on Solana Explorer <Spacers.Horizontal._4px />
          <ExternalLinkSVG style={{ flexShrink: 0 }} width={16} />
        </a>
      </div>
      <Spacers.Vertical._72px />
      <h2 className={h2Submissions}>Submissions</h2>
      <Spacers.Vertical._32px />
      {wallet == null ? (
        <div className={connectWalletToSubmitContainer}>
          <div className={connectWalletToAddSubmitButton}>
            <PlusSVG width={24} style={{ flexShrink: 0 }} />
            <Spacers.Horizontal._16px />
            Connect Wallet to Add Submission
          </div>
        </div>
      ) : (
        <div>Add Submission - todo</div>
      )}
      <Spacers.Vertical._32px />
      {sampleSubmissionList.map((sub, i) => (
        <div
          key={sub.walletPublicKey + sub.description + i}
          className={singleSubmissionContainer}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sub.imageURL}
            alt={`image for ${sub.title}`}
            className={singleSubmissionImage}
          />
          <Spacers.Horizontal._24px />
          <div className={singleSubmissionInfoContent}>
            <a
              href={sub.githubURL}
              target="_blank"
              className={singleSubmissionTitle}
              rel="noreferrer"
            >
              {sub.title}
              <Spacers.Horizontal._4px />
              <ExternalLinkSVG width={16} />
            </a>
            <Spacers.Vertical._24px />
            <div className={singleSubmissionDescription}>{sub.description}</div>
            <Spacers.Vertical._24px />
            <div>
              <span className={singleSubmissionSubTag}>Submitted by:</span>
              <a
                href={`https://explorer.solana.com/address/${sub.walletPublicKey}`}
                target="_blank"
                className={singleSubmissionSubmittedWallet}
                rel="noreferrer"
              >
                <WalletSVG width={16} />
                <Spacers.Horizontal._4px />
                {displayPublicKey(sub.walletPublicKey)}
              </a>
            </div>
            <Spacers.Vertical._4px />
            <div>
              <span className={singleSubmissionSubTag}>Contact:</span>
              <span className={singleSubmissionContact}>{sub.contact}</span>
            </div>
          </div>
        </div>
      ))}
    </Layout>
  )
}

export default GrantPage
