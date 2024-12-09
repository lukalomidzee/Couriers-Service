import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { IsDate } from "class-validator";

@Entity()
export class PickupEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    date: Date;

    @Column()
    protocol: string;

    @Column()
    hawb: string;
    
    // Consignor Info
    @Column()
    consignorSite: string;
    @Column()
    consignorName: string;
    @Column()
    consignorAddress: string;
    @Column()
    consignorCity: string;
    @Column()
    consignorContact: string;
    @Column()
    consignorNumber: string;
    
    // Consignee Info
    @Column()
    consigneeSite: string;
    @Column()
    consigneeName: string;
    @Column()
    consigneeAddress: string;
    @Column()
    consigneeCity: string;
    @Column()
    consigneeContact: string;
    @Column()
    consigneeNumber: string;

    @Column()
    courier: string;

    @Column()
    comment: string;

    @Column()
    status: string;
}