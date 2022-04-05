import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as config from 'config';

// import { SwaggerModule, DocumentBuilder, SwaggerDocumentOptions, ExpressSwaggerCustomOptions } from '@nestjs/swagger';
import { AuthModule } from './auth/auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const port = await config.get('server').port;
  

  
  app.enableCors();
  await app.listen(port || 3000);
}
bootstrap();

  // const authBuilderOption = new DocumentBuilder()
  //   .setTitle('Code Solve')
  //   .setDescription('Svelte(pages) + Nest(server) 로 개발된 Code QnA 서비스')
  //   .setVersion('@0.1.0')
  // //   .addTag('Auth')
  //   .build();

  // const authSwaggerOption: SwaggerDocumentOptions = {
  //   include: [AuthModule],
  //   deepScanRoutes: false,
  // }
  // const authExpressOption: ExpressSwaggerCustomOptions = {
  //   explorer: true,
  //   customSiteTitle: 'Code Solve - API DOCS',
  // }
  
  // const authDocument = SwaggerModule.createDocument(app, authBuilderOption, authSwaggerOption);
  // SwaggerModule.setup('api/', app, authDocument, authExpressOption);