-- +goose Up
-- +goose StatementBegin
CREATE TABLE "book" (
                         "id"                   uuid DEFAULT gen_random_uuid(),
                         "title"                varchar(255) NOT NULL DEFAULT '',
                         "author"               uuid NOT NULL,
                         "releasedate"          varchar(255) NOT NULL ,
                         "saleblestock"         NUMBER NOT NULL ,
                         "rentablestock"        NUMBER NOT NULL ,
                         "price"                NUMBER NOT NULL ,
                         "created_at"           timestamptz NOT NULL DEFAULT now(),
                         "updated_at"           timestamptz NOT NULL DEFAULT now(),
                         "deleted_at"           timestamptz,
                         PRIMARY KEY (id)
);

CREATE INDEX ON "book" ("id");
CREATE INDEX ON "book" ("titke");
CREATE INDEX ON "book" ("author");

CREATE TRIGGER update_book_updated_at
    BEFORE UPDATE ON book FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TRIGGER IF EXISTS update_book_updated_at ON "update_book_updated_at";
DROP TABLE if exists book cascade;
-- +goose StatementEnd