import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = 'https://backend-nodejs-main.up.railway.app/webhook/rest/webhook'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  getResponse(message: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { sender: 'user', message: message });
  }
}
