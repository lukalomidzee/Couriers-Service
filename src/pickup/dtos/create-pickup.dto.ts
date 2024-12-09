import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreatePickupDto {
    @IsDateString()
    date: Date;

    @IsString()
    protocol: string;


    @IsString()
    hawb: string;

    // Consignor Info
    @IsString()
    consignorSite: string;
    @IsString()
    consignorName: string;
    @IsString()
    consignorAddress: string;
    @IsString()
    consignorCity: string;
    @IsString()
    consignorContact: string;
    @IsString()
    consignorNumber: string;
    
    // Consignee Info
    @IsString()
    consigneeSite: string;
    @IsString()
    consigneeName: string;
    @IsString()
    consigneeAddress: string;
    @IsString()
    consigneeCity: string;
    @IsString()
    consigneeContact: string;
    @IsString()
    consigneeNumber: string;

    // Courier
    @IsString()
    courier: string;

    // Comment
    @IsString()
    @IsOptional()
    comment: string;

    @IsString()
    status: string;
}