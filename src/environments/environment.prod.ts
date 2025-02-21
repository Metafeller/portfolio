export const environment = {
  production: true,  // In `environment.ts` wird `false` sein
  resend: {
    apiKey: 'Test-API-123', // Wir setzen den API-Key später als Umgebungsvariable
    domain: 'mail.metafeller.com',
    endpoint: 'https://api.resend.com/emails'
  }
};
