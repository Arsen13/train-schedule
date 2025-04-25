import { Transform } from 'class-transformer';
import { IsIn } from 'class-validator';

export class PaginationDto {
  @Transform(({ value }) => parseInt(value))
  readonly page: number;

  @Transform(({ value }) => parseInt(value))
  readonly limit: number;

  @IsIn(['asc', 'desc'])
  readonly sortOrder: 'asc' | 'desc';
}
