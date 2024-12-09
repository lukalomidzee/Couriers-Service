import { Controller, Get, Post, Res, Render, Param, Body, Delete, Query, Session, UseGuards, BadRequestException, NotFoundException } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { DictionaryService } from './dictionary.service';
import { Response } from 'express';
import { AdminGuard } from 'src/guards/admin.guard';
import { UsersService } from 'src/users/users.service';

@Controller('dictionary')
export class DictionaryController {
    constructor(private dictionaryService: DictionaryService, private usersService: UsersService){}
    //#region Create Sites
    @Get('/sites')
    @UseGuards(AuthGuard, AdminGuard)
    @Render('sites.hbs')
    async dictionarySites(@Session() session:any, @Res() res: Response) {
        const isUserAdmin = (await this.usersService.findOne(session.userId)).isAdmin;
        const currentPath = "/dictionary";
        const title = 'Sites';
        const sites = await this.dictionaryService.findAllSites();
        const message = session.message;
        const messageColor = session.messageColor;
        session.messageColor = null;
        session.message = null;
        
        if (message == null){
            return {
                title: title,
                loggedIn: session.userId,
                siteList: sites,
                currentPath: currentPath,
                isAdmin: isUserAdmin
            }
        } else if (message != null){
            return {
                title: title,
                loggedIn: session.userId,
                message: message,
                messageColor: messageColor,
                siteList: sites,
                currentPath: currentPath,
                isAdmin: isUserAdmin
            }
        }
    }

    @Get('/sites/:siteNumber')
    async getSite(@Param('siteNumber') siteNumber: string,){
        try {
            const site = await this.dictionaryService.findOneSite(siteNumber);
            return site;
        } catch (error) {
            if (error instanceof NotFoundException) {
                return null;
            }
            return null;
        }
    }

    @Post('/sites')
    @UseGuards(AuthGuard, AdminGuard)
    async createSite(@Body() body, @Res() res: Response, @Session() session: any){
        if (!body.siteNumber || !body.siteName || !body.siteAddress || !body.siteCity || !body.siteContact || !body.siteContactNumber){
            let errorMessage = 'Please provide site details';
            session.message = errorMessage;
            session.messageColor = 'red';
            return res.redirect('/dictionary/sites');
        }

        try {
            const site = await this.dictionaryService.createSite(body.siteNumber, body.siteName, body.siteAddress, body.siteCity, body.siteContact, body.siteContactNumber);
            const message = `Created Site ${body.siteNumber} - ${body.siteName}`;
            const color = 'green';
            session.message = message;
            session.messageColor = color;
            return res.redirect('/dictionary/sites');
        } catch (error){
            let errorMessage = 'An error occurred while creating site';
            const color = 'red';
            if (error instanceof BadRequestException){
                errorMessage = error.message;
            }
            session.message = errorMessage;
            session.messageColor = color;
            return res.redirect('/dictionary/sites');
        }
    }

    @Delete('/sites/remove/:siteNumber')
    async deleteSite(@Param('siteNumber') siteNumber: string, @Res() res: Response) {
        try {
            const result = await this.dictionaryService.removeSite(siteNumber);
            return res.redirect(200, '/dictionary/sites')
        } catch (error) {
            if (error instanceof NotFoundException) {
                return res.status(404).json({ message: 'Site not found' });
            }
            return res.status(500).json({ message: 'An error occurred while deleting the site' });
        }
    }
    //#endregion

    //#region Create Couriers
    @Get('/couriers')
    @UseGuards(AuthGuard, AdminGuard)
    @Render('couriers.hbs')
    async dictionaryCouriers(@Session() session:any, @Res() res: Response) {
        const isUserAdmin = (await this.usersService.findOne(session.userId)).isAdmin;
        const title = 'Couriers';
        const currentPath = "/dictionary";
        const couriers = await this.dictionaryService.findAllCouriers();
        const message = session.message;
        const messageColor = session.messageColor;
        session.messageColor = null;
        session.message = null;
        
        if (message == null){
            return {
                title: title,
                loggedIn: session.userId,
                couriersList: couriers,
                currentPath: currentPath,
                isAdmin: isUserAdmin
            }
        } else if (message != null){
            return {
                title: title,
                loggedIn: session.userId,
                message: message,
                messageColor: messageColor,
                couriersList: couriers,
                currentPath: currentPath,
                isAdmin: isUserAdmin
            }
        }
    }

