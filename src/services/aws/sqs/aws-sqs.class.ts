import {
  DeleteMessageCommand,
  DeleteMessageCommandInput,
  DeleteMessageCommandOutput,
  ReceiveMessageCommand,
  ReceiveMessageCommandInput,
  ReceiveMessageCommandOutput,
  SQSClient,
  SQSClientConfig,
  SendMessageCommand,
  SendMessageCommandInput,
  SendMessageCommandOutput,
} from '@aws-sdk/client-sqs'

export class SQSService {
  private sqs: SQSClient

  constructor(configAWS: SQSClientConfig) {
    this.sqs = new SQSClient(configAWS)
  }

  async sendMessage(paramsSQS: SendMessageCommandInput): Promise<SendMessageCommandOutput> {
    const command = new SendMessageCommand(paramsSQS)
    const data = await this.sqs.send(command)
    console.log('Mensagem enviada para a fila com sucesso!', data.MessageId)
    return data
  }

  async receiveMessage(paramsSQS: ReceiveMessageCommandInput): Promise<ReceiveMessageCommandOutput> {
    const command = new ReceiveMessageCommand(paramsSQS)
    const data = await this.sqs.send(command)
    console.log('Mensagem recebida da fila com sucesso!')
    return data
  }

  async deleteMessage(paramsSQS: DeleteMessageCommandInput): Promise<DeleteMessageCommandOutput> {
    const command = new DeleteMessageCommand(paramsSQS)
    const data = await this.sqs.send(command)
    console.log('Mensagem deletada da fila com sucesso!')
    return data
  }
}
