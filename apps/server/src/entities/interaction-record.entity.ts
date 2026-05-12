import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "@/entities/base.entity";
import { UserEntity } from "@/entities/user.entity";
import { MealOrderEntity } from "@/entities/meal-order.entity";
import { DishEntity } from "@/entities/dish.entity";
import { Interaction } from "@/common/enums/interaction.enum";

@Entity("interaction_records")
export class InteractionRecordEntity extends BaseEntity {
    @Index()
    @Column({
        name: "from_user_id",
        type: "bigint",
        comment: "发起人ID"
    })
    fromUserId!: string;

    @Index()
    @Column({
        name: "to_user_id",
        type: "bigint",
        nullable: true,
        comment: "接收人ID"
    })
    toUserId?: string | null;

    @Index()
    @Column({
        type: "varchar",
        length: 50,
        comment: "互动类型：hard_work/want_you_cook/random_feed/done_reminder"
    })
    type!: Interaction;

    @Column({
        type: "varchar",
        length: 100,
        comment: "互动标题"
    })
    title!: string;

    @Column({
        type: "varchar",
        length: 500,
        nullable: true,
        comment: "互动内容"
    })
    content?: string | null;

    @Column({
        name: "related_order_id",
        type: "bigint",
        nullable: true,
        comment: "关联订单ID"
    })
    relatedOrderId?: string | null;

    @Column({
        name: "related_dish_id",
        type: "bigint",
        nullable: true,
        comment: "关联菜品ID"
    })
    relatedDishId?: string | null;

    @ManyToOne(() => UserEntity, (user) => user.sentInteractions)
    @JoinColumn({
        name: "from_user_id"
    })
    fromUser!: UserEntity;

    @ManyToOne(() => UserEntity, (user) => user.receivedInteractions, {
        nullable: true
    })
    @JoinColumn({
        name: "to_user_id"
    })
    toUser?: UserEntity | null;

    @ManyToOne(() => MealOrderEntity, (order) => order.interactionRecords, {
        nullable: true
    })
    @JoinColumn({
        name: "related_order_id"
    })
    relatedOrder?: MealOrderEntity | null;

    @ManyToOne(() => DishEntity, (dish) => dish.interactionRecords, {
        nullable: true
    })
    @JoinColumn({
        name: "related_dish_id"
    })
    relatedDish?: DishEntity | null;
}
