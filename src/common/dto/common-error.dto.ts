import { ApiProperty } from '@nestjs/swagger';

export class CommonErrorDto extends Error {
  @ApiProperty()
  errorCode?: number;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  @ApiProperty()
  detailErrors: any;
}
