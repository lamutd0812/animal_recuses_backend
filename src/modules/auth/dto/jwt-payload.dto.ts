import { ApiProperty } from '@nestjs/swagger';
import { ERole } from 'src/config/constants';

export class JwtPayloadDto {
  @ApiProperty()
  idUser: number;

  @ApiProperty()
  username: string;

  @ApiProperty()
  fullname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  role: ERole;

  @ApiProperty()
  accessToken: string;
}
