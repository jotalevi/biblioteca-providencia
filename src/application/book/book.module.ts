import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookService } from "./book.service";
import { BookController } from "./book.controller";
import { BooktEntity } from "./book.entity";
import { AuthortEntity } from "../author/author.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BooktEntity, AuthortEntity])],
  providers: [BookService],
  controllers: [BookController],
  exports: [BookService, TypeOrmModule],
})
export class BookModule {}
