import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { createHash } from 'crypto'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Airdrop } from '../../components/Airdrop'
import { Layout } from '../../components/Layout'
import { Spacers } from '../../components/Spacers'
import { urls } from '../../constants/urls'
import { useConnectedWalletBalance } from '../../hooks/useConnectedWalletBalance'
import { createGrant } from '../../network/rpc/createGrant'
import { ContentSHA256 } from '../../network/types/ContentSHA256'

interface FormValuesSchema {
  companyName: string
}

const CreateGrantPage: NextPage = () => {
  const router = useRouter()
  const wallet = useAnchorWallet()
  const [solBalance, usdcBalance] = useConnectedWalletBalance()

  return (
    <Layout>
      <Airdrop />
      <div>SOL: {solBalance}</div>
      <div>USDC: {usdcBalance}</div>
      <Spacers.Vertical._16px />
      <Formik
        initialValues={
          {
            companyName: '',
          } as FormValuesSchema
        }
        onSubmit={async (
          { companyName }: FormValuesSchema,
          { setSubmitting }: FormikHelpers<FormValuesSchema>,
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
        <Form>
          <label htmlFor="companyName">Company Name</label>
          <Field id="companyName" name="companyName" placeholder="John" />

          <button style={{ border: '1px solid black' }} type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </Layout>
  )
}

export default CreateGrantPage
