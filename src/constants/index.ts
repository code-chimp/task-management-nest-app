/**
 * Application-wide constants for configuration and validation.
 *
 * - DEFAULT_PORT: Default port for the server.
 * - PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH: Password length constraints.
 * - USERNAME_MAX_LENGTH, USERNAME_MIN_LENGTH: Username length constraints.
 * - POSTGRES_CONFLICT_ERROR: Postgres error code for unique constraint violation.
 */

export const DEFAULT_PORT = 3001;
export const DEFAULT_POSTGRES_PORT = 5432;
export const PASSWORD_MAX_LENGTH = 32;
export const PASSWORD_MIN_LENGTH = 8;
export const USERNAME_MAX_LENGTH = 20;
export const USERNAME_MIN_LENGTH = 4;

export const POSTGRES_CONFLICT_ERROR = '23505';
