import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { css } from 'linaria'
import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { object, SchemaOf, string } from 'yup'

import { CurrentWalletBalanceCard } from '../../../components/CurrentWalletBalanceCard'
import { Layout } from '../../../components/Layout'
import { Spacers } from '../../../components/Spacers'
import { SubmissionCard } from '../../../components/SubmissionCard'
import { ChevronLeftSVG } from '../../../components/svgs/ChevronLeftSVG'
import { urls } from '../../../constants/urls'
import { useGrantWithSubmissions } from '../../../hooks/useGrantWithSubmissions'
import { paySubmitter } from '../../../network/rpc/paySubmitter'
import { colors } from '../../../ui/colors'

const backButton = css`
  color: ${colors.spot.green};
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  font-weight: bold;
`

const submissionCardContainer = css`
  padding: 0 24px;
  background: ${colors.bg.gray};
  border: 1px solid ${colors.line.black};
  border-radius: 8px;

  > div {
    border-top: 0;
    padding-top: 24px;
    padding-bottom: 24px;
  }
`

const paymentAmountInput = css``

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

const paymentForm = css`
  label {
    display: block;
    margin-bottom: 8px;
  }
  input {
    display: block;
    width: 100%;
    padding: 8px;
    padding-left: 24px;
    border: 1px solid ${colors.line.black};
    border-radius: 8px;
  }
  .dollarContainer {
    position: relative;
    .dollarText {
      position: absolute;
      user-select: none;
      pointer-events: none;
      left: 12px;
      top: 11px;
      color: ${colors.text.blackSecondary};
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

interface FormValues {
  paymentAmount: string
}

const initialValues: FormValues = {
  paymentAmount: '',
}

const validationSchema: SchemaOf<FormValues> = object().shape({
  paymentAmount: string()
    .trim()
    .matches(/^[0-9][0-9,.]*$/, 'Payment Amount must be a number')
    .required('Payment Amount is required'),
})

const PaySubmissionPage: NextPage = () => {
  const router = useRouter()
  const wallet = useAnchorWallet()
  const [hasClickedSubmit, setHasClickedSubmit] = useState(false)
  const { uid, submissionID } = router.query as {
    submissionID: string
    uid: string
  }

  const [grant, submissions, usdcBalance, loading] = useGrantWithSubmissions(
    uid,
    wallet,
  )

  if (loading) {
    return <Layout>Loading...</Layout>
  }

  if (grant == null || submissions.length === 0) {
    return <Layout>404: Grant Not Found</Layout>
  }

  const currentSubmission = submissions.find(
    (i) => i.publicKey.toBase58() === submissionID,
  )

  if (currentSubmission == null) {
    return <Layout>404: Submission Not Found</Layout>
  }

  return (
    <Layout>
      <Link href={urls.grant(uid)}>
        <a className={backButton}>
          <ChevronLeftSVG width={16} />
          <Spacers.Horizontal._8px />
          {grant.info.companyName}
          {': $'}
          {Math.floor(grant.initialAmountUSDC).toLocaleString()}
          {' Grant'}
        </a>
      </Link>
      <Spacers.Vertical._48px />
      <div>Paying the creator of:</div>
      <Spacers.Vertical._8px />
      <div className={submissionCardContainer}>
        <SubmissionCard
          grantUID={uid}
          showPayButton={false}
          submission={currentSubmission}
        />
      </div>
      <Spacers.Vertical._48px />
      <div>From:</div>
      <Spacers.Vertical._8px />
      <CurrentWalletBalanceCard
        associatedUSDCTokenAccount={grant.associatedUSDCTokenAccount}
        usdcBalance={usdcBalance}
      />
      <Spacers.Vertical._48px />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (
          { paymentAmount }: FormValues,
          { setSubmitting }: FormikHelpers<FormValues>,
        ) => {
          try {
            if (!wallet) return

            const usdcToPay = parseFloat(paymentAmount.replaceAll(',', ''))

            await paySubmitter({
              usdcToPay,
              grantAccount: grant.publicKey,
              submissionAccount: currentSubmission.publicKey,
              submitterAssociatedTokenAccount: currentSubmission.payTo,
              wallet,
            })

            toast.success('project paid!')

            router.push(urls.grant(uid))
          } catch (error) {
            toast.error(`error: ${error}`)
            console.error(error)
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting, errors, dirty }) => {
          const errorMessage = Object.values(errors).filter((i) => i)

          return (
            <Form className={paymentForm}>
              <label htmlFor="paymentAmount">Payment Amount</label>
              <div className="dollarContainer">
                <div className="dollarText">$</div>
              </div>
              <Field
                className={paymentAmountInput}
                id="paymentAmount"
                name="paymentAmount"
                placeholder="1"
              />

              <Spacers.Vertical._48px />
              {hasClickedSubmit && errorMessage.length ? (
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
              ) : null}
              <button
                onClick={() => setHasClickedSubmit(true)}
                className={submitButton}
                disabled={!dirty || isSubmitting}
                type="submit"
              >
                Pay Submission
              </button>
            </Form>
          )
        }}
      </Formik>
    </Layout>
  )
}

export default PaySubmissionPage
