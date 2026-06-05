import { IsNotEmpty, IsString, IsNumber, IsInt, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  definition: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  @IsInt()
  @Min(0)
  quantity: number;
}
