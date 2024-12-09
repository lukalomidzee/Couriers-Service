import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService){}
    async signUp(username: string, password: string, name: string){
        // User check
        const users = await this.usersService.find(username);
        if (users.length){
            throw new BadRequestException('Username already exists');
        }

        // Hash password
        const salt = randomBytes(8).toString('hex');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        const result = salt + '.' + hash.toString('hex');

        // Create user
        const user = await this.usersService.create(username, result, name);

        return user;
    }

    async signIn(username: string, password: string){
        const [user] = await this.usersService.find(username);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const [salt, storedHash] = user.password.split('.');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (storedHash !== hash.toString('hex')){
            throw new BadRequestException('Incorrect password');
        }
        return user;
    }
}