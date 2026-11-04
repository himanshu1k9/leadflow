import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  /**
   * Setting global prefix
   */
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
