import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RasaStatusResponse } from '../models/rasa-status-response.model'; // Adjust path as needed
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RasaService {
  private baseUrl = environment.apiUrl || 'defaultBaseUrl';

  constructor(private http: HttpClient) {}

  // Method to send a message to the Rasa server
  sendMessage(message: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/message`, {
      sender: 'user',
      message: message,
    }).pipe(
      catchError(err => {
        console.error('Error sending message:', err);
        return throwError(err);
      })
    );
  }  
  
  startRasa(): Observable<any> {
    return this.http.post(`${this.baseUrl}/start`, {})
      .pipe(catchError(err => {
        console.error('Error starting Rasa:', err);
        return throwError(err);
      }));
  }

  stopRasa(): Observable<any> {
    return this.http.post(`${this.baseUrl}/stop`, {})
      .pipe(catchError(err => {
        console.error('Error stopping Rasa:', err);
        return throwError(err);
      }));
  }

  restartRasa(): Observable<any> {
    return this.http.post(`${this.baseUrl}/restart`, {})
      .pipe(catchError(err => {
        console.error('Error restarting Rasa:', err);
        return throwError(err);
      }));
  }

  // Fetch today's logs
  getTodayLogs(): Observable<string> {
    return this.http.get(`${this.baseUrl}/logs/today`, { responseType: 'text' })
      .pipe(catchError(err => {
        console.error('Error fetching today\'s logs:', err);
        return throwError(err);
      }));
  }

  // Fetch general logs
  getGeneralLogs(): Observable<string> {
    return this.http.get(`${this.baseUrl}/logs/general`, { responseType: 'text' })
      .pipe(catchError(err => {
        console.error('Error fetching general logs:', err);
        return throwError(err);
      }));
  }
  
  // Get the current status of the Rasa server
  getStatus(): Observable<RasaStatusResponse> {
    return this.http.get<RasaStatusResponse>(`${this.baseUrl}/status`)
      .pipe(catchError(err => {
        console.error('Error fetching Rasa status:', err);
        return throwError(err);
      }));
  }
}
