import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProtocolsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    protocol: string;
}