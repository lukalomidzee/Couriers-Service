import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PickupEntity } from './pickup.entity';
import { isEmpty } from 'class-validator';
import { error } from 'console';

@Injectable()
export class PickupService {
    constructor(@InjectRepository(PickupEntity) private repo: Repository<PickupEntity>){}
    // Get Pickup
    get(id: number){
        const existingPickup = this.repo.find({where: {id}});
        return existingPickup;
    }
    
    // Create Pickup
    create(
        date: Date,
        protocol: string,
        hawb: string,
        consignorSite: string,
        consignorName: string,
        consignorAddress: string,
        consignorCity: string,
        consignorContact: string,
        consignorNumber: string,
        consigneeSite: string,
        consigneeName: string,
        consigneeAddress: string,
        consigneeCity: string,
        consigneeContact: string,
        consigneeNumber: string,
        courier: string,
        comment: string,
        status: string
    ){
        const newPickup = this.repo.create({
            date,
            protocol,
            hawb,
            consignorSite,
            consignorName,
            consignorAddress,
            consignorCity,
            consignorContact,
            consignorNumber,
            consigneeSite,
            consigneeName,
            consigneeAddress,
            consigneeCity,
            consigneeContact,
            consigneeNumber,
            courier,
            comment,
            status
        });
        return this.repo.save(newPickup)
    }

    async cancel(id: number){
        let edit = await this.findOne(id);
        if (!edit) {
            console.log('Pickup not found');
            return;
        }

        let editedPickup = edit[0]
        editedPickup.status = 'canceled';

        return this.repo.save(editedPickup);
    }

    async complete(id: number){
        let edit = await this.findOne(id);
        if (!edit) {
            console.log('Pickup not found');
            return;
        }
        
        let editedPickup = edit[0]

        if (isEmpty(editedPickup.hawb)){ 
            return;
        }

        editedPickup.status = 'completed';

        return this.repo.save(editedPickup);
    }

    async reactivate(id: number){
        let edit = await this.findOne(id);
        if (!edit) {
            console.log('Pickup not found');
            return;
        }
        
        let editedPickup = edit[0]

        editedPickup.status = 'active';

        return this.repo.save(editedPickup);
    }

    async update(
        id: number,
        date: Date,
        protocol: string,
        hawb: string,
        consignorSite: string,
        consignorName: string,
        consignorAddress: string,
        consignorCity: string,
        consignorContact: string,
        consignorNumber: string,
        consigneeSite: string,
        consigneeName: string,
        consigneeAddress: string,
        consigneeCity: string,
        consigneeContact: string,
        consigneeNumber: string,
        courier: string,
        comment: string,
    ){
        let edit = await this.findOne(id);
        if (!edit) {
            console.log('Pickup not found');
            return;
        }

        let editedPickup = edit[0]
        
        editedPickup.date = date;
        editedPickup.protocol = protocol;
        editedPickup.hawb = hawb;
        editedPickup.consignorSite = consignorSite;
        editedPickup.consignorName = consignorName;
        editedPickup.consignorAddress = consignorAddress;
        editedPickup.consignorCity = consignorCity;
        editedPickup.consignorContact = consignorContact;
        editedPickup.consignorNumber = consignorNumber;
        editedPickup.consigneeSite = consigneeSite;
        editedPickup.consigneeName = consigneeName;
        editedPickup.consigneeAddress = consigneeAddress;
        editedPickup.consigneeCity = consigneeCity;
        editedPickup.consigneeContact = consigneeContact;
        editedPickup.consigneeNumber = consigneeNumber;
        editedPickup.courier = courier;
        editedPickup.comment = comment;    

        return this.repo.save(editedPickup);
    }

    findOne(id: number){
        return this.repo.find({where: {id}})
    }

}
