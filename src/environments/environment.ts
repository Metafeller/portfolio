// export const environment = {
//   production: false,  // In `environment.prod.ts` wird `true` sein
//   resend: {
//     apiKey: process.env['RESEND_API_KEY'] || '', // Wir setzen den API-Key als Umgebungsvariable mit .env
//     domain: 'mail.metafeller.com',
//     endpoint: 'https://api.resend.com/emails'
//   }
// };

export const environment = {
  production: false,
  brevo: {
    apiKey: '', // Hier wird der API-Key aus .env geladen
    endpoint: 'https://api.brevo.com/v3/smtp/email'
  }
};
