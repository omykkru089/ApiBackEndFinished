import { Body, Controller, Get, Post} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request } from 'express';
import { Role } from '../common/enums/rol.enum';
import { Auth } from './Decorators/auth.decorator';
import { ActiveUser } from '../common/enums/decorators/active-user.decorator';
import { UserActiveInterface } from '../common/interface/user-active.interface';

interface RequestWithUser extends Request {
    user: {
        id: string;
        email: string;
        role: string;
    }
}

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
    ){}


    @Post('register')
    register(
        @Body()
        registerDto: RegisterDto
    ){
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(
        @Body()
        loginDto: LoginDto,
){
    return this.authService.login(loginDto);
}

    // @Get('profile')
    // @Roles(Role.ADMIN)
    // @UseGuards(AuthGuard, RolesGuard)
    // profile(@Req() req: RequestWithUser) {
    // return this.authService.profile(req.user);
    // }

    @Get('profile')
    @Auth(Role.USER)
    profile(@ActiveUser() user: UserActiveInterface) {
    return this.authService.profile(user);
    }
}
