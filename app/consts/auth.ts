export const AUTH = {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    redirectUrl: `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${import.meta.env.VITE_GOOGLE_REDIRECT}&prompt=consent&response_type=token&client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&scope=email%20profile`,
};
