import { ESort } from './../../config/constants';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiQuery } from '@nestjs/swagger';

export const ApiQueryGetMany = (orderFileds: string[]) =>
  applyDecorators(
    ApiQuery({
      name: `search`,
      required: false,
      examples: {
        Empty: {},
        Default: { value: 'lulu' },
      },
    }),
    ApiQuery({
      name: 'page',
      required: false,
      examples: {
        Default: { value: 1 },
        Empty: {},
      },
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      examples: {
        Default: { value: 10 },
        Empty: {},
      },
    }),
    ApiQuery({
      name: `orderBy`,
      required: false,
      enum: orderFileds,
      examples: {
        Empty: {},
      },
    }),
    ApiQuery({
      name: 'sort',
      enum: ESort,
      required: false,
      examples: {
        Default: { value: ESort.ASC },
        Empty: {},
      },
    }),
  );

export const ApiPropertyFile = () =>
  ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
  });
