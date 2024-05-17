import { IsNotEmpty, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  writtenname: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsNotEmpty()
  tags: string;

  active: boolean;
}

export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {
  active: boolean;
}
