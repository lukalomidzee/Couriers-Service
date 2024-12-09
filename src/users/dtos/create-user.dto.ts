import { IsString, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsString()
    username: string;
     
    @IsString()
    password: string;
   
    @IsString()
    confirmPassword: string;

    @IsString()
    name: string;
}