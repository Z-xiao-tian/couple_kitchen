import { AppConfigService } from "@/configs/app-config/app-config.service";
import { RedisOptions } from "ioredis/built/redis/RedisOptions";

export function getRedisConfig(appConfigService: AppConfigService): RedisOptions {
    return {
        host: appConfigService.REDIS_HOST,
        port: appConfigService.REDIS_PORT,
        password: appConfigService.REDIS_PASSWORD,
        db: appConfigService.REDIS_DB
    };
}
