import { User } from './../users/user.entity';
import { ReqUser } from '../../common/decorators/req-user.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Signup' })
  @ApiOkResponse({ status: 201 })
  signUp(@Body(ValidationPipe) signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  @ApiOperation({ summary: 'Signin' })
  @ApiOkResponse({ status: 200 })
  signIn(@Body(ValidationPipe) signInDto: SignInDto): Promise<any> {
    return this.authService.signIn(signInDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@ReqUser() user: User) {
    console.log(111111111, user);
  }
}
