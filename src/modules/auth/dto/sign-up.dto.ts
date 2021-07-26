import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpDto {
  @ApiProperty({ example: 'lamnguyen' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  username: string;

  @ApiProperty({ example: 'Lam@123456789' })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Please choose a stronger password: Minimum 8 digits, 1 number or 1 special character, 1 uppercase.',
  })
  password: string;

  @ApiProperty({ example: 'Lam Nguyen' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  fullname: string;

  @ApiProperty({ example: 'lamtest@gmail.com' })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @Matches(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    {
      message: 'Email invalid.',
    },
  )
  email: string;

  @ApiProperty({ example: 'Hanoi, Vietnam' })
  @IsString()
  @MinLength(5)
  address: string;

  @ApiProperty({ example: '0984444555' })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(11)
  @Matches(/^[0-9]{10}$/, {
    message: 'Phone number invalid.',
  })
  phone_number: string;
}
