import nodemailer, { Transporter } from 'nodemailer'
import path from 'path'

export interface SendMailOptions {
  to: string | string[]
  subject: string
  htmlBody: string
  attachments?: Attachment[]
}

export interface Attachment {
  filename: string
  path: string
}

export class EmailService {
  private transporter: Transporter
  constructor(mailerService: string, mailerEmail: string, senderEmailPassword: string) {
    this.transporter = nodemailer.createTransport({
      service: mailerService,
      auth: {
        user: mailerEmail,
        pass: senderEmailPassword
      }
    })
  }

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options

    try {
      const sendInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments
      })

      return true
    } catch (error) {
      return false
    }
  }
}
