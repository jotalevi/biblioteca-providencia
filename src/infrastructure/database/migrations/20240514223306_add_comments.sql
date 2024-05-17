-- +goose Up
-- +goose StatementBegin
CREATE TABLE "comments" (
                            "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
                            "post_id" uuid NOT NULL,
                            "user_id" uuid NOT NULL,
                            "content" text NOT NULL,
                            "created_at" timestamptz NOT NULL DEFAULT now(),
                            "updated_at" timestamptz NOT NULL DEFAULT now(),
                            "deleted_at" timestamptz,
                            FOREIGN KEY ("post_id") REFERENCES "posts" ("id"),
                            FOREIGN KEY ("user_id") REFERENCES "users" ("id")
);

CREATE INDEX ON "comments" ("post_id");
CREATE INDEX ON "comments" ("user_id");

CREATE TRIGGER update_comments_updated_at
    BEFORE UPDATE ON comments FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TRIGGER IF EXISTS update_comments_updated_at ON "comments";
DROP TABLE IF EXISTS "comments";
-- +goose StatementEnd
