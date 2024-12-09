import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PickupEntity } from 'src/pickup/pickup.entity';

@Injectable()
export class TableService {
    constructor(@InjectRepository(PickupEntity) private repo: Repository<PickupEntity>){}

    async getTable(){
        const date = new Date();
        const formattedDate = date.toISOString().split('T')[0];

        const tableList = await this.repo
        .createQueryBuilder('table')
        .where('DATE(table.date) = :date', { date: formattedDate })
        .getMany();

        return tableList;
    }
    
    async getCurrentDate(newDate: string) {
        const date = new Date(newDate);
        let dateList = await this.repo.find({ where: { date } });
        return dateList;
    }

    async getFilteredList(newDate: string, courier: string) {
        const date = new Date(newDate);

        let dateList = await this.repo
        .createQueryBuilder('table')
        .where('table.date = :date', { date })
        .andWhere('table.courier LIKE :courier', { courier: `%${courier}%` })
        .getMany();
        return dateList;
    }

}
