import {
    CanActivate,
    ExecutionContext
} from '@nestjs/common';
import { Response } from 'express';

export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const response: Response = context.switchToHttp().getResponse();
        const session = request.session;

        if (!session || !session.userId){
            response.redirect('/unauthorized');
            return false;
        }

        return request.session.userId;
    }
}