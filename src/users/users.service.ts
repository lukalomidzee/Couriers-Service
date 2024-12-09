import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersEntity) private repo: Repository<UsersEntity>){}

    create(username: string, password: string, name: string){
        const user = this.repo.create({username, password, name});
        return this.repo.save(user);
    }

    findOne(id: number){
        if (!id){
            return null;
        }
        return this.repo.findOneBy({id});
    }

    find(username: string){
        return this.repo.find({where: {username} })
    }

    async update(id: number, attributes: Partial<UsersEntity>){
        const userToUpdate = await this.findOne(id) ;
        if (!userToUpdate) {
            throw new NotFoundException('User not found');
        }        
        Object.assign(userToUpdate, attributes);
        return this.repo.save(userToUpdate);
    }

    async remove(id: number){
        const userToRemove = await this.findOne(id);
        if (!userToRemove) {
            throw new NotFoundException('User not found');
        }
        return this.repo.remove(userToRemove);
    }
}
