import { Module } from "@nestjs/common";
import { AppConfigModule } from "@/configs/app-config/app-config.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { postgresConfig } from "@/configs/database/postgres.config";
import { ServeStaticModule } from "@nestjs/serve-static";

import { join } from "node:path";

@Module({
    imports: [
        AppConfigModule,
        TypeOrmModule.forRootAsync(postgresConfig),
        ServeStaticModule.forRoot({
            rootPath: join(process.cwd(), "public"),
            serveRoot: "/static"
        })
    ]
})
export class AppModule {}
