import { Global, Module } from "@nestjs/common";
import { AppConfigService } from "@/configs/app-config/app-config.service";
import { ConfigModule } from "@nestjs/config";

const environmentPath = `environments/.env.${process.env.NODE_ENV || "development"}`;

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ["environments/.env", environmentPath]
        })
    ],
    providers: [AppConfigService],
    exports: [AppConfigService]
})
export class AppConfigModule {}
