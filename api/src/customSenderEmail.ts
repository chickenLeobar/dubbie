import { normalizeString } from "@vendure/common/lib/normalize-string";
import { assertNever } from "@vendure/common/lib/shared-utils";
import { Logger } from "@vendure/core";
import fs from "fs-extra";
import nodemailer from "nodemailer";
import { default as Mail } from "nodemailer/lib/mailer";
import { LoggerLevel } from "nodemailer/lib/shared";
import path from "path";
import { Stream } from "stream";
import { format } from "util";
import { loggerCtx } from "@vendure/email-plugin/lib/src/constants";
import {
  EmailDetails,
  EmailSender,
  EmailTransportOptions,
  SendmailTransportOptions,
  SMTPTransportOptions,
} from "@vendure/email-plugin";
import { createTestAccount, createTransport } from "nodemailer";
export type StreamTransportInfo = {
  envelope: {
    from: string;
    to: string[];
  };
  messageId: string;
  message: Stream;
};

/**
 * @description
 * Uses the configured transport to send the generated email.
 *
 * @docsCategory EmailPlugin
 * @docsPage EmailSender
 */
export class NodemailerEmailSender implements EmailSender {
  private _smtpTransport: Mail | undefined;
  private _sendMailTransport: Mail | undefined;

  async send(email: EmailDetails, options: EmailTransportOptions) {
    console.log("");

    switch (options.type) {
      case "none":
        return;
        break;
      case "file":
        const fileName = normalizeString(
          `${new Date().toISOString()} ${email.recipient} ${email.subject}`,
          "_"
        );
        const filePath = path.join(options.outputPath, fileName);
        let testAccount = await createTestAccount();
        let transporter = createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
          },
        });
        let info = await transporter.sendMail({
          from: '"Fred Foo 👻" <foo@example.com>', // sender address
          to: "bar@example.com, baz@example.com", // list of receivers
          subject: "Hello ✔", // Subject line
          text: "Hello world?", // plain text body
          html: email.body, // html body
        });
        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

        if (options.raw) {
          await this.sendFileRaw(email, filePath);
        } else {
          await this.sendFileJson(email, filePath);
        }
        break;
      case "sendmail":
        await this.sendMail(email, this.getSendMailTransport(options));
        break;
      case "smtp":
        await this.sendMail(email, this.getSmtpTransport(options));
        break;
      case "testing":
        options.onSend(email);
        break;
      default:
        return assertNever(options);
    }
  }

  private getSmtpTransport(options: SMTPTransportOptions) {
    if (!this._smtpTransport) {
      (options as any).logger = options.logging ? this.createLogger() : false;
      this._smtpTransport = createTransport(options);
    }
    return this._smtpTransport;
  }

  private getSendMailTransport(options: SendmailTransportOptions) {
    if (!this._sendMailTransport) {
      this._sendMailTransport = createTransport({ sendmail: true, ...options });
    }
    return this._sendMailTransport;
  }

  private async sendMail(email: EmailDetails, transporter: Mail): Promise<any> {
    return transporter.sendMail({
      from: email.from,
      to: email.recipient,
      subject: email.subject,
      html: email.body,
      attachments: email.attachments,
      cc: email.cc,
      bcc: email.bcc,
      replyTo: email.replyTo,
    });
  }

  private sendFileToTestAccount() {}

  private async sendFileJson(email: EmailDetails, pathWithoutExt: string) {
    const output = {
      date: new Date().toLocaleString(),
      from: email.from,
      recipient: email.recipient,
      subject: email.subject,
      body: email.body,
      cc: email.cc,
      bcc: email.bcc,
      replyTo: email.replyTo,
    };

    await fs.writeFile(
      pathWithoutExt + ".json",
      JSON.stringify(output, null, 2)
    );
  }

  private async sendFileRaw(email: EmailDetails, pathWithoutExt: string) {
    const transporter = createTransport({
      streamTransport: true,
      buffer: true,
    });
    const result = await this.sendMail(email, transporter);
    await this.writeStreamToFile(pathWithoutExt + ".txt", result);
  }

  private async writeStreamToFile(
    filePath: string,
    info: StreamTransportInfo
  ): Promise<string> {
    const writeStream = fs.createWriteStream(filePath);
    return new Promise<string>((resolve, reject) => {
      writeStream.on("open", () => {
        info.message.pipe(writeStream);
        writeStream.on("close", resolve);
        writeStream.on("error", reject);
      });
    });
  }

  /**
   * Adapts the VendureLogger to work with the bunyan-compatible logger format
   * used by Nodemailer.
   */
  private createLogger() {
    function formatError(args: [object, string, ...string[]]) {
      const [ctx, message, ...params] = args;
      return format(message, ...params);
    }
    return {
      level(level: LoggerLevel) {
        /* noop */
      },
      trace(...params: any) {
        Logger.debug(formatError(params), loggerCtx);
      },
      debug(...params: any) {
        Logger.verbose(formatError(params), loggerCtx);
      },
      info(...params: any) {
        Logger.info(formatError(params), loggerCtx);
      },
      warn(...params: any) {
        Logger.warn(formatError(params), loggerCtx);
      },
      error(...params: any) {
        Logger.error(formatError(params), loggerCtx);
      },
      fatal(...params: any) {
        Logger.error(formatError(params), loggerCtx);
      },
    };
  }
}
