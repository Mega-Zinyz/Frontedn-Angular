import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from './models/user.model'; // Adjust the path as necessary
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private authUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.authUrl}/login`, { username, password }).pipe(
      catchError(this.handleError('login'))
    );
  }

  private handleError(operation: string) {
    return (error: any): Observable<never> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(error);
    };
  }
}
