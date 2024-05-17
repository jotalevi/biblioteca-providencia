import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Get, Param, Post, Put, Query } from "@nestjs/common";
import { SaleService } from "./sale.service";
import { CreateSaleDto } from "./sale.dto";

@ApiTags("Sale")
@Controller("sale")
export class SaleController {
  constructor(private saleService: SaleService) {}

  @Post()
  create(@Body() createSaleDto: CreateSaleDto) {
    return this.saleService.create(createSaleDto);
  }

  @Get()
  findAll(
    @Query("limit") limit: number,
    @Query("from") from: string | undefined,
    @Query("to") to: string | undefined
  ) {
    return this.saleService.findQuery(
      limit ?? 5,
      new Date(from ?? 0),
      new Date(to ?? Date.now())
    );
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.saleService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body("books") books: string[]) {
    return this.saleService.update(id, books);
  }
}
