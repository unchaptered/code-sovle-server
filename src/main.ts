import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';


// Security
// import helmet from 'helmet';
// import { helmetOptions } from './secure/hemlet.options';
// import { ForbiddenException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors:true });
  
  // app.use(helmet.noSniff()); // Protector about hack
  // app.use(helmet.hidePoweredBy()); // Hide about framework
  // app.use(helmet.xssFilter()); // Prevent about error
  // app.use(helmet(helmetOptions)); // Secure Options

  app.enableCors(); // CORS Pretector
  
  await app.listen(4000 || +process.env.PORT);
  Logger.log(`Server is running on ${4000 || process.env.PORT}`);
}
bootstrap();