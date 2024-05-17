import { IsNotEmpty, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsString()
  @IsNotEmpty()
  releasedate: string;

  @IsNotEmpty()
  @IsNotEmpty()
  saleblestock: number;

  @IsNotEmpty()
  @IsNotEmpty()
  rentablestock: number;

  @IsNotEmpty()
  price: number;
}

export class UpdateBookDto {
  saleblestock: number;
  rentablestock: number;
  price: number;
}
