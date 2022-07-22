import { useAnchorWallet } from '@solana/wallet-adapter-react'
import { createHash } from 'crypto'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { NextPage } from 'next'

import { Airdrop } from '../../components/Airdrop'
import { Layout } from '../../components/Layout'
import { Spacers } from '../../components/Spacers'
import { createGrant } from '../../network/rpc/createGrant'
import { ContentSHA256 } from '../../network/types/ContentSHA256'

interface FormValuesSchema {
  companyName: string
}

const CreateGrantPage: NextPage = () => {
  const wallet = useAnchorWallet()
  return (
    <Layout>
      <Airdrop />
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

          console.log(grant)

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
