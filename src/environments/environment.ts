export const environment = {
  production: false,  // In `environment.prod.ts` wird `true` sein
  resend: {
    apiKey: 'Test-API-123', // Wir setzen den API-Key später als Umgebungsvariable
    domain: 'mail.metafeller.com',
    endpoint: 'https://api.resend.com/emails'
  }
};
