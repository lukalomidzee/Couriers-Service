import { Controller, Get, Render, Session } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private usersService: UsersService) {}

  @Get()
  @Render('index')
  async getHome(@Session() session: any){
    const currentPath = "/";
    return {
      title: 'Home',
      currentPath: currentPath,
      loggedIn: session.userId,
      ...(session.userId
          ? { isAdmin: (await this.usersService.findOne(session.userId)).isAdmin }
          : {}),
    };
  }

  @Get('unauthorized')
  @Render('unauthorized.hbs')
  unauthorized(@Session() session: any){
    return {
      title: 'Unauthorized',
      loggedIn: session.userId,
    }
  }
}
