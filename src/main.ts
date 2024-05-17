import { NestFactory } from '@nestjs/core'
import { LogLevel, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import helmet from 'helmet'
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino'
import * as process from 'process'

import { AppModule } from './app.module'

function getLogLevels(): LogLevel[] {
  if (process.env.NODE_ENV === 'production') {
    return ['log', 'warn', 'error']
  }
  return ['error', 'warn', 'log', 'verbose', 'debug']
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevels(),
    bufferLogs: true,
  })
  // app.setGlobalPrefix('api')
  const configService = app.get(ConfigService)
  app.useLogger(app.get(Logger))
  app.useGlobalInterceptors(new LoggerErrorInterceptor())
  app.use(helmet())
  app.enableCors()
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: /false/.test(configService.get('enable_api_error_messages')),
      whitelist: true,
    })
  )

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Cofradia API')
    .setDescription('The Cofradia API description')
    .setVersion('1.0')
    .addTag('Cofradia')
    .build()
  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document)
  await app.listen(configService.get('port'))
}
bootstrap()
