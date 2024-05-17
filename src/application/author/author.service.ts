import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { Repository, Like } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateAuthorDto, UpdateAuthorDto } from "./author.dto";
import { AuthortEntity } from "./author.entity";

@Injectable()
export class AuthorService {
  private readonly logger = new Logger(AuthorService.name);

  constructor(
    @InjectRepository(AuthortEntity)
    private authorRepository: Repository<AuthortEntity>
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<AuthortEntity> {
    try {
      let author = new AuthortEntity();

      author.writtenname = createAuthorDto.writtenname;
      author.firstname = createAuthorDto.firstname;
      author.lastname = createAuthorDto.lastname;
      author.tags = createAuthorDto.tags;
      author.active = true;

      author = await this.authorRepository.save(author);

      return author;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async update(
    id: string,
    updateAuthorDto: UpdateAuthorDto
  ): Promise<AuthortEntity> {
    try {
      let found = await this.authorRepository.findOne({
        where: { id },
      });
      if (!found) {
        throw new NotFoundException("Author not found");
      }

      found.writtenname = updateAuthorDto.writtenname ?? found.writtenname;
      found.firstname = updateAuthorDto.firstname ?? found.firstname;
      found.lastname = updateAuthorDto.lastname ?? found.lastname;
      found.tags = updateAuthorDto.tags ?? found.tags;
      found.active = updateAuthorDto.active;

      found = await this.authorRepository.save(found);

      return found;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async findQuery(
    limit: number,
    writtenname: string | undefined,
    firstname: string | undefined,
    lastname: string | undefined,
    tags: string | undefined
  ): Promise<AuthortEntity[]> {
    try {
      let findParams = [];
      if (writtenname)
        findParams.push({ writtenname: Like(`%${writtenname}%`) });
      if (firstname) findParams.push({ firstname: Like(`%${firstname}%`) });
      if (lastname) findParams.push({ lastname: Like(`%${lastname}%`) });
      if (tags) findParams.push({ tags: Like(`%${tags}%`) });

      let found = this.authorRepository.find({
        where: findParams,
        take: limit,
      });

      return found;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async findOne(id: string): Promise<AuthortEntity> {
    try {
      const found = await this.authorRepository.findOne({
        where: { id: id },
      });
      if (!found) {
        throw new NotFoundException("Post not found");
      }
      return found;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const found = await this.authorRepository.findOne({
        where: { id: id },
      });
      if (!found) {
        throw new NotFoundException("Author not found");
      }
      await this.authorRepository.delete(found);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
