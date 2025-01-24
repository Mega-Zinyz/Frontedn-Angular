export const environment = {
    production: true,
    apiUrl: process.env["BACKEND_NODEJS_URL"] || 'http://localhost:3000/api/auth', // Default fallback
  };
  