import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CouriersEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    personalNumber: string;
}