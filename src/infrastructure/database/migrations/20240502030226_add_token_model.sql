-- +goose Up
-- +goose StatementBegin
CREATE TABLE "tokens" (
                         "id"                   uuid default gen_random_uuid(),
                         "user_id"              varchar(255),
                         "token"                text,
                         "hash"                 text,
                         "created_at"           timestamptz default now(),
                         "updated_at"           timestamptz default now(),
                         "deleted_at"           timestamptz,
                         PRIMARY KEY (id)
);

create trigger update_tokens_updated_at
    before update on tokens for each row execute procedure update_updated_at_column();
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE if exists tokens cascade;
-- +goose StatementEnd