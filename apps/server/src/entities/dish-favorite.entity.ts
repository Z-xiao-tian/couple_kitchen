import { Column, Entity, Index, JoinColumn, ManyToOne, Unique } from "typeorm";
import { BaseEntity } from "@/entities/base.entity";
import { UserEntity } from "@/entities/user.entity";
import { DishEntity } from "./dish.entity";

@Entity("dish_favorites")
@Unique("uk_user_dish", ["userId", "dishId"])
export class DishFavoriteEntity extends BaseEntity {
    @Index()
    @Column({
        name: "user_id",
        type: "bigint",
        comment: "用户ID"
    })
    userId!: string;

    @Index()
    @Column({
        name: "dish_id",
        type: "bigint",
        comment: "菜品ID"
    })
    dishId!: string;

    @ManyToOne(() => UserEntity, (user) => user.favorites)
    @JoinColumn({
        name: "user_id"
    })
    user!: UserEntity;

    @ManyToOne(() => DishEntity, (dish) => dish.favorites)
    @JoinColumn({
        name: "dish_id"
    })
    dish!: DishEntity;
}
