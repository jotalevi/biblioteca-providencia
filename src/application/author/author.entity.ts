import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("author")
export class AuthortEntity {
  @ApiProperty({
    description: "Author ID",
    example: "64c3fd4fff78c94f7340c62e",
  })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({
    description: "writtenname",
    example: "Андре́й Плато́нов",
  })
  writtenname: string;

  @ApiProperty({
    description: "firstname",
    example: "Andréi",
  })
  firstname: string;

  @ApiProperty({
    description: "lastname",
    example: "Platónov",
  })
  lastname: string;

  @ApiProperty({
    description: "tags",
    example: "Котлован, Chevengur, Litvín-Mólotov",
  })
  tags: string;

  @ApiProperty({
    description: "active",
    example: true,
  })
  active: boolean;

  @ApiProperty({
    description: "Timestamp date when the post was created",
    example: "1691106913",
  })
  @Column({
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ApiProperty({
    description: "Timestamp date when the post was updated",
    example: "1691106913",
  })
  @Column({
    nullable: true,
  })
  updatedAt: Date;
}
