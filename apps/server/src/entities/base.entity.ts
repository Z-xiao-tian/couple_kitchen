import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
    @PrimaryGeneratedColumn("increment", {
        type: "bigint",
        comment: "主键ID"
    })
    id!: string;

    @CreateDateColumn({
        name: "created_at",
        type: "timestamp with time zone",
        comment: "创建时间"
    })
    createdAt!: Date;

    @UpdateDateColumn({
        name: "updated_at",
        type: "timestamp with time zone",
        comment: "更新时间"
    })
    updatedAt!: Date;

    @DeleteDateColumn({
        name: "deleted_at",
        type: "timestamp with time zone",
        nullable: true,
        comment: "软删除时间"
    })
    deletedAt?: Date | null;
}
