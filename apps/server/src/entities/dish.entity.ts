import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "@/entities/base.entity";
import { UserEntity } from "@/entities/user.entity";
import { DishCategoryEntity } from "./dish-category.entity";
import { DishFavoriteEntity } from "./dish-favorite.entity";
import { MealOrderItemEntity } from "@/entities/meal-order-item.entity";
import { InteractionRecordEntity } from "./interaction-record.entity";
import { DishDifficulty } from "@/common/enums/dish-dfficulty.enum";

@Entity("dishes")
export class DishEntity extends BaseEntity {
    @Index()
    @Column({
        name: "category_id",
        type: "bigint",
        nullable: true,
        comment: "分类ID"
    })
    categoryId?: string | null;

    @Column({
        type: "varchar",
        length: 100,
        comment: "菜品名称"
    })
    name!: string;

    @Column({
        type: "varchar",
        length: 500,
        nullable: true,
        comment: "菜品描述"
    })
    description?: string | null;

    @Column({
        name: "image_url",
        type: "varchar",
        length: 500,
        nullable: true,
        comment: "菜品图片"
    })
    imageUrl?: string | null;

    @Column({
        type: "varchar",
        length: 30,
        nullable: true,
        comment: "难度：easy/normal/hard"
    })
    difficulty?: DishDifficulty | null;

    @Column({
        name: "cooking_time",
        type: "int",
        nullable: true,
        comment: "预计制作时间，单位分钟"
    })
    cookingTime?: number | null;

    @Column({
        name: "taste_tags",
        type: "json",
        nullable: true,
        comment: "口味标签，例如：清淡、微辣、酸甜"
    })
    tasteTags?: string[] | null;

    @Column({
        name: "ingredient_tags",
        type: "json",
        nullable: true,
        comment: "食材标签，例如：鸡翅、番茄、鸡蛋"
    })
    ingredientTags?: string[] | null;

    @Index()
    @Column({
        name: "is_today",
        type: "boolean",
        default: false,
        comment: "是否今日菜单"
    })
    isToday!: boolean;

    @Column({
        name: "is_recommended",
        type: "boolean",
        default: false,
        comment: "是否推荐"
    })
    isRecommended!: boolean;

    @Index()
    @Column({
        type: "boolean",
        default: true,
        comment: "状态：上架、下架"
    })
    status!: boolean;

    @Column({
        name: "created_by",
        type: "bigint",
        nullable: true,
        comment: "创建人ID"
    })
    createdBy?: string | null;

    @ManyToOne(() => DishCategoryEntity, (category) => category.dishes, {
        nullable: true
    })
    @JoinColumn({
        name: "category_id"
    })
    category?: DishCategoryEntity | null;

    @ManyToOne(() => UserEntity, {
        nullable: true
    })
    @JoinColumn({
        name: "created_by"
    })
    creator?: UserEntity | null;

    @OneToMany(() => DishFavoriteEntity, (favorite) => favorite.dish)
    favorites?: DishFavoriteEntity[];

    @OneToMany(() => MealOrderItemEntity, (item) => item.dish)
    orderItems?: MealOrderItemEntity[];

    @OneToMany(() => InteractionRecordEntity, (record) => record.relatedDish)
    interactionRecords?: InteractionRecordEntity[];
}
