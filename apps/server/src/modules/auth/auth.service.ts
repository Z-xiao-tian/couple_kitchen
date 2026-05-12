import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AppConfigService } from "@/configs/app-config/app-config.service";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "@/entities/user.entity";
import { Repository } from "typeorm";
import { LoginDto } from "@/modules/auth/dto/login.dto";
import { WechatCodeSessionResponse } from "@/modules/auth/types/wechat-code-session.type";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly appConfig: AppConfigService
    ) {}

    async login(data: LoginDto) {
        const session = await this.code2Session(data.code);
        if (!session.openid) {
            throw new UnauthorizedException(session.errmsg || "微信登录失败");
        }
        const user = await this.userRepository.findOne({
            where: {
                openid: session.openid
            }
        });
        if (!user) return;
        return;
    }

    private async code2Session(code: string): Promise<WechatCodeSessionResponse> {
        const appid = this.appConfig.WX_APPID;
        const secret = this.appConfig.WX_SECRET;
        if (!appid || !secret) {
            throw new Error("缺少微信小程序 appid 或 secret");
        }
        const url = new URL("https://api.weixin.qq.com/sns/jscode2session");
        url.searchParams.set("appid", appid);
        url.searchParams.set("secret", secret);
        url.searchParams.set("js_code", code);
        url.searchParams.set("grant_type", "authorization_code");
        const response = await fetch(url.toString());
        if (!response.ok) {
            throw new UnauthorizedException("请求微信登录接口失败");
        }
        const data = await response.json();
        if (data.errcode) {
            throw new UnauthorizedException(data.errmsg || "微信 code 校验失败");
        }
        return data;
    }
}
