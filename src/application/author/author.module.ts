import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthorService } from "./author.service";
import { AuthorController } from "./author.controller";
import { AuthortEntity } from "./author.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AuthortEntity])],
  providers: [AuthorService],
  controllers: [AuthorController],
  exports: [AuthorService, TypeOrmModule],
})
export class AuthorModule {}
