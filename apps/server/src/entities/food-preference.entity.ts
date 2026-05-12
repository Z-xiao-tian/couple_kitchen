import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "@/entities/base.entity";
import { UserEntity } from "@/entities/user.entity";
import { DishEntity } from "@/entities/dish.entity";
import { FoodPreference } from "@/common/enums/food-preference.enum";
import { FoodPreferenceTarget } from "@/common/enums/food-preference-target.enum";

@Entity("food_preferences")
export class FoodPreferenceEntity extends BaseEntity {
    @Index()
    @Column({
        name: "user_id",
        type: "bigint",
        comment: "用户ID"
    })
    userId!: string;

    @Index()
    @Column({
        type: "varchar",
        length: 30,
        comment: "类型：like/dislike/avoid/taste"
    })
    type!: FoodPreference;

    @Index()
    @Column({
        name: "target_type",
        type: "varchar",
        length: 30,
        comment: "对象类型：dish/ingredient/tag/text"
    })
    targetType!: FoodPreferenceTarget;

    @Column({
        name: "target_id",
        type: "bigint",
        nullable: true,
        comment: "对象ID，例如菜品ID"
    })
    targetId?: string | null;

    @Column({
        name: "target_name",
        type: "varchar",
        length: 100,
        comment: "对象名称，例如香菜、微辣、可乐鸡翅"
    })
    targetName!: string;

    @ManyToOne(() => UserEntity, (user) => user.preferences)
    @JoinColumn({
        name: "user_id"
    })
    user!: UserEntity;

    @ManyToOne(() => DishEntity, {
        nullable: true
    })
    @JoinColumn({
        name: "target_id"
    })
    targetDish?: DishEntity | null;
}
