import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

type JwtExpiresUnit = "s" | "m" | "h" | "d";

@Injectable()
export class AppConfigService {
    constructor(private readonly configService: ConfigService) {}

    /**
     * 系统启动端口，获取环境变量中的`PORT`配置
     */
    get PORT(): number {
        return Number(this.getEnvironmentValue("PORT"));
    }

    get AUTH_RSA_PRIVATE_KEY(): string {
        return this.getEnvironmentValue("AUTH_RSA_PRIVATE_KEY").replace(/\\\\n/g, "\n").replace(/\\n/g, "\n");
    }

    get JWT_SECRET(): string {
        return this.getEnvironmentValue("JWT_SECRET");
    }

    get JWT_EXPIRES_IN(): number {
        return this.parseDuration(this.getEnvironmentValue("JWT_EXPIRES_IN"));
    }

    get JWT_ACCESS_SECRET(): string {
        return this.getEnvironmentValue("JWT_ACCESS_SECRET");
    }

    get JWT_REFRESH_SECRET(): string {
        return this.getEnvironmentValue("JWT_REFRESH_SECRET");
    }

    get JWT_ACCESS_EXPIRES_IN(): string {
        return this.getEnvironmentValue("JWT_ACCESS_EXPIRES_IN");
    }

    get JWT_REFRESH_EXPIRES_IN(): string {
        return this.getEnvironmentValue("JWT_REFRESH_EXPIRES_IN");
    }

    get JWT_ACCESS_EXPIRES_IN_SECONDS(): number {
        return this.parseDuration(this.JWT_ACCESS_EXPIRES_IN);
    }

    get JWT_REFRESH_EXPIRES_IN_SECONDS(): number {
        return this.parseDuration(this.JWT_REFRESH_EXPIRES_IN);
    }

    private parseDuration(rawValue: string): number {
        const match = /^(\d+)([smhd])$/.exec(rawValue);
        if (!match) return 7 * 24 * 60 * 60;
        const amount = Number(match[1]);
        const unit = match[2] as JwtExpiresUnit;
        switch (unit) {
            case "s":
                return amount;
            case "m":
                return amount * 60;
            case "h":
                return amount * 60 * 60;
            case "d":
                return amount * 24 * 60 * 60;
        }
    }

    /**
     * PGSql数据库主机，获取环境变量中的`POSTGRES_HOST`配置
     */
    get POSTGRES_HOST(): string {
        return this.getEnvironmentValue("POSTGRES_HOST");
    }

    /**
     * PGSql数据库端口，获取环境变量中的`POSTGRES_PORT`配置
     */
    get POSTGRES_PORT(): number {
        return Number(this.getEnvironmentValue("POSTGRES_PORT"));
    }

    /**
     * PGSql数据库用户名，获取环境变量中的`POSTGRES_USERNAME`配置
     */
    get POSTGRES_USERNAME(): string {
        return this.getEnvironmentValue("POSTGRES_USERNAME");
    }

    /**
     * PGSql数据库密码，获取环境变量中的`POSTGRES_PASSWORD`配置
     */
    get POSTGRES_PASSWORD(): string {
        return this.getEnvironmentValue("POSTGRES_PASSWORD");
    }

    /**
     * PGSql数据库数据库名，获取环境变量中的`POSTGRES_DATABASE`配置
     */
    get POSTGRES_DATABASE(): string {
        return this.getEnvironmentValue("POSTGRES_DATABASE");
    }

    /**
     * PGSql数据库模式，获取环境变量中的`POSTGRES_SCHEMA`配置
     */
    get POSTGRES_SCHEMA(): string {
        return this.getEnvironmentValue("POSTGRES_SCHEMA");
    }

    /**
     * Redis主机，获取环境变量中的`REDIS_HOST`配置
     */
    get REDIS_HOST(): string {
        return this.getEnvironmentValue("REDIS_HOST");
    }

    /**
     * Redis端口，获取环境变量中的`REDIS_PORT`配置
     */
    get REDIS_PORT(): number {
        return Number(this.getEnvironmentValue("REDIS_PORT"));
    }

    /**
     * Redis密码，获取环境变量中的`REDIS_PASSWORD`配置
     */
    get REDIS_PASSWORD(): string {
        return this.getEnvironmentValue("REDIS_PASSWORD");
    }

    /**
     * Redis数据库索引，获取环境变量中的`REDIS_DB`配置
     */
    get REDIS_DB(): number {
        return Number(this.getEnvironmentValue("REDIS_DB"));
    }

    get WX_APPID(): string {
        return this.getEnvironmentValue("WX_APPID");
    }

    get WX_SECRET(): string {
        return this.getEnvironmentValue("WX_SECRET");
    }

    private getEnvironmentValue(key: string): string {
        const value = this.configService.get<string>(key);
        if (!value) {
            throw new Error(`环境变量 ${key} 未配置`);
        }
        return value;
    }
}
