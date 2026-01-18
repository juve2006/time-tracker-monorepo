import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateTimeEntryDto {
  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  project: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.25)
  @Max(24)
  hours: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  description: string;
}
