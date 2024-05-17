-- +goose Up
-- +goose StatementBegin
CREATE TABLE "sale" (
                         "id"                   uuid DEFAULT gen_random_uuid(),
                         "sold_by"              vARCHAR NOT NULL,
                         "sold_to"              vARCHAR NOT NULL,
                         "subtotal"             NUMBER NOT NULL ,
                         "paymentcode"          VARCHAR NOT NULL ,
                         "created_at"           timestamptz NOT NULL DEFAULT now(),
                         "updated_at"           timestamptz NOT NULL DEFAULT now(),
                         "deleted_at"           timestamptz,
                         PRIMARY KEY (id)
);

CREATE INDEX ON "sale" ("id");
CREATE INDEX ON "sale" ("sold_by");
CREATE INDEX ON "sale" ("sold_to");

CREATE TRIGGER update_sale_updated_at
    BEFORE UPDATE ON sale FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TRIGGER IF EXISTS update_sale_updated_at ON "update_sale_updated_at";
DROP TABLE if exists sale cascade;
-- +goose StatementEnd