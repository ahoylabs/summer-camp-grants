import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { createHash } from 'crypto'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { css } from 'linaria'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { mixed, object, SchemaOf, string } from 'yup'

import { Airdrop } from '../../components/Airdrop'
import { ImageDropzone } from '../../components/ImageDropzone'
import { Layout } from '../../components/Layout'
import { Spacers } from '../../components/Spacers'
import { ExternalLinkSVG } from '../../components/svgs/ExternalLinkSVG'
import { WalletSVG } from '../../components/svgs/WalletSVG'
import { urls } from '../../constants/urls'
import { useConnectedWalletBalance } from '../../hooks/useConnectedWalletBalance'
import { createGrant } from '../../network/rpc/createGrant'
import { ContentSHA256 } from '../../network/types/ContentSHA256'
import { colors } from '../../ui/colors'
import { displayPublicKey } from '../../utils/displayPublicKey'

const heading = css`
  font-size: 48px;
  font-weight: bold;
  line-height: 1.2;
  @media only screen and (max-width: 800px) {
    font-size: 40px;
  }
  @media only screen and (max-width: 680px) {
    font-size: 32px;
  }
`

const createForm = css`
  label {
    display: block;
    margin-bottom: 8px;
  }
  input {
    display: block;
    width: 100%;
    padding: 8px;
    border: 1px solid ${colors.line.black};
    border-radius: 8px;
  }
  .split {
    display: flex;
    width: 100%;
    grid-gap: 24px;
    > div {
      width: 100%;
    }

    @media only screen and (max-width: 680px) {
      flex-direction: column;
    }
  }
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid ${colors.line.black};
    border-radius: 8px;
    height: 120px;
  }
`

const totalAmountCallout = css`
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.line.black};
  padding: 24px;
  background: ${colors.bg.green};
  border-radius: 8px;
  text-align: center;
  justify-content: center;
  align-items: center;
  line-height: 1.4;
  .amount {
    font-size: 20px;
    color: ${colors.spot.green};
    font-weight: bold;
  }
  .walletLine {
    color: ${colors.text.blackSecondary};
    display: flex;
    align-items: center;
    font-size: 14px;
    :hover {
      text-decoration: underline;
      color: ${colors.spot.green};
    }
  }
  .callout {
    font-weight: bold;
    text-decoration: underline;
  }
`

const noWalletCallout = css`
  display: flex;
  flex-direction: column;
  border: 1px solid ${colors.line.black};
  padding: 24px;
  background: ${colors.bg.green};
  border-radius: 8px;
  text-align: center;
  justify-content: center;
  align-items: center;
  line-height: 1.4;
  span {
    color: ${colors.spot.green};
    font-weight: bold;
  }
  p {
    max-width: 500px;
  }
  .snapshot-callout {
    font-weight: bold;
    text-decoration: underline;
  }
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

const submitButton = css`
  background: ${colors.spot.green};
  color: ${colors.text.whitePrimary};
  font-weight: bold;
  border-radius: 8px;
  width: 100%;
  font-size: 20px;
  padding: 12px;
  :hover {
    background: ${colors.hover.green};
  }
  :disabled {
    background: ${colors.bg.gray};
    color: ${colors.text.blackSecondary};
  }
`

const errorList = css`
  color: ${colors.spot.red};
  background: ${colors.bg.red};
  border-radius: 8px;
  padding: 24px;
  line-height: 1.4;
  border: 1px solid ${colors.line.black};
  span {
    font-size: 20px;
    font-weight: bold;
  }
