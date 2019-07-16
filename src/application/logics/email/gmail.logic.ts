const nodemailer = require("nodemailer");
const xoauth2 = require("xoauth2");

export class GmailLogic {
  public sendEmail(to: string, from: string, subject: string, html: string) {
    const msg = {
      from,
      to,
      subject,
      html
    };

    const transporter = nodemailer.createTransport(({
      // service: "gmail",
      host: "smtp.gmail.com",
      // port: 465,
      // secure: true,
      auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
          type: "OAuth2",
          user: "projectxleads@gmail.com",
          clientId: "70809994835-6a8egmeuvsuml1vk5ek6fhvpph9kucv3.apps.googleusercontent.com",
          clientSecret: "Yw-CoyVuyV90FvI1vvrumhn_",
          refreshToken: "1/6wtIS7E5nBXUGmAawKXX82yHdu15YLu_mu6qbyh5fnc",
        })
      }
    }));

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
