import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Repository, Between } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateSaleDto } from "./sale.dto";
import { SaleEntity } from "./sale.entity";
import { BookEntity } from "../book/book.entity";
import { uuid } from "uuidv4";

@Injectable()
export class SaleService {
  private readonly logger = new Logger(SaleService.name);

  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    @InjectRepository(SaleEntity)
    private saleRepository: Repository<SaleEntity>
  ) {}

  async create(createSaleDto: CreateSaleDto): Promise<SaleEntity> {
    try {
      let books = [];
      for (let book of createSaleDto.books) {
        let found = await this.bookRepository.findOne({
          where: { id: book },
          relations: ["author"],
        });
        if (!found) {
          throw new NotFoundException(`Book not found (ID:${book})`);
        }
        books.push(found);
      }

      let sale = new SaleEntity();
      sale.books = books;
      sale.subtotal = 0;
      sale.books.forEach((book) => {
        sale.subtotal += book.price;
      });
      sale.soldBy = createSaleDto.soldBy;
      sale.soldTo = createSaleDto.soldTo;

      sale.paymentcode = uuid().toString();

      return await this.saleRepository.save(sale);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async update(id: string, books: string[]): Promise<SaleEntity> {
    try {
      let sale = await this.saleRepository.findOne({ where: { id: id } });

      let booksList = [];
      for (let book of books) {
        let found = await this.bookRepository.findOne({
          where: { id: book },
          relations: ["author"],
        });
        if (!found) {
          throw new NotFoundException(`Book not found (ID:${book})`);
        }
        booksList.push(found);
      }

      sale.books = booksList;
      sale.subtotal = 0;
      sale.books.forEach((book) => {
        sale.subtotal += book.price;
      });

      return await this.saleRepository.save(sale);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async findQuery(limit: number, from: Date, to: Date): Promise<SaleEntity[]> {
    try {
      let found = this.saleRepository.find({
        where: [
          {
            createdAt: Between(from, to),
          },
        ],
        take: limit,
      });

      return found;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async findOne(id: string): Promise<BookEntity> {
    try {
      const found = await this.bookRepository.findOne({
        where: { id: id },
      });
      if (!found) {
        throw new NotFoundException("Book not found");
      }
      return found;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
