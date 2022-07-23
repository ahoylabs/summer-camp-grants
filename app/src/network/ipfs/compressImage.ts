import Compressor from 'compressorjs'

export const compressImage = async (imageFile: File): Promise<File> =>
  new Promise((resolve, reject) => {
    new Compressor(imageFile, {
      width: 48,
      height: 48,
      quality: 0.9, // 1 makes the image larger
      resize: 'cover',
      success(file) {
        resolve(file as File) // we always pass in a file, so the output will be a file
      },
      error(error) {
        reject(error)
      },
    })
  })
