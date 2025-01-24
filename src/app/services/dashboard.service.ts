// src/app/services/dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardData } from '../models/dashboard.mode'; // Impor model
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = environment.apiUrl; // Ganti dengan URL backend Anda

  constructor(private http: HttpClient) {}

  // Mengambil total intents
  getTotalIntents(): Observable<{ totalIntents: number }> {
    return this.http.get<{ totalIntents: number }>(`${this.apiUrl}/total-intents`);
  }

  // Mengambil jumlah ruangan yang tersedia
  getAvailableRooms(): Observable<{ availableRooms: number }> {
    return this.http.get<{ availableRooms: number }>(`${this.apiUrl}/available-rooms`);
  }

  // Mengambil jumlah registrasi pengguna
  getUserRegistrations(): Observable<{ userRegistrations: number }> {
    return this.http.get<{ userRegistrations: number }>(`${this.apiUrl}/user-registrations`);
  }
}
