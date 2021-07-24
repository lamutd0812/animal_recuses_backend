import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  username: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Please choose a stronger password: Minimum 8 digits, 1 number or 1 special character, 1 uppercase.',
  })
  password: string;
}
