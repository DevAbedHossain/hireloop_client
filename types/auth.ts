// Shared auth/user types (mirrors Better Auth's session user).

/** Role a HireLoop account can hold (Better Auth `user.role`). */
export type Role = "seeker" | "recruiter" | "admin";

/** Better Auth error — `error.message` may be absent. */
export type AuthError = { message?: string } | null;
