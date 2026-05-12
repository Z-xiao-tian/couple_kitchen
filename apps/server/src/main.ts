import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Logger } from "@nestjs/common";
import { AppModule } from "@/app.module";
import type { NextFunction, Request, Response } from "express";
import { AppConfigService } from "@/configs/app-config/app-config.service";
import { NestExpressApplication } from "@nestjs/platform-express";

const API_DOC_TITLE = "COUPLE_KITCHEN";
const API_DOC_DESCRIPTION = "家庭厨房 API 文档";
const API_DOC_VERSION = "1.0.0";
const API_DOC_URL = "/docs";

async function main() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    const appConfig = app.get(AppConfigService);

    const swaggerConfig = new DocumentBuilder()
        .setTitle(API_DOC_TITLE)
        .setDescription(API_DOC_DESCRIPTION)
        .setVersion(API_DOC_VERSION)
        .addBearerAuth(
            {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                description: "填写登录接口返回的 accessToken"
            },
            "bearer"
        )
        .build();
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

    SwaggerModule.setup(API_DOC_URL, app, swaggerDocument, {
        customSiteTitle: API_DOC_DESCRIPTION,
        jsonDocumentUrl: "docs/json"
    });

    const logger = new Logger("HTTP");
    app.use((req: Request, res: Response, next: NextFunction) => {
        const start = Date.now();
        const { method, originalUrl } = req;
        const ip = req.ip || req.socket.remoteAddress;
        res.on("finish", () => {
            const duration = Date.now() - start;
            logger.log(`${ip} ${method} ${originalUrl} ${res.statusCode} ${duration}ms`);
        });
        next();
    });

    await app.listen(appConfig.PORT);
    Logger.log(`Server listening on port ${appConfig.PORT}`);
}

void main();
