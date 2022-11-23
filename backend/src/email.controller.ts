import { Controller, Get, Post, Query } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('email')
export class EmailController {
  constructor(private mailerService: MailerService) {}
  @Get('sendGrid')
  async sendGrid() {
    const x = await this.mailerService.sendMail({
      to: '1dovangiang@gmail.com',
      from: 'giangdv@vmodev.com',
      subject: 'hi',
      text: 'hi',
    });
    return x;
  }
}
