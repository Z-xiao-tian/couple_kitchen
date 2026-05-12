import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "@/entities/base.entity";
import { UserEntity } from "@/entities/user.entity";
import { MealOrderItemEntity } from "./meal-order-item.entity";
import { InteractionRecordEntity } from "./interaction-record.entity";
import { MealOrderStatus } from "@/common/enums/meal-order-status.enum";

@Entity("meal_orders")
export class MealOrderEntity extends BaseEntity {
    @Index()
    @Column({
        name: "user_id",
        type: "bigint",
        comment: "点餐用户ID"
    })
    userId!: string;

    @Index()
    @Column({
        name: "cook_user_id",
        type: "bigint",
        nullable: true,
        comment: "接单厨师ID"
    })
    cookUserId?: string | null;

    @Index({
        unique: true
    })
    @Column({
        name: "order_no",
        type: "varchar",
        length: 50,
        comment: "订单编号"
    })
    orderNo!: string;

    @Index()
    @Column({
        type: "varchar",
        length: 30,
        default: MealOrderStatus.PENDING,
        comment: "状态：pending待接受/cooking制作中/done已完成/cancelled已取消/rejected已拒绝"
    })
    status!: MealOrderStatus;

    @Column({
        type: "varchar",
        length: 500,
        nullable: true,
        comment: "点餐备注"
    })
    remark?: string | null;

    @Column({
        name: "accepted_at",
        type: "timestamp with time zone",
        nullable: true,
        comment: "接单时间"
    })
    acceptedAt?: Date | null;

    @Column({
        name: "cooking_at",
        type: "timestamp with time zone",
        nullable: true,
        comment: "开始制作时间"
    })
    cookingAt?: Date | null;

    @Column({
        name: "completed_at",
        type: "timestamp with time zone",
        nullable: true,
        comment: "完成时间"
    })
    completedAt?: Date | null;

    @Column({
        name: "cancelled_at",
        type: "timestamp with time zone",
        nullable: true,
        comment: "取消时间"
    })
    cancelledAt?: Date | null;

    @ManyToOne(() => UserEntity, (user) => user.orders)
    @JoinColumn({
        name: "user_id"
    })
    user!: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.cookOrders, {
        nullable: true
    })
    @JoinColumn({
        name: "cook_user_id"
    })
    cookUser?: UserEntity | null;

    @OneToMany(() => MealOrderItemEntity, (item) => item.order)
    items?: MealOrderItemEntity[];

    @OneToMany(() => InteractionRecordEntity, (record) => record.relatedOrder)
    interactionRecords?: InteractionRecordEntity[];
}
