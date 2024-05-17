-- +goose Up
-- +goose StatementBegin
ALTER TABLE posts ADD COLUMN embedded text DEFAULT '';
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE posts DROP COLUMN embedded;
-- +goose StatementEnd