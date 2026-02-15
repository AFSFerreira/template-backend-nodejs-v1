dev-down:
	docker compose down -v

dev-up:
	docker compose up -d

dev-reset-full:
	make dev-down
	make dev-up
	pnpm db:reset || npm run db:reset

