import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddAnimalDto {
  @ApiProperty({ example: 'fox' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'brown' })
  @IsNotEmpty()
  hairColor: string;

  @ApiProperty({ example: 12 })
  @IsNotEmpty()
  age: number;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image: string;

  @ApiProperty({ example: 'this is animal description.' })
  description: string;
}
