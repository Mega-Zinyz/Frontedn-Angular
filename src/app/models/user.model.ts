// src/app/models/user.model.ts
export interface User {
    no_user: string;      // Unique identifier for the user
    username: string;     // User's username for login
    password?: string;    // Optional plaintext password for login; use with caution
    profil_url: string | null;  // URL to the user's profile image
    token?: string;       // Optional token for authentication; use if needed in the user object
}
