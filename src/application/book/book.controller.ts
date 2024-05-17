import { ApiTags } from "@nestjs/swagger";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from "@nestjs/common";
import { BookService } from "./book.service";
import { CreateBookDto, UpdateBookDto } from "./book.dto";

@ApiTags("Book")
@Controller("book")
export class BookController {
  constructor(private bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  findAll(@Query("limit") limit: number, @Query("query") query: string) {
    return this.bookService.findQuery(limit ?? 5, query);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bookService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.bookService.delete(id);
  }
}
