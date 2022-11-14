import { SEND_EMAIL_CONFIG } from 'src/configs/constant.config';
import * as sgMail from '@sendgrid/mail';

export const sendEmail = async (
  title: string,
  send_email: string,
  company: any,
  receiver: any,
  content: string,
) => {
  const key = SEND_EMAIL_CONFIG.sendGridApiKey;
  try {
    console.log('receiver', receiver);
    sgMail.setApiKey(key);
    const msg = {
      to: receiver.email,
      from: SEND_EMAIL_CONFIG.sesSendFrom,
      subject: title,
      html: `<strong>
        Bạn nhận được thư mời phỏng vấn từ công ty: ${company.com_name}
        <br/>
        <div>${content}</div>
      </strong>
      <i>Bạn có thể phản hồi tới email: ${send_email}</i>`,
    };
    const result = await sgMail.send(msg);
    console.log('result', result);
  } catch (error) {
    console.log(error);
    // throw new BadRequestException(error);
  }
};
