import { Logger, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { PrismaService } from "./common/prisma.service";
import { cColor, isNull } from "./utils";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );
  app.setGlobalPrefix("/api/v1");
  const config = new DocumentBuilder()
    .setTitle("Social Wires Backend")
    .setDescription(
      "Social wires es una red social en la cual las personas publican mensajes , y las demas personas podrán reaccionar a estos, asi como tambien podran comentar a estas publicaciones "
    )
    .setVersion("1.0.0")
    .addOAuth2()
    .addBearerAuth(
      {
        description: "Default JWT Authorization",
        type: "http",
        in: "header",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
      "JWT-auth"
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document, {
    customSiteTitle: "",
    swaggerOptions: {
      docExpansion: "none",
      ignoreGlobalPrefix: true,
      filter: true,
      displayRequestDuration: true,
      deepLinking: true,
    },
  });
  const port = process.env["PORT"];
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  const logger = new Logger();
  return await app.listen(isNull(port) ? 3000 : port, () => {
    let porta = isNull(port) ? 3000 : port;
    logger.log(
      `🚀 ~ ${cColor.BGgreen}${cColor.black} file: main.ts:45 ~ bootstrap ~ port  = ${cColor.BGcyan}${porta}\x1b[0m \x1b[0m`
    );
  });
}
bootstrap();
