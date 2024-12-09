import { Module } from '@nestjs/common';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PickupEntity } from 'src/pickup/pickup.entity';
import { UsersService } from 'src/users/users.service';
import { UsersEntity } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PickupEntity, UsersEntity])],
  controllers: [TableController],
  providers: [TableService, UsersService]
})
export class TableModule {}
