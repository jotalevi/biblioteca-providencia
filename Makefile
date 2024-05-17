COFRADIA_API_APPLICATION=src/infrastructure/docker/docker-compose.yml
POSTGRES_DB=src/infrastructure/docker/database/postgres.yml

generate-keys:
ifneq ("$(wildcard $(PATH_TO_PRIVATE_KEY))","")
	@echo "Skip generation of keys: pem file already exist"
else
	@cd src/infrastructure/conf/keys; openssl genpkey -algorithm RSA -out rsa_private.pem -pkeyopt rsa_keygen_bits:2048
	@cd src/infrastructure/conf/keys; openssl rsa -in rsa_private.pem -pubout -out rsa_public.pem
endif

install i:
	@npm install copyfiles -g
	@npm install

build:
	@npm run build

build-docker: build
	@docker compose -f $(COFRADIA_API_APPLICATION) build --no-cache

dev: build
	@docker compose -f $(COFRADIA_API_APPLICATION) down
	@docker compose -f $(COFRADIA_API_APPLICATION) up --remove-orphans --attach backend

down:
	@docker compose -f $(COFRADIA_API_APPLICATION) down

test t:
	@npm run test

add-migration:
ifdef name
	@goose -dir ./src/infrastructure/database/migrations create $(name) sql
else
	@echo "name is required"
	@exit 1
endif

run-local-migrations:
	@goose -dir ./src/infrastructure/database/migrations postgres "postgresql://postgres:postgres@localhost:5432/postgres?sslmode=disable" up

drop-local-migration:
	@goose -dir ./src/infrastructure/database/migrations postgres "postgresql://postgres:postgres@localhost:5432/postgres?sslmode=disable" down

get-bearer-token-for-service-account:
	@kubectl -n kubernetes-dashboard create token admin-user

open-dashboard:
	@open https://127.0.0.1:8443/
	@kubectl -n kubernetes-dashboard port-forward svc/kubernetes-dashboard-kong-proxy 8443:443

.PHONY: test