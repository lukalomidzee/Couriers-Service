import { Module, MiddlewareConsumer } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { DictionaryController } from './dictionary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SitesEntity } from './sites.entity';
import { CouriersEntity } from './couriers.entity';
import { ProtocolsEntity } from './protocols.entity';
import { CurrentUserMiddleware } from 'src/users/middlewares/current-user.middleware';
import { UsersService } from 'src/users/users.service';
import { UsersEntity } from 'src/users/users.entity';


@Module({
  imports: [TypeOrmModule.forFeature([SitesEntity, CouriersEntity, ProtocolsEntity, UsersEntity])],
  providers: [DictionaryService, UsersService],
  controllers: [DictionaryController]
})
export class DictionaryModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(CurrentUserMiddleware).forRoutes('/dictionary/');
  }
}
