import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private profileUrl = `${environment.apiUrl}/profile`;
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    this.initializeUser(); // Initialize user state from localStorage
  }

  // Initialize user from localStorage
  private initializeUser() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const user: User = JSON.parse(userJson);
      this.userSubject.next(user);
    }
  }

  // Get the list of users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.profileUrl}/accounts`).pipe(
      catchError(this.handleError('getUsers'))
    );
  }

  // Get user by no_user
  getUserByNoUser(no_user: string): Observable<User> {
    return this.http.get<User>(`${this.profileUrl}/accounts/${no_user}`).pipe(
      catchError(this.handleError(`getUserByNoUser no_user=${no_user}`))
    );
  }

  // Update user
  updateUser(user: User, file: File | null, password: string | null): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('no_user', user.no_user);

    if (user.username) {
      formData.append('username', user.username);
    }

    if (password) {
      formData.append('password', password);
    }

    if (file) {
      formData.append('profil_url', file, file.name);
    }

    return this.http.put(`${this.profileUrl}/accounts/${user.no_user}`, formData).pipe(
      catchError(this.handleError(`updateUser no_user=${user.no_user}`))
    );
  }

  // Register a user
  registerUser(username: string, password: string, profil_url: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('profil_url', profil_url, profil_url.name);

    return this.http.post(`${this.profileUrl}/register`, formData).pipe(
      catchError(this.handleError('registerUser'))
    );
  }

  // Delete a user
  deleteUser(no_user: string): Observable<any> {
    return this.http.delete(`${this.profileUrl}/accounts/${no_user}`).pipe(
      catchError(this.handleError(`deleteUser no_user=${no_user}`))
    );
  }

  // Error handling method
  private handleError(operation: string) {
    return (error: any): Observable<never> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(error);
    };
  }
}
