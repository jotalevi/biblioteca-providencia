import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookService } from "./book.service";
import { BookController } from "./book.controller";
import { BookEntity } from "./book.entity";
import { AuthortEntity } from "../author/author.entity";
import { SaleEntity } from "../sale/sale.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, AuthortEntity, SaleEntity])],
  providers: [BookService],
  controllers: [BookController],
  exports: [BookService, TypeOrmModule],
})
export class BookModule {}
