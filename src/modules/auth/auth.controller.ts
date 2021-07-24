import { User } from './../users/user.entity';
import { ReqUser } from '../../common/decorators/req-user.decorator';
import { SignInDto } from './../users/dto/sign-in.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './../users/dto/sign-up.dto';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) signInDto: SignInDto): Promise<any> {
    return this.authService.signIn(signInDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@ReqUser() user: User) {
    console.log(111111111, user);
  }
}
