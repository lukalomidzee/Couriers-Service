import { Body, 
    Controller, 
    Get, 
    Post, 
    Patch, 
    Param, 
    Query, 
    Render,
    Delete, 
    Session, 
    UseGuards,
    Res,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SigninUserDto } from './dtos/signin-user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { UsersEntity } from './users.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { Response } from 'express';



@Controller('auth')
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService
    ){}
    
//#region Sign in
    @Get('')
    loginForm(@Session() session: any, @Res() res: Response){
        const errorMessage = session.errorMessage;
        session.errorMessage = null;
        const title = 'Log In';

        return res.render('auth', {errorMessage, title})
    }

    @Post('/signin')
    async signIn(@Body() body: SigninUserDto, @Session() session: any, @Res() res: Response){
        if (!body.username && !body.password){
            let errorMessage = 'Please provide credentials';
            session.errorMessage = errorMessage;
            return res.redirect('/auth')
        }

        try {
            const user = await this.authService.signIn(body.username, body.password);
            session.userId = user.id;
            return res.redirect('/table')
        }
        catch (error) {
            let errorMessage = 'An error occurred during login';
            if (error instanceof NotFoundException || error instanceof BadRequestException){
                errorMessage = error.message;
            }
            session.errorMessage = errorMessage;
            return res.redirect('/auth');
        }
    }
//#endregion

//#region Sign up
    @Get('/signup')
    // @Render('authSignUp.hbs')
    signupForm(@Session() session: any, @Res() res: Response){
        const errorMessage = session.errorMessage;
        session.errorMessage = null;
        const title = 'Sign up';
        return res.render('authSignUp', {errorMessage, title});
    }

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any, @Res() res: Response){
        const name = body.name;
        const username = body.username;
        const password = body.password;
        const confirm = body.confirmPassword;
        // Empty inputs
        if (!name || !username || !password || !confirm){
            let errorMessage = "Please provide details";
            session.errorMessage = errorMessage;
            return res.redirect('/auth/signup');
        }
        
        // Passwords confirm
        if (password != confirm){
            let errorMessage = "Passwords doesn't match";
            session.errorMessage = errorMessage;
            return res.redirect('/auth/signup');
        }
        
        try {
            const user = await this.authService.signUp(body.username, body.password, body.name);
            session.userId = user.id;
            res.redirect('/table')
            return user;
        } catch (error) {
            let errorMessage = 'An error occurred during sign up';
            if (error instanceof BadRequestException){
                errorMessage = error.message;
            }
            session.errorMessage = errorMessage;
            return res.redirect('/auth/signup');
        }
    }
//#endregion

    // Get currently signed in user
    @Get('/current')
    @UseGuards(AuthGuard)
    currentUser(@CurrentUser() user: UsersEntity){
        return user;
    }

    
    @Get('/signout')
    signOut(@Session() session: any, @Res() res: Response){
        session.userId = null;
        res.redirect('/')
    }

    // Get user 
    @Get('/:id')
    findUser(@Param('id') id: string){
        return this.usersService.findOne(parseInt(id));
    }

    // Get all the users matching the name
    @Get()
    findUsers(@Query('name') name:string){
        return this.usersService.find(name);
    }

    // Delete user
    @Delete('/:id')
    deleteUser(@Param('id') id: string){
        return this.usersService.remove(parseInt(id));
    }

    // Update user
    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.usersService.update(parseInt(id), body);
    }
}
