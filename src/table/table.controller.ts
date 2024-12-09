import { Controller, Get, Post, Patch, Render, Param, Body, Headers, Query, NotFoundException, Session, UseGuards, Redirect, Res } from '@nestjs/common';
import { TableService } from './table.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { UsersService } from 'src/users/users.service';


@Controller('table')
export class TableController {
    constructor(private tableService: TableService, private usersService: UsersService){}
    
    @Get('')
    @UseGuards(AuthGuard)
    @Render('table.hbs')
    async getList(@Query('date') newDate: any, @Query('courier') courier: string, @Session() session: any){
        const isUserAdmin = (await this.usersService.findOne(session.userId)).isAdmin;
        let tableList: any;
        let date: any;
        if (newDate){
            date = newDate;
        }
        else {
            date = new Date().toISOString().split('T')[0];
        }

        if (courier) {
            tableList = await this.tableService.getFilteredList(date, courier);
        } else {
            tableList = await this.tableService.getCurrentDate(date);
        }

        const count = tableList.length;
        const currentPath = "/table";

        return {
            title: 'Table',
            currentPath: currentPath,
            list: tableList,
            count: count,
            loggedIn: session.userId,
            date: date,
            isAdmin: isUserAdmin
        };
    }
}
