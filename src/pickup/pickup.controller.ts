import { Controller, Get, Post, Patch, Body, Res, Render, Session, UseGuards, Param, UseInterceptors} from '@nestjs/common';
import { CreatePickupDto } from './dtos/create-pickup.dto';
import { PickupService } from './pickup.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Response } from 'express';
import { DictionaryService } from 'src/dictionary/dictionary.service';
import { TransformDateInterceptor } from './interceptors/date.interceptor';
import { UsersService } from 'src/users/users.service';

@Controller('pickup')
export class PickupController {
    constructor(
        private pickupService: PickupService,
        private dictionaryService: DictionaryService,
        private usersService: UsersService
    ){}

    @Get()
    @UseGuards(AuthGuard)
    @Render('pickupForm.hbs')
    async pickupForm(@Session() session: any){
        const isUserAdmin = (await this.usersService.findOne(session.userId)).isAdmin;
        const currentPath = "/pickup";
        const couriers = await this.dictionaryService.getCouriers();
        const protocols = await this.dictionaryService.getProtocols();
        const sites = await this.dictionaryService.getSites();
        const message = session.message;
        session.message = null;
        return {
            loggedIn: session.userId,
            title: "Add pickup",
            currentPath: currentPath,
            message: message,
            couriers: couriers,
            protocols: protocols,
            sites: sites,
            isAdmin: isUserAdmin
        }
    }

    // Validate for Post and Patch requests
    validatePickup(@Body() body: CreatePickupDto, @Session() session: any, @Res() res: Response){
        const date = new Date(body.date);
        let isError = false;
        let errorMessage;
        if (
            !date || !body.protocol || !body.consignorSite || !body.consignorName || !body.consignorAddress ||
            !body.consignorCity || !body.consigneeSite || !body.consigneeName || !body.consigneeAddress ||
            !body.consigneeCity || !body.courier
        ) {
            isError = true;
        }
        if (isError) {
            if (!date) {
                errorMessage = 'Please provide Date';
            } else if (!body.protocol) {
                errorMessage = 'Please provide Protocol';
            } else if (!body.consignorSite || !body.consignorName || !body.consignorAddress || !body.consignorCity) {
                errorMessage = 'Please provide Consignor details';
            } else if (!body.consigneeSite || !body.consigneeName || !body.consigneeAddress || !body.consigneeCity) {
                errorMessage = 'Please provide Consignee details';
            } else if (!body.courier) {
                errorMessage = 'Please select the Courier';
            } else {
                errorMessage = 'Something went wrong';
            }
            session.message = errorMessage;
            session.messageColor = 'red';
            return false;
        }
        return true;
    }

    @Post()
    @UseGuards(AuthGuard)
    createPickup(@Body() body: CreatePickupDto, @Session() session: any, @Res() res: Response){
        const date = new Date(body.date);
        let isAcceptable = this.validatePickup(body, session, res)
        if (!isAcceptable){
            return res.redirect('/pickup');
        }
        this.pickupService.create(
            date,
            body.protocol,
            body.hawb,
            body.consignorSite,
            body.consignorName,
            body.consignorAddress,
            body.consignorCity,
            body.consignorContact,
            body.consignorNumber,
            body.consigneeSite,
            body.consigneeName,
            body.consigneeAddress,
            body.consigneeCity,
            body.consigneeContact,
            body.consigneeNumber,
            body.courier,
            body.comment,
            body.status
        )
        return res.redirect('/table');
    }

    // Edit
    @Get('edit/:id')
    @UseInterceptors(TransformDateInterceptor)
    @UseGuards(AuthGuard)
    @Render('pickupForm.hbs')
    async editForm(@Param('id') id: string, @Session() session: any){
        const isUserAdmin = (await this.usersService.findOne(session.userId)).isAdmin;
        const currentPath = "/pickup";
        const couriers = await this.dictionaryService.getCouriers();
        const protocols = await this.dictionaryService.getProtocols();
        const sites = await this.dictionaryService.getSites();
        const message = session.message;
        session.message = null;
        const pickupId = id;

        let startData = await this.pickupService.get(parseInt(id));
        let pickupToEdit = startData[0];

        return {
            pickupToEdit: pickupToEdit,
            loggedIn: session.userId,
            title: "Edit pickup",
            currentPath: currentPath,
            message: message,
            couriers: couriers,
            protocols: protocols,
            sites: sites,
            id: pickupId,
            isAdmin: isUserAdmin
        }
    }

    @Patch('cancel/:id')
    @UseGuards(AuthGuard)
    async cancelPickup(@Param('id') id: string, @Session() session: any, @Res() res: Response){
        const cancelId = parseInt(id);
        try {
            const result = await this.pickupService.cancel(cancelId);
            if (result) {
                return res.status(200).json({ message: 'Shipment canceled successfully' });
            } else {
                return res.status(404).json({ message: 'Shipment not found' });
            }
        } catch (error) {
            console.error('Error canceling shipment:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }

    @Patch('complete/:id')
    @UseGuards(AuthGuard)
    async completePickup(@Param('id') id: string, @Session() session: any, @Res() res: Response){
        const completeId = parseInt(id);
        try {
            const result = await this.pickupService.complete(completeId);
            if (result) {
                return res.status(200).json({ message: 'Shipment completed successfully' });
            } else {
                return res.status(404).json({ message: 'Please provide HAWB' });
            }
        } catch (error) {
            console.error('Error completing shipment:', error);
            return res.status(500).json({message: 'Internal server error' });
        }
    }

    @Patch('reactivate/:id')
    @UseGuards(AuthGuard)
    async reactivatePickup(@Param('id') id: string, @Session() session: any, @Res() res: Response){
        const reactivateId = parseInt(id);
        try {
            const result = await this.pickupService.reactivate(reactivateId);
            if (result) {
                return res.status(200).json({ message: 'Shipment reactivated successfully' });
            } else {
                return res.status(404).json({ message: 'Error reactivating shipment' });
            }
        } catch (error) {
            console.error('Error completing shipment:', error);
            return res.status(500).json({message: 'Internal server error' });
        }
    }

    @Patch('edit/:id')
    @UseGuards(AuthGuard)
    updatePickup(@Body() body: CreatePickupDto, @Param('id') id: string, @Session() session: any, @Res() res: Response){
        const date = new Date(body.date);
        let isAcceptable = this.validatePickup(body, session, res)
        const pickupId = parseInt(id);
        if (!isAcceptable){
            return res.redirect(`/pickup/edit/${id}`);
        }
        this.pickupService.update(
            pickupId,
            date,
            body.protocol,
            body.hawb,
            body.consignorSite,
            body.consignorName,
            body.consignorAddress,
            body.consignorCity,
            body.consignorContact,
            body.consignorNumber,
            body.consigneeSite,
            body.consigneeName,
            body.consigneeAddress,
            body.consigneeCity,
            body.consigneeContact,
            body.consigneeNumber,
            body.courier,
            body.comment
        )
        return res.end();
    }
}
