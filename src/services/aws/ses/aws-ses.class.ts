import {
  CreateTemplateCommand,
  CreateTemplateCommandInput,
  CreateTemplateCommandOutput,
  DeleteTemplateCommand,
  DeleteTemplateCommandInput,
  DeleteTemplateCommandOutput,
  ListTemplatesCommand,
  ListTemplatesCommandInput,
  ListTemplatesCommandOutput,
  SESClient,
  SESClientConfig,
  SendEmailCommand,
  SendEmailCommandInput,
  SendEmailCommandOutput,
  UpdateTemplateCommand,
  UpdateTemplateCommandInput,
  UpdateTemplateCommandOutput,
} from '@aws-sdk/client-ses'

export class SESService {
  private ses: SESClient

  constructor(configAWS: SESClientConfig) {
    this.ses = new SESClient(configAWS)
  }

  async sendEmail(paramsSQS: SendEmailCommandInput): Promise<SendEmailCommandOutput> {
    const command = new SendEmailCommand(paramsSQS)
    const data = await this.ses.send(command)
    console.log('Email enviado com sucesso!', data.MessageId)
    return data
  }

  async createTemplate(paramsSQS: CreateTemplateCommandInput): Promise<CreateTemplateCommandOutput> {
    const command = new CreateTemplateCommand(paramsSQS)
    const data = await this.ses.send(command)
    console.log('Template criado com sucesso!')
    return data
  }

  async updateTemplate(paramsSQS: UpdateTemplateCommandInput): Promise<UpdateTemplateCommandOutput> {
    const command = new UpdateTemplateCommand(paramsSQS)
    const data = await this.ses.send(command)
    console.log('Template atualizado com sucesso!')
    return data
  }

  async deleteTemplate(paramsSQS: DeleteTemplateCommandInput): Promise<DeleteTemplateCommandOutput> {
    const command = new DeleteTemplateCommand(paramsSQS)
    const data = await this.ses.send(command)
    console.log('Template deletado com sucesso!')
    return data
  }

  async listTemplates(paramsSQS: ListTemplatesCommandInput): Promise<ListTemplatesCommandOutput> {
    const command = new ListTemplatesCommand(paramsSQS)
    const data = await this.ses.send(command)
    console.log('Templates listados com sucesso!')
    return data
  }
}
