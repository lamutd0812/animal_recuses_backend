import { SigninResponseDto } from './dto/sign-in-response.dto';
import { CommonResponseDto } from './../../common/dto/common-response.dto';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { UserRepository } from './../users/user.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<CommonResponseDto> {
    const username = await this.userRepository.signUp(signUpDto);
    return new CommonResponseDto(
      true,
      { username },
      'Create account successfully.',
    );
  }

  async signIn(signInDto: SignInDto): Promise<SigninResponseDto> {
    const user = await this.userRepository.signIn(signInDto);

    if (!user) {
      throw new UnauthorizedException('Username or password incorrect.');
    }

    const {
      id_user: idUser,
      username,
      fullname,
      email,
      address,
      phone_number: phoneNumber,
      role,
    } = user;

    const jwtObject = {
      idUser,
      username,
      fullname,
      email,
      address,
      phoneNumber,
      role,
    };

    const accessToken = await this.jwtService.sign(jwtObject);
    const payload: JwtPayloadDto = { ...jwtObject, accessToken };
    const message = 'Signed in successfully.';

    return new SigninResponseDto(true, payload, message);
  }
}
