import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Repository, Like } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateBookDto, UpdateBookDto } from "./book.dto";
import { BookEntity } from "./book.entity";
import { AuthortEntity } from "../author/author.entity";

@Injectable()
export class BookService {
  private readonly logger = new Logger(BookService.name);

  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    @InjectRepository(AuthortEntity)
    private authorRepository: Repository<AuthortEntity>
  ) {}

  async create(createBookDto: CreateBookDto): Promise<BookEntity> {
    try {
      let author = await this.authorRepository.findOne({
        where: { id: createBookDto.author },
      });
      if (!author) {
        throw new NotFoundException("Author not found");
      }

      let book = new BookEntity();
      book.title = createBookDto.title;
      book.author = author;
      book.releasedate = createBookDto.releasedate;
      book.saleblestock = createBookDto.saleblestock;
      book.rentablestock = createBookDto.rentablestock;
      book.price = createBookDto.price;

      return await this.bookRepository.save(book);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async update(
    id: string,
    updateAuthorDto: UpdateBookDto
  ): Promise<BookEntity> {
    try {
      let found = await this.bookRepository.findOne({
        where: { id },
      });
      if (!found) {
        throw new NotFoundException("Book not found");
      }

      found.saleblestock = updateAuthorDto.saleblestock;
      found.rentablestock = updateAuthorDto.rentablestock;
      found.price = updateAuthorDto.price;

      return await this.bookRepository.save(found);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async findQuery(limit: number, query: string): Promise<BookEntity[]> {
    try {
      let found = this.bookRepository.find({
        where: [
          {
            title: Like(`%${query}%`),
            author: [
              { writtenname: Like(`%${query}%`) },
              { firstname: Like(`%${query}%`) },
              { lastname: Like(`%${query}%`) },
              { tags: Like(`%${query}%`) },
            ],
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
