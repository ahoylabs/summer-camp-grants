import { Field, Form, Formik, FormikHelpers } from 'formik'
import { css, cx } from 'linaria'
import { FC, useState } from 'react'
import { mixed, object, SchemaOf, string } from 'yup'

import { colors } from '../ui/colors'
import { displayPublicKey } from '../utils/displayPublicKey'
import { ImageDropzone } from './ImageDropzone'
import { Spacers } from './Spacers'
import { ExternalLinkSVG } from './svgs/ExternalLinkSVG'
import { PlusSVG } from './svgs/PlusSVG'
import { WalletSVG } from './svgs/WalletSVG'

const container = css`
  padding: 24px;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.14);
  border-radius: 8px;
  position: relative;
`
const clickableContainer = css`
  cursor: pointer;
  :hover {
    background-color: ${colors.bg.green};
  }
`

const heading = css`
  display: flex;
  font-size: 20px;
  font-weight: 600;
  line-height: 1.2;
  color: ${colors.spot.green};
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
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid ${colors.line.black};
    border-radius: 8px;
    height: 120px;
  }
  max-height: 1500px;
`

const hideCreateFrom = css`
  max-height: 0px;
  overflow: hidden;
`
const collapseButton = css`
  padding: 6px 12px;
  border: 1px solid ${colors.line.black};
  background: ${colors.bg.gray};
  border-radius: 8px;
  position: absolute;
  right: 24px;
  top: 24px;
`

const walletSubmissionCallout = css`
  padding: 12px;
  background: ${colors.bg.green};
  border: 1px solid ${colors.line.black};
  border-radius: 8px;
  text-align: center;
  line-height: 1.4;

  .secondLine {
    text-decoration: underline;
    font-weight: 600;
  }
  .walletLine {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    :hover {
      color: ${colors.spot.green};
      text-decoration: underline;
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
  contactInfo: string
  description: string
  imageFile: File | null
  linkToRepo: string
  name: string
}

const initialValues: FormValues = {
  contactInfo: '',
  description: '',
  imageFile: null,
  linkToRepo: '',
  name: '',
}

const validationSchema: SchemaOf<FormValues> = object().shape({
  contactInfo: string().trim().required('Contact Info is required'),
  description: string().trim().required('Description is required'),
  imageFile: mixed().required('Image is required'),
  name: string().trim().required('Project Name is required'),
  linkToRepo: string()
    .url('Link to Repo must be a valid URL (including https://)')
    .required('Website is required'),
})

export const AddGrantSubmission: FC<{
  companyName: string
  publicKey: string
}> = ({ companyName, publicKey }) => {
  const [hasClickedSubmit, setHasClickedSubmit] = useState(false)
  const [showForm, setShowForm] = useState(false)
  return (
    <div
      className={cx(container, !showForm && clickableContainer)}
      onClick={showForm ? undefined : () => setShowForm(true)}
    >
      <div className={heading}>
        <PlusSVG width={24} style={{ flexShrink: 0 }} />
        <Spacers.Horizontal._4px />
        Add Submission
      </div>
      {showForm && (
        <button className={collapseButton} onClick={() => setShowForm(false)}>
          Close
        </button>
      )}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (
          { contactInfo, description, imageFile, name, linkToRepo }: FormValues,
          { setSubmitting }: FormikHelpers<FormValues>,
        ) => {
          alert('nice job, it worked')

          setSubmitting(false)
        }}
      >
        {({ setFieldValue, isSubmitting, errors, dirty }) => {
          const errorMessage = Object.values(errors).filter((i) => i)

          return (
            <Form className={cx(createForm, !showForm && hideCreateFrom)}>
              <Spacers.Vertical._24px />
              <label htmlFor="name">Project Name</label>
              <Field id="name" name="name" placeholder="Solana Party" />
              <Spacers.Vertical._24px />
              <label>Wallet to Receive Funds</label>
              <div className={walletSubmissionCallout}>
                <div>
                  If you submission is accepted, funds will be sent to you
                  current logged-in wallet address.
                </div>
                <Spacers.Vertical._8px />
                <div className="secondLine">
                  Verify this is the wallet you want to use before submitting
                </div>
                <Spacers.Vertical._8px />
                <a
                  className="walletLine"
                  href={`https://explorer.solana.com/address/${publicKey}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <WalletSVG width={16} />
                  <Spacers.Horizontal._4px />
                  {displayPublicKey(publicKey)}
                  <Spacers.Horizontal._4px />
                  <ExternalLinkSVG width={16} />
                </a>
              </div>
              <Spacers.Vertical._24px />
              <label htmlFor="linkToRepo">Repo URL</label>
              <Field
                id="linkToRepo"
                name="linkToRepo"
                placeholder="https://github.com/solana/party"
              />
              <Spacers.Vertical._24px />
              <label htmlFor="contactInfo">Contact Info</label>
              <Field
                id="contactInfo"
                name="contactInfo"
                placeholder={`How can ${companyName} & others contact you?`}
              />
              <Spacers.Vertical._24px />
              <label htmlFor="twitter">Project Description</label>
              <Field
                id="description"
                as="textarea"
                name="description"
                placeholder={`We built an IDL on ${companyName} to do... (you get the idea)`}
              />
              <Spacers.Vertical._24px />
              <label htmlFor="imageFile">Image</label>
              <ImageDropzone imageWidth={128} setFieldValue={setFieldValue} />
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
    </div>
  )
}
