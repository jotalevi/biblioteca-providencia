import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { AuthortEntity } from "../author/author.entity";
import { SaleEntity } from "../sale/sale.entity";

@Entity("book")
export class BookEntity {
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
  title: string;

  @ApiProperty({
    description: "Author who wrote the book",
    type: () => AuthortEntity,
  })
  @ManyToOne(() => AuthortEntity, (author) => author.books)
  @JoinColumn({ name: "author" })
  author: AuthortEntity;

  @ApiProperty({
    description: "date of publishment of the book",
    example: "1927-01-01",
  })
  releasedate: string;

  @ApiProperty({
    description: "number of copys available for sale",
    example: 100,
  })
  saleblestock: number;

  @ApiProperty({
    description: "number of copys available for rent",
    example: 13,
  })
  rentablestock: number;

  @ApiProperty({
    description: "the price of the book in CLP",
    example: 13990,
  })
  price: number;

  @ApiProperty({
    description: "Sales this book appeers in",
    type: () => SaleEntity,
  })
  @ManyToMany(() => SaleEntity, (sale) => sale.books, { cascade: true })
  @JoinColumn({ name: "sales" })
  sales: SaleEntity[];

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
