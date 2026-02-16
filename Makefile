POSTGRES_CONTAINER_NAME ?= astrobio-pg

dev-down:
	docker compose down -v

dev-up:
	docker compose up -d

wait-db:
	@echo "Aguardando o banco de dados iniciar..."
	@while [ "`docker inspect -f {{.State.Health.Status}} $(POSTGRES_CONTAINER_NAME)`" != "healthy" ]; do \
		sleep 2; \
	done
	@echo "Banco de dados pronto!"

dev-reset-full:
	make dev-down
	make dev-up
	make wait-db
	pnpm db:reset || npm run db:reset

dev-start:
	pnpm start:dev || npm run start:dev

