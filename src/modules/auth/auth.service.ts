import { JwtPayload } from './jwt-payload.interface';
import { SignInDto } from './../users/dto/sign-in.dto';
import { SignUpDto } from './../users/dto/sign-up.dto';
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

  async signUp(signUpDto: SignUpDto): Promise<void> {
    return await this.userRepository.signUp(signUpDto);
  }

  async signIn(signInDto: SignInDto): Promise<any> {
    const username = await this.userRepository.signIn(signInDto);

    if (!username) {
      throw new UnauthorizedException('Username or password incorrect.');
    }

    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
