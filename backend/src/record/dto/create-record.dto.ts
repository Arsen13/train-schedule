import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateRecordDto {
  @IsNumber()
  readonly trainNumber: number;

  @IsNumber()
  readonly railwayNumber: number;

  @IsString()
  readonly departureStation: string;

  @IsString()
  readonly arrivalStation: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  readonly arrivalTime: Date;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  readonly departureTime: Date;
}
