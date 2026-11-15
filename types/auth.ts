// Shared auth/user types (mirrors Better Auth's session user).

/** Role a HireLoop account can hold (Better Auth `user.role`). */
export type Role = "seeker" | "recruiter" | "admin";

/** Account status shown in the admin User Management table.
 *  Suspension isn't tracked by the API yet — the UI defaults to "Active". */
export type UserStatus = "Active" | "Suspended";

/** One platform user as returned by the admin users list (Express `/users`). */
export type AdminUser = {
    id?: string;
    /** Mongo documents carry `_id` — `getUsers` normalizes it to `id`. */
    _id?: string;
    name: string;
    email: string;
    emailVerified?: boolean;
    image?: string | null;
    role?: Role;
    premium?: boolean;
    createdAt: string | Date;
    status?: UserStatus;
};

/** Better Auth error — `error.message` may be absent. */
export type AuthError = { message?: string } | null;
