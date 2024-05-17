-- +goose Up
-- +goose StatementBegin
CREATE TABLE "follows" (
                           "id" uuid DEFAULT gen_random_uuid() PRIMARY KEY,
                           "user_id" uuid NOT NULL,
                           "target_id" uuid NOT NULL,
                           "created_at" timestamptz NOT NULL DEFAULT now(),
                           FOREIGN KEY ("user_id") REFERENCES "users" ("id"),
                           FOREIGN KEY ("target_id") REFERENCES "users" ("id")
);

CREATE INDEX ON "follows" ("user_id");
CREATE INDEX ON "follows" ("target_id");
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS "follows";
-- +goose StatementEnd