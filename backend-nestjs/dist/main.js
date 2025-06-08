"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:3002',
        ],
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('InvoiceApp API')
        .setDescription('API dla aplikacji fakturowej')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    const port = process.env.PORT || 5000;
    await app.listen(port);
    console.log(`🚀 Server is listening on port ${port}`);
    console.log(`📊 Swagger docs available at http://localhost:${port}/api-docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map