    @Post('/couriers')
    @UseGuards(AuthGuard, AdminGuard)
    async createCourier(@Body() body, @Res() res: Response, @Session() session: any){
        if (!body.firstName || !body.lastName || !body.personalNumber){
            let errorMessage = 'Please provide courier details';
            session.message = errorMessage;
            session.messageColor = 'red';
            return res.redirect('/dictionary/couriers');
        }

        try {
            const courier = await this.dictionaryService.createCourier(body.firstName, body.lastName, body.personalNumber);
            const message = `Created courier ${body.firstName} ${body.lastName} (${body.personalNumber})`;
            const color = 'green';
            session.message = message;
            session.messageColor = color;
            return res.redirect('/dictionary/couriers');
        } catch (error){
            let errorMessage = 'An error occurred while creating courier';
            const color = 'red';
            if (error instanceof BadRequestException){
                errorMessage = error.message;
            }
            session.message = errorMessage;
            session.messageColor = color;
            return res.redirect('/dictionary/couriers');
        }
    }

    @Delete('/couriers/remove/:id')
    async deleteCourier(@Param('id') id: string, @Res() res: Response) {
        try {
            const result = await this.dictionaryService.removeCourier(parseInt(id));
            return res.redirect(200, '/dictionary/couriers')
        } catch (error) {
            if (error instanceof NotFoundException) {
                return res.status(404).json({ message: 'Courier not found' });
            }
            return res.status(500).json({ message: 'An error occurred while deleting the courier' });
        }
    }
    //#endregion 

    //#region Create Protocols
    @Get('/protocols')
    @UseGuards(AuthGuard, AdminGuard)
    @Render('protocols.hbs')
    async dictionaryProtocols(@Session() session:any, @Res() res: Response) {
        const isUserAdmin = (await this.usersService.findOne(session.userId)).isAdmin;
        const title = 'Protocols';
        const currentPath = "/dictionary";
        const protocols = await this.dictionaryService.findAllProtocols();
        const message = session.message;
        const messageColor = session.messageColor;
        session.messageColor = null;
        session.message = null;
        
        if (message == null){
            return {
                title: title,
                loggedIn: session.userId,
                protocolList: protocols,
                currentPath: currentPath,
                isAdmin: isUserAdmin
            }
        } else if (message != null){
            return {
                title: title,
                loggedIn: session.userId,
                message: message,
                messageColor: messageColor,
                protocolList: protocols,
                currentPath: currentPath,
                isAdmin: isUserAdmin
            }
        }
    }

    @Post('/protocols')
    @UseGuards(AuthGuard, AdminGuard)
    async createProtocol(@Body() body, @Res() res: Response, @Session() session: any){
        if (!body.protocol){
            let errorMessage = 'Please provide protocol details';
            session.message = errorMessage;
            session.messageColor = 'red';
            return res.redirect('/dictionary/protocols');
        }

        try {
            const protocol = await this.dictionaryService.createProtocol(body.protocol);
            const message = `Created protocol ${body.protocol}`;
            const color = 'green';
            session.message = message;
            session.messageColor = color;
            return res.redirect('/dictionary/protocols');
        } catch (error){
            let errorMessage = 'An error occurred while creating protocol';
            const color = 'red';
            if (error instanceof BadRequestException){
                errorMessage = error.message;
            }
            session.message = errorMessage;
            session.messageColor = color;
            return res.redirect('/dictionary/protocols');
        }
    }

    @Delete('/protocols/remove/:id')
    async deleteProtocol(@Param('id') id: string, @Res() res: Response) {
        try {
            const result = await this.dictionaryService.removeProtocol(parseInt(id));
            return res.redirect(200, '/dictionary/protocols')
        } catch (error) {
            if (error instanceof NotFoundException) {
                return res.status(404).json({ message: 'Protocol not found' });
            }
            return res.status(500).json({ message: 'An error occurred while deleting the protocol' });
        }
    }
    //#endregion
}
