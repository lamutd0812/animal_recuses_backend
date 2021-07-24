import { User } from './../users/user.entity';
import { UserRepository } from './../users/user.repository';
import { JwtPayload } from './jwt-payload.interface';
import { JWT_SECRET_KEY } from './../../config/common-configs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET_KEY,
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user = await this.userRepository.findOne(
      { username },
      { select: ['id_user', 'username', 'role'] },
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
