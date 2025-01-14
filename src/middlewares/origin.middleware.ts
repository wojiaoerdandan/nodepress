/**
 * @file Origin middleware
 * @module middleware/origin
 * @author Surmon <https://github.com/surmon-china>
 */

import { Request, Response } from 'express'
import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common'
import { HttpResponseError, ResponseStatus } from '@app/interfaces/response.interface'
import { isProdEnv } from '@app/app.environment'
import { CROSS_DOMAIN } from '@app/app.config'
import * as TEXT from '@app/constants/text.constant'

/**
 * @class OriginMiddleware
 * @classdesc 用于验证是否为非法来源请求
 */
@Injectable()
export class OriginMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next) {
    // referer when production
    if (isProdEnv) {
      const { origin, referer } = request.headers
      const isAllowed = (field) => !field || field.includes(CROSS_DOMAIN.allowedReferer)
      const isAllowedOrigin = isAllowed(origin)
      const isAllowedReferer = isAllowed(referer)
      if (!isAllowedOrigin && !isAllowedReferer) {
        return response.status(HttpStatus.UNAUTHORIZED).jsonp({
          status: ResponseStatus.Error,
          message: TEXT.HTTP_ANONYMOUS_TEXT,
          error: null,
        } as HttpResponseError)
      }
    }

    return next()
  }
}
