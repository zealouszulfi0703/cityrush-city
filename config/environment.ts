// config/environment.ts

/**
 * --- Environment Configuration ---
 *
 * This file determines the application's current running environment.
 *
 * To simulate a production environment, change IS_PRODUCTION to `true`.
 * In a real-world scenario, this value would be set by a build process
 * using environment variables (e.g., `process.env.NODE_ENV === 'production'`).
 *
 * Production Environment Features:
 * - Requires a unique user ID to play.
 * - Simulates a secure login flow.
 *
 * Development/Test Environment Features:
 * - Allows immediate access to the game without a login step.
 * - Ideal for testing and rapid development.
 */
export const IS_PRODUCTION = false; // <-- CHANGE TO `true` TO SIMULATE PRODUCTION
