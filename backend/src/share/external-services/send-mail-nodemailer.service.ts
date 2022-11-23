import * as nodemailer from 'nodemailer';
// import { OAuth2Client } from 'google-auth-library';
import { BadRequestException } from '@nestjs/common';
import { MessageClient } from 'cloudmailin';

// Khởi tạo NodeJS App bằng Express
// Cho phép nhận data thông qua req.body của API gửi lên.
/**
 * Những biến sau trong thực tế nên đưa vào biến môi trường ENV vì mục đích bảo mật hơn.
 * Các bạn có thể tham khảo khóa Lập Trình MERN Stack nâng cao trên kênh YouTube:
 *  Trungquandev Official của mình để học cách triển khai & tổ chức code như đi làm thực tế nhé.
 * Link: https://www.youtube.com/c/TrungquandevOfficial/
 */
const APP_PORT = 5000;
const APP_HOST = 'localhost';
const GOOGLE_MAILER_CLIENT_ID =
  '846463612277-hf4jcudvts4f53ma8d3dlrtlh19pvrnv.apps.googleusercontent.com';
const GOOGLE_MAILER_CLIENT_SECRET = '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';
const GOOGLE_MAILER_REFRESH_TOKEN =
  '1//04c95x_eJWfPICgYIARAAGAQSNwF-L9IrPCuMjWkEw_HhMQHs7b5eP5t4Ny6HcMTwi_KZmTeRNNJrOZvDZx8YP9PaSftg7ktb064';
const ADMIN_EMAIL_ADDRESS = 'giangdv@vmodev.com';
// Khởi tạo OAuth2Client với Client ID và Client Secret
// const myOAuth2Client = new OAuth2Client(
//   GOOGLE_MAILER_CLIENT_ID,
//   GOOGLE_MAILER_CLIENT_SECRET,
// );
// Set Refresh Token vào OAuth2Client Credentials
// myOAuth2Client.setCredentials({
//   refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
// });
// Tạo API /email/send với method POST
export const sendNodeMailer = async (
  email: string,
  subject: string,
  content: string,
) => {
  try {
    const client = new MessageClient({
      username: '602b2f948c506dea',
      apiKey: 'H7uNhTV8XczgQ4Co1i1PVBQ2',
    });
    const response = await client.sendMessage({
      from: 'giangdv@vmodev.com',
      to: email,
      plain: 'test message',
      html: `<h1>${content}</h1>`,
      subject: subject,
    });
    return response;
    // if (!email || !subject || !content)
    //   throw new Error('Please provide email, subject and content!');
    // const transport = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: 'giangdv@vmodev.com',
    //     pass: 'iapbeokyymjkjpqz',
    //     // type: 'OAuth2',
    //     // user: ADMIN_EMAIL_ADDRESS,
    //     // clientId: GOOGLE_MAILER_CLIENT_ID,
    //     // clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
    //     // refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
    //     // accessToken: myAccessToken || '',
    //   },
    // });
    // // mailOption là những thông tin gửi từ phía client lên thông qua API
    // const mailOptions = {
    //   from: 'giangdv@vmodev.com',
    //   to: email, // Gửi đến ai?
    //   subject: subject, // Tiêu đề email
    //   html: `<h3>${content}</h3>`, // Nội dung email
    // };
    // // Gọi hành động gửi email
    // await transport.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    // throw new (error.message);
  }
};
