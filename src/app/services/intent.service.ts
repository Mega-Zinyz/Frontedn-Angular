// src/app/services/intent.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Intent } from '../models/intent.model';

@Injectable({
  providedIn: 'root'
})
export class IntentService {
  private baseUrl = 'http://localhost:8080/api/intents';

  constructor(private http: HttpClient) {}

  getIntents(): Observable<Intent[]> {
    return this.http.get<Intent[]>(this.baseUrl).pipe(
      catchError(error => {
        console.error('Error fetching intents:', error);
        return throwError(error); // Handle error appropriately
      })
    );
  }

  // Menyimpan intent baru
  saveIntent(intent: Intent): Observable<{ message: string, id: number }> {
    return this.http.post<{ message: string, id: number }>(this.baseUrl, intent);
  } 
  
  updateIntent(intent: Intent): Observable<any> {
    return this.http.put(`${this.baseUrl}/${intent.id}`, intent);
  }
  
  // Mengimpor intents dari NLU
  importIntents(): Observable<any> {
    return this.http.post(`${this.baseUrl}/import`, {});
  }

  // Method to export intents
  exportIntents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/export`, { responseType: 'text' });
  }

  // Menghapus intent berdasarkan ID
  deleteIntent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  trainRasa(): Observable<any> {
    return this.http.post('/api/train', {});
  }  
}
