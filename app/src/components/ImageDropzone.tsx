import { css, cx } from 'linaria'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { colors } from '../ui/colors'
import { Spacers } from './Spacers'

const dropzone = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100px;
  border: 1px solid ${colors.line.black};
  border-radius: 8px;
  border-style: dashed;
  padding: 24px;
  cursor: pointer;
`

const dragging = css`
  background-color: ${colors.bg.gray};
  border-style: solid;
`

const errorMessage = css`
  color: ${colors.spot.red};
`

const imageContainer = css`
  border: 1px solid ${colors.line.black};
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  border-radius: 100px;
`

const addImageButton = css`
  border-radius: 8px;
  border: 1.5px solid ${colors.spot.green};
  padding: 6px 12px;
  width: 120px;
  margin: auto;
`

// Adapted from the "Previews" example on https://react-dropzone.js.org/
export const ImageDropzone: React.VFC<{
  imageWidth: 48 | 128
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined,
  ) => void
}> = React.memo(({ setFieldValue, imageWidth }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // check if a dropped file was rejected
      if (!(acceptedFiles.length > 0)) {
        setImagePreview(null)
        setError(
          'Image selection failed. Please make sure your image file is less than 10mb.',
        )
      }

      // handle successful file drop
      const img = acceptedFiles[0]
      setImagePreview(URL.createObjectURL(img)) // update preview
      setFieldValue('imageFile', img) // update formik
      setError(null) // remove any stale error messages
    },
    [setFieldValue],
  )

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } =
    useDropzone({
      maxFiles: 1,
      onDrop,
      maxSize: 10 * 1_048_576, // this will be compressed and cropped before pinning to IPFS
      accept: {
        'image/*': ['.jpeg', '.jpg', '.png'],
      },
    })

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview)
    }
  }, [imagePreview])

  return (
    <>
      <div
        className={cx(dropzone, isDragActive && dragging)}
        {...getRootProps()}
      >
        <div
          className={imageContainer}
          style={{ width: imageWidth, height: imageWidth }}
        >
          {imagePreview && (
            <Image
              src={imagePreview}
              layout="fill"
              objectFit="cover"
              alt="bounty-image"
              objectPosition="center"
              onLoad={() => {
                URL.revokeObjectURL(imagePreview)
              }}
            />
          )}
        </div>
        <Spacers.Vertical._8px />
        <input {...getInputProps()} />
        <button type="button" disabled={isDragActive}>
          {acceptedFiles[0] ? (
            'Remove and Replace Image'
          ) : isDragActive ? (
            'Drop Here'
          ) : imageWidth === 48 ? (
            <span>
              Choose a 48px x 48px profile-picture style image for your grant.
              <Spacers.Vertical._8px />
              (twitter profile pic works well)
              <Spacers.Vertical._8px />
              <div className={addImageButton}>Add Image</div>
            </span>
          ) : (
            <span>
              Choose a 128px x 128px image for you submission.
              <Spacers.Vertical._8px />
              <div className={addImageButton}>Add Image</div>
            </span>
          )}
        </button>
      </div>
      <Spacers.Vertical._8px />
      {error && <div className={errorMessage}>{error}</div>}
    </>
  )
})

ImageDropzone.displayName = 'ImageDropzone'
