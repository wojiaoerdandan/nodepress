/**
 * App entry module.
 * @file Index 入口文件
 * @module app.main
 * @author Surmon <https://github.com/surmon-china>
 */

import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@app/app.module';
import * as appConfig from '@app/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  return await app.listen(appConfig.APP.PORT);
}

bootstrap().then(_ => {
  console.info(`NodePress Run！port at ${appConfig.APP.PORT}, env: ${appConfig.APP.ENVIRONMENT}`);
});
