-- +goose Up
-- +goose StatementBegin
CREATE TABLE "author" (
                         "id"                   uuid DEFAULT gen_random_uuid(),
                         "writtenname"          varchar(255) NOT NULL,
                         "firstname"            varchar(255) NOT NULL,
                         "lastname"             varchar(255) NOT NULL,
                         "tags"                 varchar(512) NOT NULL,
                         "active"               BOOLEAN NOT NULL DEFAULT 1,
                         "created_at"           timestamptz NOT NULL DEFAULT now(),
                         "updated_at"           timestamptz NOT NULL DEFAULT now(),
                         "deleted_at"           timestamptz,
                         PRIMARY KEY (id)
);

CREATE INDEX ON "author" ("id");
CREATE INDEX ON "author" ("writtenname");
CREATE INDEX ON "author" ("firstname");
CREATE INDEX ON "author" ("lastname");


CREATE TRIGGER update_author_updated_at
    BEFORE UPDATE ON author FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TRIGGER IF EXISTS update_author_updated_at ON "update_author_updated_at";
DROP TABLE if exists author cascade;
-- +goose StatementEnd