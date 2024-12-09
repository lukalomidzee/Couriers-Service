import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SitesEntity } from './sites.entity';
import { CouriersEntity } from './couriers.entity';
import { ProtocolsEntity } from './protocols.entity';


@Injectable()
export class DictionaryService {
    constructor ( 
        @InjectRepository(SitesEntity) private sitesRepo: Repository<SitesEntity>,
        @InjectRepository(CouriersEntity) private couriersRepo: Repository<CouriersEntity>,
        @InjectRepository(ProtocolsEntity) private protocolsRepo: Repository<ProtocolsEntity>
    )
    {}

    //#region Sites
    findSite(siteNumber: string){
        return this.sitesRepo.find({where: {siteNumber}});
    }

    async findAllSites(){
        return await this.sitesRepo.find({
            order: {
                siteNumber: 'ASC'
            }
        });
    }

    async createSite(
        siteNumber: string, 
        siteName: string, 
        siteAddress: string,
        siteCity: string,
        siteContact: string,
        siteContactNumber: string
    ){
        const sites = await this.findSite(siteNumber);
        if (sites.length) {
            throw new BadRequestException('Site already exists');
        }
        const newSite = this.sitesRepo.create({
            siteNumber, 
            siteName, 
            siteAddress,
            siteCity,
            siteContact,
            siteContactNumber
        });
        return this.sitesRepo.save(newSite);
    }

    async getSites(){
        const sites = await this.findAllSites();
        return sites;
    }

    async findOneSite(siteNumber: string){
        if (!siteNumber){
            return null;
        }
        return this.sitesRepo.findOneBy({siteNumber});
    }

    async removeSite(siteNumber: string){
        const siteToRemove = await this.findOneSite(siteNumber);
        if (!siteToRemove) {
            throw new NotFoundException('Site not found');
        }
        return this.sitesRepo.remove(siteToRemove);
    }
    //#endregion
    
    //#region Protocols
    findProtocol(protocol: string){
        return this.protocolsRepo.find({where: {protocol}});
    }

    async findAllProtocols(){
        return await this.protocolsRepo.find({
            order: {
                protocol: 'ASC'
            }
        });
    }

    async createProtocol(protocol: string){
        const protocols = await this.findProtocol(protocol);
        if (protocols.length) {
            throw new BadRequestException('Protocol already exists');
        }
        const newProtocol = this.protocolsRepo.create({protocol});
        return this.protocolsRepo.save(newProtocol);
    }

    async getProtocols(){
        const protocols = await this.findAllProtocols();
        return protocols;
    }

    async findOneProtocol(id: number){
        if (!id){
            return null;
        }
        return this.protocolsRepo.findOneBy({id});
    }

    async removeProtocol(id: number){
        const protocolToRemove = await this.findOneProtocol(id);
        if (!protocolToRemove) {
            throw new NotFoundException('Protocol not found');
        }
        return this.protocolsRepo.remove(protocolToRemove);
    }
    //#endregion
    
    //#region Couriers
    findCouriers(personalNumber: string){
        return this.couriersRepo.find({where: {personalNumber} })
    }

    async findAllCouriers(){
        return await this.couriersRepo.find();
    }

    async findOneCourier(id: number){
        if (!id){
            return null;
        }
        return this.couriersRepo.findOneBy({id});
    }

    async createCourier(firstName: string, lastName: string, personalNumber: string) {
        const couriers = await this.findCouriers(personalNumber);
        if (couriers.length) {
            throw new BadRequestException('Courier already exists');
        }
        const courier = this.couriersRepo.create({firstName, lastName, personalNumber});
        return this.couriersRepo.save(courier);
    }

    async getCouriers(){
        const couriers = await this.findAllCouriers();
        return couriers;
    }

    async removeCourier(id: number){
        const courierToRemove = await this.findOneCourier(id);
        if (!courierToRemove) {
            throw new NotFoundException('Courier not found');
        }
        return this.couriersRepo.remove(courierToRemove);
    }
    //#endregion

}
