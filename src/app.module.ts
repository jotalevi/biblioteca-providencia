import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { DataSource } from "typeorm";
import { LoggerModule } from "nestjs-pino";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

// general
import configuration from "./domain/config/configuration";
import DatabaseLogger from "./infrastructure/tools/logger/database-logger";

// entities
import { AuthortEntity } from "./application/author/author.entity";
import { BookEntity } from "./application/book/book.entity";
import { SaleEntity } from "./application/sale/sale.entity";

// modules
import { AuthorModule } from "./application/author/author.module";
import { BookModule } from "./application/book/book.module";
import { SaleModule } from "./application/sale/sale.module";

const getLogTransport = () => {
  if (process.env.NODE_ENV === "production") {
    return undefined;
  } else {
    return {
      target: "pino-pretty",
      options: {
        signleLine: true,
        colorize: true,
        colorizeObjects: true,
        levelFirst: true,
      },
    };
  }
};

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: () => ({
          context: "HTTP",
        }),
        transport: getLogTransport(),
        autoLogging: process.env.NODE_ENV !== "test",
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        logger: new DatabaseLogger(),
        type: "postgres",
        host: configService.get("postgres.host"),
        port: configService.get("postgres.port"),
        username: configService.get("postgres.username"),
        password: configService.get("postgres.password"),
        database: configService.get("postgres.database"),
        namingStrategy: new SnakeNamingStrategy(),
        entities: [AuthortEntity, BookEntity, SaleEntity],
        synchronize: false,
        extra: {
          query_timeout: 10000,
          connectionTimeoutMillis: 15000,
        },
        ssl: false,
      }),
      inject: [ConfigService],
    }),
    AuthorModule,
    BookModule,
    SaleModule,
  ],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
