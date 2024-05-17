import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToMany,
} from "typeorm";
import { BookEntity } from "../book/book.entity";

@Entity("sale")
export class SaleEntity {
  @ApiProperty({
    description: "Author ID",
    example: "64c3fd4fff78c94f7340c62e",
  })
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty({
    description: "User who make this sale",
    example: "This should be a user ID",
  })
  soldBy: string;

  @ApiProperty({
    description: "User who bought this sale",
    example: "This should be a user ID",
  })
  soldTo: string;

  @ApiProperty({
    description: "subtotal of this purchase",
    example: 13990,
  })
  subtotal: number;

  @ApiProperty({
    description: "payment code for this purchase",
    example: "1047801734",
  })
  paymentcode: string;

  @ApiProperty({
    description: "Books in this sale",
    type: () => BookEntity,
  })
  @ManyToMany(() => BookEntity, (book) => book.sales, { cascade: true })
  @JoinColumn({ name: "books" })
  books: BookEntity[];

  @ApiProperty({
    description: "Timestamp date when the book was created",
    example: "1691106913",
  })
  @Column({
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @ApiProperty({
    description: "Timestamp date when the book was updated",
    example: "1691106913",
  })
  @Column({
    nullable: true,
  })
  updatedAt: Date;
}
