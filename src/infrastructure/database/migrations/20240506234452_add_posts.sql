-- +goose Up
-- +goose StatementBegin
CREATE TABLE "posts" (
                         "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
                         "user_id" uuid NOT NULL,
                         "content" text NOT NULL,
                         "media_url" text,
                         "media_type" text,
                         "channel" text NOT NULL,
                         "created_at" timestamptz NOT NULL DEFAULT now(),
                         "updated_at" timestamptz NOT NULL DEFAULT now(),
                         "deleted_at" timestamptz,
                         FOREIGN KEY ("user_id") REFERENCES "users" ("id")
);

CREATE INDEX ON "posts" ("user_id");

CREATE TRIGGER update_posts_updated_at
    BEFORE UPDATE ON posts FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TRIGGER IF EXISTS update_posts_updated_at ON "posts";
DROP TABLE IF EXISTS "posts";
-- +goose StatementEnd