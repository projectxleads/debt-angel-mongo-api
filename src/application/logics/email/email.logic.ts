const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: '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'
  }
}));

export class EmailLogic {
  public sendEmail(to: string, from: string, subject: string, html: string) {
    const msg = {
      from,
      to,
      subject,
      html
    };
    return transporter.sendMail(msg).then((result: any) => {
      console.log("******Successful Send Mail******");
      console.log(result);
      console.log("******Successful Send Mail******");
    }).catch((error: any) => {
      console.log("******Failed To Send Mail******");
      console.log(error);
      console.log("******Failed To Send Mail******");
    });
  }
}
