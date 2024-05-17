import { IsNotEmpty, IsString } from "class-validator";

export class CreateSaleDto {
  @IsString()
  @IsNotEmpty()
  soldBy: string;

  @IsString()
  @IsNotEmpty()
  soldTo: string;

  @IsNotEmpty()
  books: string[];
}
