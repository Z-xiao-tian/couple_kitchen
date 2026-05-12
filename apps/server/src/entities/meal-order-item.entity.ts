import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "@/entities/base.entity";
import { MealOrderEntity } from "./meal-order.entity";
import { DishEntity } from "@/entities/dish.entity";

@Entity("meal_order_items")
export class MealOrderItemEntity extends BaseEntity {
    @Index()
    @Column({
        name: "order_id",
        type: "bigint",
        comment: "订单ID"
    })
    orderId!: string;

    @Index()
    @Column({
        name: "dish_id",
        type: "bigint",
        comment: "菜品ID"
    })
    dishId!: string;

    @Column({
        name: "dish_name",
        type: "varchar",
        length: 100,
        comment: "下单时菜品名称快照"
    })
    dishName!: string;

    @Column({
        name: "dish_image_url",
        type: "varchar",
        length: 500,
        nullable: true,
        comment: "下单时菜品图片快照"
    })
    dishImageUrl?: string | null;

    @Column({
        type: "int",
        default: 1,
        comment: "数量"
    })
    quantity!: number;

    @Column({
        type: "varchar",
        length: 300,
        nullable: true,
        comment: "单个菜品备注"
    })
    remark?: string | null;

    @ManyToOne(() => MealOrderEntity, (order) => order.items)
    @JoinColumn({
        name: "order_id"
    })
    order!: MealOrderEntity;

    @ManyToOne(() => DishEntity, (dish) => dish.orderItems)
    @JoinColumn({
        name: "dish_id"
    })
    dish!: DishEntity;
}