`

interface FormValues {
  companyName: string
  description: string
  imageFile: File | null
  twitter: string
  website: string
}

const initialValues: FormValues = {
  companyName: '',
  description: '',
  imageFile: null,
  twitter: '',
  website: '',
}

const validationSchema: SchemaOf<FormValues> = object().shape({
  companyName: string().trim().required('Company Name is required'),
  description: string().trim().required('Description is required'),
  imageFile: mixed().required('Image is required'),
  twitter: string().trim().required('Twitter is required'),
  website: string()
    .url('Website must be a valid URL (including https://)')
    .required('Website is required'),
})

const CreateGrantPage: NextPage = () => {
  const router = useRouter()
  const wallet = useAnchorWallet()
  const [solBalance, usdcBalance] = useConnectedWalletBalance()
  const [hasClickedSubmit, setHasClickedSubmit] = useState(false)

  return (
    <Layout>
      <Airdrop />
      <div>SOL: {solBalance}</div>
      <div>USDC: {usdcBalance}</div>
      <Spacers.Vertical._16px />
      <h1 className={heading}>Create Grant</h1>
      <Spacers.Vertical._48px />
      {wallet ? (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (
            { companyName }: FormValues,
            { setSubmitting }: FormikHelpers<FormValues>,
          ) => {
            if (!wallet) return
            const fakeContent = [
              ...createHash('sha256').update(companyName, 'utf8').digest(),
            ] as ContentSHA256

            const grant = await createGrant({
              contentSha256: fakeContent,
              wallet: wallet,
            })
            router.push(urls.grant(grant.publicKey))
            setSubmitting(false)
          }}
        >
          {({ setFieldValue, isSubmitting, errors, dirty }) => {
            const errorMessage = Object.values(errors).filter((i) => i)

            return (
              <Form className={createForm}>
                <label htmlFor="companyName">Company Name</label>
                <Field
                  id="companyName"
                  name="companyName"
                  placeholder="Solana"
                />
                <Spacers.Vertical._24px />
                <div className="split">
                  <div>
                    <label htmlFor="twitter">Twitter Handle</label>
                    <Field id="twitter" name="twitter" placeholder="@solana" />
                  </div>
                  <div>
                    <label htmlFor="website">Company Name</label>
                    <Field
                      id="website"
                      name="website"
                      placeholder="https://solana.com"
                    />
                  </div>
                </div>
                <Spacers.Vertical._24px />
                <label htmlFor="twitter">Grant Description</label>
                <Field
                  id="description"
                  as="textarea"
                  name="description"
                  placeholder="Build IDLs on Solana and get money... (you get the idea)"
                />
                <Spacers.Vertical._24px />
                <label>Total Amount</label>
                <div className={totalAmountCallout}>
                  <div className="amount">
                    ${Math.floor(usdcBalance || 0).toLocaleString()} USDC
                  </div>
                  <Spacers.Vertical._8px />
                  <a
                    href={`https://explorer.solana.com/address/${wallet.publicKey.toBase58()}`}
                    target="_blank"
                    className="walletLine"
                    rel="noreferrer"
                  >
                    <WalletSVG width={16} />
                    <Spacers.Horizontal._4px />
                    {displayPublicKey(wallet.publicKey)}
                    <Spacers.Horizontal._4px />
                    <ExternalLinkSVG width={16} />
                  </a>
                  <Spacers.Vertical._8px />
                  <div className="callout">
                    This is the amount that will be shown for your grant.
                    <Spacers.Vertical._8px />
                    If this is incorrect, update your wallet balance and refresh
                    the page.
                    <Spacers.Vertical._8px />
                    It cannot be changed after you create your grant.
                  </div>
                </div>
                <Spacers.Vertical._24px />
                <label htmlFor="imageFile">Image</label>
                <ImageDropzone setFieldValue={setFieldValue} />
                <Spacers.Vertical._48px />
                {hasClickedSubmit && errorMessage.length && (
                  <>
                    <div className={errorList}>
                      <span>Errors:</span>
                      <ul>
                        {errorMessage.map((i) => (
                          <li key={i}>{i}</li>
                        ))}
                      </ul>
                    </div>
                    <Spacers.Vertical._24px />
                  </>
                )}
                <button
                  onClick={() => setHasClickedSubmit(true)}
                  className={submitButton}
                  disabled={!dirty || isSubmitting}
                  type="submit"
                >
                  Create Grant
                </button>
              </Form>
            )
          }}
        </Formik>
      ) : (
        <div className={noWalletCallout}>
          <p>
            <span>To get started, connect a wallet</span> with the associate
            USDC account that you will pay your grant with.
          </p>
          <Spacers.Vertical._16px />
          <p>
            This Wallet will be the wallet shown publicly and where funds will
            be paid from to Hackathon teams.
          </p>
          <Spacers.Vertical._16px />
          <p className="snapshot-callout">
            Make sure that the USDC funds are in the wallet before creating the
            grant as we display the total amount of the grant based on the
            balance at time of creation
          </p>
          <Spacers.Vertical._24px />
          <WalletMultiButton />
        </div>
      )}
    </Layout>
  )
}

export default CreateGrantPage
