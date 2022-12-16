import { SEND_EMAIL_CONFIG } from 'src/configs/constant.config';
import * as nodemailer from 'nodemailer';

export const sendEmail = async (
  title: string,
  send_email: string,
  company: any,
  receiver: any,
  content: string,
) => {
  try {
    console.log('receiver', receiver);
    const transport = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      auth: {
        user: SEND_EMAIL_CONFIG.adminMail,
        pass: SEND_EMAIL_CONFIG.pass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const html = `<html><body style="box-sizing: border-box; background-color: rgba(255, 117, 117, 0.151); margin: 0px;padding: 0px;width:100%;">
    <div style="margin: 0 auto; width:100%; max-width: 800px; background-color: white; padding-bottom: 10px;">
          <div style="background-color: orange;box-sizing: border-box; text-align: center; width:100%;padding: 20px; font-weight: 900; font-size: 25px">Thư mời tuyển dụng</div>
          <h3 style="color:brown; padding-left:5px">Chào bạn,</h3>
          <div style="background-color: pink; margin: 10px;box-sizing: border-box; padding: 5px; border-radius: 10px;">
            <h4 >Câu nói dành cho bạn:<h4>
            <h4 style="text-align: center;">“Programming is not about what you know; it is about what you can figure out.”<h4>
            <div style="text-align: center;"><i >- Chris Pine -</i></div>
          </div>
          <h3 style="color:brown ; padding-left:5px">Thông tin công ty:</h3>
          <table style="width:100%; padding: 10px;">
               <div style="width:100%; padding: 10px;">
                  <div style="text-align:center"><img  style="height:200px; width: 200px; border-radius: 50%;" src="https://i.ibb.co/vD4JfCf/Mobile-login-amico.png"/></div>
                </div>
                <div style="width:100%; padding: 10px;">
                    <div style="box-sizing: border-box;background-color: orange; display:flex;align-item: center; justify-content:center; width:100%;padding: 20px; border-radius: 30px; font-weight: 900; font-size: 15px">${company.com_name}</div>	
                    <table style="padding: 10px; width: 100%">
                        <tr>
                          <th><h5 style="color: orange">Quy mô:</h5></th>
                          <th><h5 style="color: orange">Địa chỉ:</h5></th>
                          <th><h5 style="color: orange">Website:</h5></th>
                            <th><h5 style="color: orange">SĐT công ty:</h5></th>
                        </tr>
                         <tr>
                            <th><h5>${company.scale} người</h5></th>
                            <th><h5>${company.address}</h5></th>
                             <th><h5 style="">${company.website}</h5></th>
                            <th><h5 style="">${company.com_phone}</h5></th>
                            </tr>
                    </table>
                </div>
          </table>
          <h3 style="color:brown ; padding-left:5px">Nội dung thư mời:</h3>
          <h4 style="padding:20px;"><strong>${content}</strong></h4>
          <h3 style="color:brown ; padding-left:5px">Bạn có thể phản hồi với email: <i>${send_email}</i></h3>
          <div style="margin: 0 auto; width: 100px; padding:10px;background-color: orange;text-align: center; border-radius: 20px;"><a style="text-decoration: none; color: black" href='http://localhost:5000/student/company/1'>Xem công ty</a>
          </div>
    </div></body></html>`;
    // mailOption là những thông tin gửi từ phía client lên thông qua API
    const mailOptions = {
      from: SEND_EMAIL_CONFIG.adminMail,
      to: receiver.email,
      subject: title, // Tiêu đề email
      html: html,
    };
    // Gọi hành động gửi email
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log(error);
    // throw new BadRequestException(error);
  }
};
