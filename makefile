# Makefile for Kurisu Noatorie with PM2

APP_NAME=kurisu-noatorie

.PHONY: dev build start stop restart delete logs list

dev:
	@echo "Starting development server with PM2..."
	pm2 start pnpm --name $(APP_NAME)-dev --watch -- run dev

build:
	@echo "Building the application..."
	pnpm build

start:
	@echo "Starting production server with PM2..."
	pm2 start pnpm --name $(APP_NAME)-prod -- run start

stop:
	@echo "Stopping all PM2 processes for $(APP_NAME)..."
	pm2 stop $(APP_NAME)-dev || true
	pm2 stop $(APP_NAME)-prod || true

restart:
	@echo "Restarting all PM2 processes for $(APP_NAME)..."
	pm2 restart $(APP_NAME)-dev || true
	pm2 restart $(APP_NAME)-prod || true

delete:
	@echo "Deleting all PM2 processes for $(APP_NAME)..."
	pm2 delete $(APP_NAME)-dev || true
	pm2 delete $(APP_NAME)-prod || true

logs:
	pm2 logs

list:
	pm2 list

save:
	pm2 save && pm2 startup
