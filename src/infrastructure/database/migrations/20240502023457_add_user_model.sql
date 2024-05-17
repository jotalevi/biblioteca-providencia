-- +goose Up
-- +goose StatementBegin
CREATE TABLE "users" (
                         "id"                   uuid DEFAULT gen_random_uuid(),
                         "firstname"            varchar(255) NOT NULL DEFAULT '',
                         "lastname"             varchar(255) NOT NULL DEFAULT '',
                         "tagname"              varchar(255) NOT NULL UNIQUE,
                         "password"             text NOT NULL,
                         "email"                varchar(255) NOT NULL UNIQUE,
                         "roles"                text[] NOT NULL DEFAULT ARRAY['user'],
                         "bio"                  text NOT NULL DEFAULT '',
                         "profile_picture_url"  text NOT NULL DEFAULT '',
                         "created_at"           timestamptz NOT NULL DEFAULT now(),
                         "updated_at"           timestamptz NOT NULL DEFAULT now(),
                         "deleted_at"           timestamptz,
                         PRIMARY KEY (id)
);

CREATE INDEX ON "users" ("tagname");
CREATE INDEX ON "users" ("email");

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TRIGGER IF EXISTS update_users_updated_at ON "users";
DROP TABLE if exists users cascade;
-- +goose StatementEnd