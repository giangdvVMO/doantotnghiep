import { SEND_EMAIL_CONFIG } from 'src/configs/constant.config';
import * as sgMail from '@sendgrid/mail';

export const sendEmail = async (password: string, email: string) => {
  const key = SEND_EMAIL_CONFIG.sendGridApiKey;
  try {
    sgMail.setApiKey(key);
    const msg = {
      to: email,
      from: SEND_EMAIL_CONFIG.sesSendFrom,
      subject: SEND_EMAIL_CONFIG.subjectMail,
      html: `<strong>
        Username: ${email},
        <br/>
        password: <span style="color: blue;">${password}</span/>
      </strong>`,
    };
    await sgMail.send(msg);
  } catch (error) {
    // throw new BadRequestException(error);
  }
};
