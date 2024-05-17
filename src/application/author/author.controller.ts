import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { AuthorService } from "./author.service";
import { CreateAuthorDto, UpdateAuthorDto } from "./author.dto";

@ApiTags("Author")
@Controller("author")
export class AuthorController {
  constructor(private authorService: AuthorService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.create(createAuthorDto);
  }

  @Get()
  findAll(
    @Query("limit") limit: number,
    @Query("writtenname") writtenname: string | undefined,
    @Query("firstname") firstname: string | undefined,
    @Query("lastname") lastname: string | undefined,
    @Query("tags") tags: string | undefined
  ) {
    return this.authorService.findQuery(
      limit ?? 5,
      writtenname,
      firstname,
      lastname,
      tags
    );
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.authorService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateAuthorDto: UpdateAuthorDto) {
    return this.authorService.update(id, updateAuthorDto);
  }
}
