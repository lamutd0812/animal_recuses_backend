import { JwtPayloadDto } from './jwt-payload.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SigninResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  data: JwtPayloadDto;

  @ApiProperty()
  message: string;

  constructor(success: boolean, data: any, message: string) {
    this.success = success;
    this.data = data;
    this.message = message;
  }
}
