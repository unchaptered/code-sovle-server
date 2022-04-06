import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Security
import helmet from 'helmet';
import { helmetOptions } from './secure/hemlet.options';
import { corsOption } from './secure/cors.options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // app.use(helmet.noSniff()); // Protector about hack
  // app.use(helmet.hidePoweredBy()); // Hide about framework
  // app.use(helmet.xssFilter()); // Prevent about error
  // app.use(helmet(helmetOptions)); // Secure Options

  // app.enableCors(corsOption); // CORS Pretector

  await app.listen(+process.env.PORT || 3000);
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