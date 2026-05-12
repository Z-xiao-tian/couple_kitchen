import { Column, Entity, Index, OneToMany } from "typeorm";
import { BaseEntity } from "@/entities/base.entity";
import { DishEntity } from "@/entities/dish.entity";

@Entity("dish_categories")
export class DishCategoryEntity extends BaseEntity {
    @Column({
        type: "varchar",
        length: 50,
        comment: "分类名称"
    })
    name!: string;

    @Column({
        name: "icon_url",
        type: "varchar",
        length: 500,
        nullable: true,
        comment: "分类图标"
    })
    iconUrl?: string | null;

    @Index()
    @Column({
        name: "sort_order",
        type: "int",
        default: 0,
        comment: "排序"
    })
    sortOrder!: number;

    @Column({
        type: "boolean",
        default: 1,
        comment: "状态：启用、禁用"
    })
    status!: boolean;

    @OneToMany(() => DishEntity, (dish) => dish.category)
    dishes?: DishEntity[];
}
