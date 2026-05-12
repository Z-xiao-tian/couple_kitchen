import { AppConfigService } from "@/configs/app-config/app-config.service";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import path from "path";

export const postgresConfig: TypeOrmModuleAsyncOptions = {
    inject: [AppConfigService],
    useFactory: (appConfigService: AppConfigService) => {
        console.log(process.env.NODE_ENV);
        return {
            type: "postgres",
            host: appConfigService.POSTGRES_HOST,
            port: appConfigService.POSTGRES_PORT,
            username: appConfigService.POSTGRES_USERNAME,
            password: appConfigService.POSTGRES_PASSWORD,
            database: appConfigService.POSTGRES_DATABASE,
            schema: appConfigService.POSTGRES_SCHEMA,
            entities: [path.join(__dirname, "..", "..", "entities", "*.entity.{ts,js}")],
            autoLoadEntities: true,
            synchronize: process.env.NODE_ENV === "development",
            namingStrategy: new SnakeNamingStrategy()
        };
    }
};
