-- +goose Up
-- +goose StatementBegin
CREATE TABLE "likes" (
                         "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
                         "user_id" uuid NOT NULL,
                         "post_id" uuid NOT NULL,
                         "created_at" timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
                         FOREIGN KEY ("user_id") REFERENCES "users" ("id"),
                         FOREIGN KEY ("post_id") REFERENCES "posts" ("id")
);

CREATE INDEX ON "likes" ("user_id");
CREATE INDEX ON "likes" ("post_id");
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS "likes";
-- +goose StatementEnd