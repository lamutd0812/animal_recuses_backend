import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private logger = new Logger('TasksController');

  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { username, password } = signUpDto;
    const salt = await bcrypt.genSalt();

    const user = new User();
    user.username = username;
    user.password = await this.hashPassword(password, salt);
    user.salt = salt;
    user.role = 'Staff';

    try {
      await user.save();
    } catch (err) {
      if (err.code === '23505') {
        this.logger.error('Username already exists.');
        throw new BadRequestException('Username already exists.');
      }
      throw new InternalServerErrorException(err.message);
    }
  }

  private hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async signIn(signInDto: SignInDto): Promise<string> {
    const { username, password } = signInDto;
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }
}
