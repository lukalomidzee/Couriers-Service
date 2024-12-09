import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TableModule } from './table/table.module';
import { PickupModule } from './pickup/pickup.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { UsersEntity } from './users/users.entity';
import { SitesEntity } from './dictionary/sites.entity';
import { PickupEntity } from './pickup/pickup.entity';
import { DictionaryModule } from './dictionary/dictionary.module';
import { CouriersEntity } from './dictionary/couriers.entity';
import { ProtocolsEntity } from './dictionary/protocols.entity';
import { UsersService } from './users/users.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: [
      UsersEntity, 
      SitesEntity, 
      PickupEntity,
      CouriersEntity,
      ProtocolsEntity,
    ],
    synchronize: true
  }), TypeOrmModule.forFeature([PickupEntity, UsersEntity]), TableModule, PickupModule, UsersModule, DictionaryModule],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
