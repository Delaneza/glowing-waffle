import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { config } from '@shared/config'

const s3 = new S3Client({
  region: config.simulationsS3Bucket.region,
  credentials: {
    accessKeyId: config.simulationsS3Bucket.accessKeyId,
    secretAccessKey: config.simulationsS3Bucket.secretAccessKey,
  },
})

export async function UploadObject(key: string, body: any) {
  const params = {
    Bucket: config.simulationsS3Bucket.bucket,
    Key: `${key}.json`,
    Body: JSON.stringify(body),
  }

  const command = new PutObjectCommand(params)

  await s3.send(command)
}
