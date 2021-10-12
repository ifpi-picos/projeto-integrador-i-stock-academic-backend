import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
class User {
    @PrimaryColumn()
    readonly id: number;

    @Column()
    name: string;

    @Column()
    wallet_id: number;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;
}

export { User };
