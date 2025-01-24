import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service'; // Import AuthService
import { User } from '../../models/user.model'; // Import User interface

@Component({
  selector: 'app-back-end-login',
  templateUrl: './back-end-login.component.html',
  styleUrls: ['./back-end-login.component.css'],
})
export class BackEndLoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService // Use AuthService
  ) {}

  login(form: any) {
    if (form.valid) {
        this.authService.login(this.username, this.password).subscribe(
            (response: { token: string; user: User }) => {
                this.authService.storeToken(response.token); // Store the token
                localStorage.setItem('currentUser', JSON.stringify(response.user)); // Store user info
                this.router.navigate(['/back-end/dashboard']); // Redirect to the dashboard after login
            },
            error => {
                console.error('Login failed:', error);
                this.openSnackBar('Login failed: ' + (error.error?.message || 'Unknown error'), 'Close');
            }
        );
    } else {
        console.log("Form is invalid");
    }
}

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
