export const environment = {
    production: false, // Set to true for production builds
    apiUrl: process.env["BACKEND_NODEJS_URL"] || 'http://localhost:3000/api/auth', // Default fallback
};  