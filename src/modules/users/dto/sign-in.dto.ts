import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}