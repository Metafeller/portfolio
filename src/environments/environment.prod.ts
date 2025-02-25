// export const environment = {
//   production: true,  // In `environment.ts` wird `false` sein
//   resend: {
//     apiKey: process.env['RESEND_API_KEY'] || '', // Wir setzen den API-Key als Umgebungsvariable mit .env
//     domain: 'mail.metafeller.com',
//     endpoint: 'https://api.resend.com/emails'
//   }
// };

export const environment = {
  production: true,
  brevo: {
    apiKey: '', // Hier wird der API-Key aus .env geladen
    endpoint: 'https://api.brevo.com/v3/smtp/email'
  }
};
