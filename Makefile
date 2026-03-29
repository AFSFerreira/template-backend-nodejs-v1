include .env
export

POSTGRES_CONTAINER_NAME ?= template-pg
REDIS_CONTAINER_NAME ?= template-redis

dev-down:
	docker compose down -v

dev-up:
	docker compose up -d

dev-type-generate:
	(command -v pnpm > /dev/null 2>&1 && pnpm db:generate) || npm run db:generate

dev-install:
	(command -v pnpm > /dev/null 2>&1 && pnpm install) || npm install

wait-db:
	@echo "Aguardando o banco de dados iniciar..."
	@while [ "`docker inspect -f {{.State.Health.Status}} $(POSTGRES_CONTAINER_NAME)`" != "healthy" ]; do \
		sleep 2; \
	done
	@echo "Banco de dados pronto!"

wait-redis:
	@echo "Aguardando o Redis iniciar..."
	@while [ "`docker inspect -f '{{.State.Health.Status}}' $(REDIS_CONTAINER_NAME)`" != "healthy" ]; do \
		sleep 2; \
	done
	@echo "Redis pronto!"

wait-infra: wait-db wait-redis
	@echo "Toda a infraestrutura está pronta e saudável! 🚀"

dev-reset-full:
	make dev-down
	make dev-up
	make wait-infra
	make dev-install
	(command -v pnpm > /dev/null 2>&1 && pnpm db:reset) || npm run db:reset

dev-start:
	(command -v pnpm > /dev/null 2>&1 && pnpm start:dev) || npm run start:dev
