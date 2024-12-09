import { Module } from '@nestjs/common';
import { PickupService } from './pickup.service';
import { PickupController } from './pickup.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SitesEntity } from 'src/dictionary/sites.entity';
import { PickupEntity } from './pickup.entity';
import { DictionaryService } from 'src/dictionary/dictionary.service';
import { CouriersEntity } from 'src/dictionary/couriers.entity';
import { ProtocolsEntity } from 'src/dictionary/protocols.entity';
import { TransformDateInterceptor } from './interceptors/date.interceptor';
import { UsersService } from 'src/users/users.service';
import { UsersEntity } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SitesEntity, PickupEntity, CouriersEntity, ProtocolsEntity, UsersEntity])],
  providers: [PickupService, DictionaryService, TransformDateInterceptor, UsersService],
  controllers: [PickupController]
})
export class PickupModule {}
