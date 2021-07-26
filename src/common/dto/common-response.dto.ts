import { ApiProperty } from '@nestjs/swagger';

export class CommonResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  data?: any;

  @ApiProperty()
  message?: string;

  constructor(success: boolean, data: any, message: string) {
    this.success = success;
    this.data = data;
    this.message = message;
  }
}
