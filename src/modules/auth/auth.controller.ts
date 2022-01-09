/**
 * @file Auth controller
 * @module module/auth/controller
 * @author Surmon <https://github.com/surmon-china>
 */

import { Controller, Get, Put, Post, Body, UseGuards, HttpStatus } from '@nestjs/common'
import { JwtAuthGuard } from '@app/guards/auth.guard'
import { IPService } from '@app/processors/helper/helper.service.ip'
import { EmailService } from '@app/processors/helper/helper.service.email'
import { HttpProcessor } from '@app/decorators/http.decorator'
import { QueryParams } from '@app/decorators/query-params.decorator'
import { Auth, AuthPasswordPayload } from './auth.model'
import { AuthService } from './auth.service'
import { TokenResult } from './auth.interface'
import { APP } from '@app/app.config'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly ipService: IPService,
    private readonly emailService: EmailService,
    private readonly authService: AuthService
  ) {}

  @Post('login')
  @HttpProcessor.handle({ message: 'Login', error: HttpStatus.BAD_REQUEST })
  async login(@QueryParams() { visitor: { ip } }, @Body() body: AuthPasswordPayload): Promise<TokenResult> {
    const token = await this.authService.adminLogin(body.password)
    this.ipService.queryLocation(ip).then((location) => {
      const subject = `App has new login activity`
      const locationText = location ? [location.country, location.region, location.city].join(' · ') : 'unknow'
      const content = `${subject}, IP: ${ip}, location: ${locationText}`
      this.emailService.sendMailAs(APP.NAME, {
        to: APP.EMAIL,
        subject,
        text: content,
        html: content,
      })
    })
    return token
  }

  @Get('admin')
  @HttpProcessor.handle('Get admin info')
  getAdminInfo(): Promise<Auth> {
    return this.authService.getAdminInfo()
  }

  @Put('admin')
  @UseGuards(JwtAuthGuard)
  @HttpProcessor.handle('Update admin info')
  putAdminInfo(@Body() auth: Auth): Promise<Auth> {
    return this.authService.putAdminInfo(auth)
  }

  // check token
  @Post('check')
  @UseGuards(JwtAuthGuard)
  @HttpProcessor.handle('Check token')
  checkToken(): string {
    return 'ok'
  }

  // refresh token
  @Post('renewal')
  @UseGuards(JwtAuthGuard)
  @HttpProcessor.handle('Renewal Token')
  renewalToken(): TokenResult {
    return this.authService.createToken()
  }
}
