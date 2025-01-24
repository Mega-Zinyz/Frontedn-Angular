import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://backend-nodejs.railway.internal/api/auth'; // Replace with your API URL
  private tokenKey = 'auth_token'; // Key for storing token
  private userKey = 'currentUser'; // Key for storing user info
  private userSubject = new BehaviorSubject<User | null>(this.getCurrentUser());
  user$ = this.userSubject.asObservable(); // Observable to emit user changes

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<{ token: string; user: User }> {
    return this.http.post<{ token: string; user: User }>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        this.storeToken(response.token);
        localStorage.setItem(this.userKey, JSON.stringify(response.user));
        this.userSubject.next(response.user);
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Login failed', error);
        return throwError(error);
      })
    );
  }

  storeToken(token: string): void {
    localStorage.setItem(this.tokenKey, token); // Store token in local storage
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey); // Retrieve token
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey); // Remove token from local storage
    localStorage.removeItem(this.userKey); // Optionally remove user info
    this.userSubject.next(null); // Emit null for user subject
    this.router.navigate(['/back-end/login']); // Redirect to login
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null; // Check if token exists
  }

  private getCurrentUser(): User | null {
    const user = localStorage.getItem(this.userKey);
    return user ? JSON.parse(user) : null; // Retrieve and parse user info
  }
}
