import { SigninResponseDto } from './dto/sign-in-response.dto';
import { CommonResponseDto } from './../../common/dto/common-response.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: 'Signup' })
  @ApiOkResponse({ type: CommonResponseDto })
  signUp(
    @Body(ValidationPipe) signUpDto: SignUpDto,
  ): Promise<CommonResponseDto> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/signin')
  @ApiOperation({ summary: 'Signin' })
  @ApiOkResponse({ type: SigninResponseDto })
  signIn(
    @Body(ValidationPipe) signInDto: SignInDto,
  ): Promise<CommonResponseDto> {
    return this.authService.signIn(signInDto);
  }
}
