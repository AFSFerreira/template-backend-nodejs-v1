-- CreateEnum
CREATE TYPE "UserRoleType" AS ENUM ('ADMIN', 'DEFAULT');

-- CreateEnum
CREATE TYPE "AuthenticationStatusType" AS ENUM ('SUCCESS', 'USER_NOT_EXISTS', 'INCORRECT_PASSWORD', 'BLOCKED');

-- CreateEnum
CREATE TYPE "SystemActionType" AS ENUM ('MEMBERSHIP_APPROVED', 'MEMBERSHIP_REJECTED', 'ACCOUNT_ACTIVATED', 'ACCOUNT_INACTIVATED', 'ACCOUNT_DELETED', 'ROLE_CHANGED', 'DIRECTOR_BOARD_CREATED', 'DIRECTOR_BOARD_DELETED', 'ADMIN_ROLE_TRANSFERRED');

-- CreateTable
CREATE TABLE "user_action_audits" (
    "id" SERIAL NOT NULL,
    "action_type" "SystemActionType" NOT NULL,
    "ip_address" INET,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actor_id" TEXT,
    "target_id" TEXT,

    CONSTRAINT "user_action_audits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "authentication_audits" (
    "id" SERIAL NOT NULL,
    "ip_address" INET,
    "remote_port" TEXT,
    "browser" TEXT,
    "status" "AuthenticationStatusType" NOT NULL,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT,

    CONSTRAINT "authentication_audits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "public_id" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "birthdate" DATE NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "UserRoleType" NOT NULL DEFAULT 'DEFAULT',
    "login_attempts" INTEGER NOT NULL DEFAULT 0,
    "last_login" TIMESTAMPTZ(3),
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL,
    "recovery_password_token" TEXT,
    "recovery_password_token_expires_at" TIMESTAMPTZ(3),
    "email_verification_token" TEXT,
    "email_verification_token_expires_at" TIMESTAMPTZ(3),
    "email_verified_at" TIMESTAMPTZ(3)
);

-- CreateIndex
CREATE INDEX "user_action_audits_action_type_idx" ON "user_action_audits"("action_type");

-- CreateIndex
CREATE INDEX "user_action_audits_actor_id_idx" ON "user_action_audits"("actor_id");

-- CreateIndex
CREATE INDEX "user_action_audits_target_id_idx" ON "user_action_audits"("target_id");

-- CreateIndex
CREATE INDEX "authentication_audits_user_id_status_created_at_idx" ON "authentication_audits"("user_id", "status", "created_at");

-- CreateIndex
CREATE UNIQUE INDEX "users_public_id_key" ON "users"("public_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_idx" ON "users"("role");

-- CreateIndex
CREATE UNIQUE INDEX "users_recovery_password_token_key" ON "users"("recovery_password_token") WHERE (recovery_password_token IS NOT NULL);

-- AddForeignKey
ALTER TABLE "user_action_audits" ADD CONSTRAINT "user_action_audits_actor_id_fkey" FOREIGN KEY ("actor_id") REFERENCES "users"("public_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_action_audits" ADD CONSTRAINT "user_action_audits_target_id_fkey" FOREIGN KEY ("target_id") REFERENCES "users"("public_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authentication_audits" ADD CONSTRAINT "authentication_audits_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("public_id") ON DELETE SET NULL ON UPDATE CASCADE;
