import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SaleService } from "./sale.service";
import { SaleController } from "./sale.controller";
import { SaleEntity } from "./sale.entity";
import { BookEntity } from "../book/book.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity, BookEntity])],
  providers: [SaleService],
  controllers: [SaleController],
  exports: [SaleService, TypeOrmModule],
})
export class SaleModule {}
