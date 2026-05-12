import { Column, Entity, Index, OneToMany } from "typeorm";
import { BaseEntity } from "@/entities/base.entity";
import { DishFavoriteEntity } from "@/entities/dish-favorite.entity";
import { MealOrderEntity } from "@/entities/meal-order.entity";
import { FoodPreferenceEntity } from "@/entities/food-preference.entity";
import { InteractionRecordEntity } from "./interaction-record.entity";
import { UserRole } from "@/common/enums/user-role.enum";

@Entity("users")
export class UserEntity extends BaseEntity {
    @Column({
        type: "varchar",
        length: 50,
        comment: "昵称"
    })
    nickname!: string;

    @Column({
        name: "avatar",
        type: "varchar",
        length: 500,
        nullable: true,
        comment: "头像"
    })
    avatar?: string | null;

    @Index({ unique: true })
    @Column({
        type: "varchar",
        length: 100,
        nullable: true,
        comment: "微信小程序openid"
    })
    openid?: string | null;

    @Column({
        type: "varchar",
        length: 100,
        nullable: true,
        comment: "微信小程序unionid"
    })
    unionid?: string | null;

    @Column({
        type: "varchar",
        length: 30,
        default: UserRole.USER,
        comment: "角色：user普通用户/cook厨师"
    })
    role!: UserRole;

    @OneToMany(() => DishFavoriteEntity, (favorite) => favorite.user)
    favorites?: DishFavoriteEntity[];

    @OneToMany(() => MealOrderEntity, (order) => order.user)
    orders?: MealOrderEntity[];

    @OneToMany(() => MealOrderEntity, (order) => order.cookUser)
    cookOrders?: MealOrderEntity[];

    @OneToMany(() => FoodPreferenceEntity, (preference) => preference.user)
    preferences?: FoodPreferenceEntity[];

    @OneToMany(() => InteractionRecordEntity, (record) => record.fromUser)
    sentInteractions?: InteractionRecordEntity[];

    @OneToMany(() => InteractionRecordEntity, (record) => record.toUser)
    receivedInteractions?: InteractionRecordEntity[];
}
