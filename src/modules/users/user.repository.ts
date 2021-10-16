import { SignUpDto } from '../auth/dto/sign-up.dto';
import { SignInDto } from '../auth/dto/sign-in.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';
import { ERole } from 'src/config/constants';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('TasksController');

  async signUp(signUpDto: SignUpDto): Promise<string> {
    const { username, password, fullname, email, address, phoneNumber } =
      signUpDto;
    const salt = await bcrypt.genSalt();

    const user = new User();
    user.username = username;
    user.password = await this.hashPassword(password, salt);
    user.fullname = fullname;
    user.email = email;
    user.address = address ? address : null;
    user.phone_number = phoneNumber;
    user.salt = salt;
    user.role = ERole.VOLUNTEER;

    try {
      const savedUser = await user.save();
      return savedUser.username;
    } catch (err) {
      if (err.code === '23505') {
        this.logger.error('Username or email already exists.');
        throw new BadRequestException('Username or email already exists.');
      }
      throw new InternalServerErrorException(err.message);
    }
  }

  private hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async signIn(signInDto: SignInDto): Promise<User> {
    const { username, password } = signInDto;
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }
}
