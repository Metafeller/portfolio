import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'; // ✅ Import der API-Daten aus `environment.ts`

@Injectable({
  providedIn: 'root' // ✅ Der Service ist überall nutzbar
})
export class MailgunService {
  private apiUrl = environment.mailgun.endpoint;
  private apiKey = environment.mailgun.apiKey;
  private domain = environment.mailgun.domain;

  constructor(private http: HttpClient) {}

  sendEmail(to: string, subject: string, message: string) {
    const formData = new URLSearchParams();
    formData.append('from', `Portfolio Contact Form <no-reply@${this.domain}>`);
    formData.append('to', to);
    formData.append('subject', subject);
    formData.append('text', message);

    const headers = new HttpHeaders({
      'Authorization': `Basic ${btoa(`api:${this.apiKey}`)}`, // ✅ Basic Auth für API-Zugriff
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(this.apiUrl, formData.toString(), { headers });
  }
}
