import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  DeleteObjectCommandOutput,
  GetObjectCommand,
  GetObjectCommandInput,
  GetObjectCommandOutput,
  ListObjectsCommand,
  ListObjectsCommandInput,
  ListObjectsCommandOutput,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  S3Client,
  S3ClientConfig,
} from '@aws-sdk/client-s3'

export class S3Service {
  private s3: S3Client

  constructor(configAWS: S3ClientConfig) {
    this.s3 = new S3Client(configAWS)
  }

  async putObject(paramsS3: PutObjectCommandInput): Promise<PutObjectCommandOutput> {
    const command = new PutObjectCommand(paramsS3)
    const data = await this.s3.send(command)
    console.log('Objeto armazenado bucket com sucesso!', paramsS3.Bucket, paramsS3.Key)
    return data
  }

  async getObject(paramsS3: GetObjectCommandInput): Promise<GetObjectCommandOutput> {
    const command = new GetObjectCommand(paramsS3)
    const data = await this.s3.send(command)
    console.log('Objeto baixado do bucket com sucesso!', paramsS3.Bucket, paramsS3.Key)
    return data
  }

  async deleteObject(paramsS3: DeleteObjectCommandInput): Promise<DeleteObjectCommandOutput> {
    const command = new DeleteObjectCommand(paramsS3)
    const data = await this.s3.send(command)
    console.log('Objeto deletado com sucesso!', paramsS3.Bucket, paramsS3.Key)
    return data
  }

  async listObjects(paramsS3: ListObjectsCommandInput): Promise<ListObjectsCommandOutput> {
    const command = new ListObjectsCommand(paramsS3)
    const data = await this.s3.send(command)
    console.log('Objetos listados com sucesso!', paramsS3.Bucket)
    return data
  }

}