import { ESort } from './../../config/constants';
export class PaginationQueryDto {
  search: string;

  page: number;

  limit: string;

  orderBy: string;

  sort: ESort;
}
