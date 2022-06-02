import mailjet, {Email} from "node-mailjet";
import {ApiError} from "./Errors/ApiError";
import {ErrorCode} from "./Errors/ErrorCode";

const MAILJET_API_KEY = process.env.MAILJET_API_KEY || '8f453bcef5f39804845b49ec5feb2318';
const MAILJET_API_SECRET = process.env.MAILJET_API_KEY || '0c213c6282205ba0dfe3df81efa064dd';
const FROM_EMAIL  = process.env.MAILJET_FROM_EMAIL || 'r_dreidemy@hetic.eu';
const FROM_NAME   = 'Challenge';

export class Mailer {
  private static transporter: Email.Client;

  static get Transporter(): Email.Client {
    this.transporter = mailjet.connect(MAILJET_API_KEY, MAILJET_API_SECRET);
    return this.transporter;
  }

  public static async send(emailTo: string, subject: string, textMessage: string, htmlMessage: string) {
    const transporter = this.Transporter;

    const request = transporter
      .post("send", {'version': 'v3.1'})
      .request({
        Messages: [{
          "From": {
            "Email": FROM_EMAIL,
            "Name": FROM_NAME
          },
          "To": [{
            "Email": emailTo,
            "Name": emailTo
          }],
          "Subject": subject,
          "TextPart": textMessage,
          "HTMLPart": htmlMessage
        }]
      });

    request
      .catch((err) => {
        throw new ApiError(ErrorCode.InternalError, 'mailer/unknown', `Mailer server error`, err);
      })
  }
}
