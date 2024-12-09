import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SitesEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    siteNumber: string;
    @Column()
    siteName: string;
    @Column()
    siteAddress: string;
    @Column()
    siteCity: string;
    @Column()
    siteContact: string;
    @Column()
    siteContactNumber: string;
}