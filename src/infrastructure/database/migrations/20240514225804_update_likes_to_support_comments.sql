-- +goose Up
-- +goose StatementBegin
ALTER TABLE "likes"
    ADD COLUMN "comment_id" uuid,
    ADD CONSTRAINT "fk_likes_comments" FOREIGN KEY ("comment_id") REFERENCES "comments" ("id");

CREATE INDEX ON "likes" ("comment_id");
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE "likes"
    DROP CONSTRAINT IF EXISTS "fk_likes_comments",
    DROP COLUMN IF EXISTS "comment_id";
-- +goose StatementEnd
