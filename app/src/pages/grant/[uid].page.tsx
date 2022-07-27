import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { css } from 'linaria'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { AddGrantSubmission } from '../../components/AddGrantSubmission'
import { CurrentWalletBalanceCard } from '../../components/CurrentWalletBalanceCard'
import { Layout } from '../../components/Layout'
import { Spacers } from '../../components/Spacers'
import { SubmissionCard } from '../../components/SubmissionCard'
import { BrandTwitterSVG } from '../../components/svgs/BrandTwitterSVG'
import { ExternalLinkSVG } from '../../components/svgs/ExternalLinkSVG'
import { urls } from '../../constants/urls'
import { useGrantWithSubmissions } from '../../hooks/useGrantWithSubmissions'
import { colors } from '../../ui/colors'

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
  line-height: 1.2;
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
  a {
    color: ${colors.spot.green};
    :hover {
      text-decoration: underline;
    }
  }
`

const h2Submissions = css`
  font-size: 24px;
  font-weight: bold;
`

const connectWalletToSubmitContainer = css`
  background-color: ${colors.bg.gray};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 24px;
  border: 1px solid ${colors.line.black};
  border-radius: 8px;

  .wallet-adapter-button-trigger {
    margin: auto;
    color: ${colors.spot.green};
    border-color: ${colors.spot.green};
    :hover {
      background: ${colors.spot.green};
      color: ${colors.text.whitePrimary};
    }
  }
`

const connectWalletToAddSubmitText = css`
  color: ${colors.spot.green};
  font-size: 20px;
  font-weight: 600;
  border-radius: 8px;
  line-height: 1.4;
`

const urlRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/

const parseDescription = (description: string) => {
  const words = description.split(' ')
  return words.map((w) => {
    if (urlRegex.test(w)) {
      return (
        <a href={w} target="_blank" rel="noreferrer">
          {w}
        </a>
      )
    }
    return `${w} `
  })
}

const GrantPage: NextPage = () => {
  const router = useRouter()
  const wallet = useAnchorWallet()
  const { uid } = router.query as { uid: string }
  const [grant, submissions, usdcBalance, loading] = useGrantWithSubmissions(
    uid,
    wallet,
  )

  if (loading) {
    return <Layout>loading...</Layout>
  }
  if (!grant) {
    return <Layout>404: Grant Not Found</Layout>
  }

  const {
    info: { companyName, description, imageCID, twitterSlug, websiteURL },
    associatedUSDCTokenAccount,
    initialAmountUSDC,
    publicKey,
  } = grant

  const descriptionWithParsedURLs = parseDescription(description)

  return (
    <Layout>
      <div className={headlineContainer}>
        {imageCID && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            className={headlineImage}
            src={urls.image(imageCID, 48)}
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
      <div className={descriptionText}>{descriptionWithParsedURLs}</div>
      <Spacers.Vertical._32px />
      <CurrentWalletBalanceCard
        usdcBalance={usdcBalance}
        associatedUSDCTokenAccount={associatedUSDCTokenAccount}
      />
      <Spacers.Vertical._72px />
      <h2 className={h2Submissions}>Submissions</h2>
      <Spacers.Vertical._32px />
      {wallet == null ? (
        <div className={connectWalletToSubmitContainer}>
          <div className={connectWalletToAddSubmitText}>
            Connect Wallet to Add Submission
          </div>
          <Spacers.Vertical._16px />
          <WalletMultiButton />
        </div>
      ) : (
        <AddGrantSubmission
          publicKey={wallet.publicKey.toBase58()}
          companyName={companyName}
          grantPubkey={publicKey}
        />
      )}
      <Spacers.Vertical._32px />
      {submissions
        .sort((a, b) => b.submittedAt.diff(a.submittedAt))
        .map((sub, i) => (
          <SubmissionCard
            grantUID={publicKey.toBase58()}
            showPayButton={
              wallet?.publicKey?.toBase58() === grant.owner.toBase58()
            }
            submission={sub}
            key={i}
          />
        ))}
    </Layout>
  )
}

export default GrantPage
