import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Adjust the path as needed
import { User } from '../../models/user.model'; // Adjust the path as needed
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-end-header',
  templateUrl: './back-end-header.component.html',
  styleUrls: ['./back-end-header.component.css']
})
export class BackEndHeaderComponent implements OnInit {
  user: User | null = null;
  isLoading: boolean = false; // Add loading state
  errorMessage: string | null = null; // Add error message

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.authService.user$.subscribe(
      (user: User | null) => {
        if (user) {
          // Add base URL for profile images if missing
          const baseUrl = 'https://backend-nodejs-main.up.railway.app';
          user.profil_url = user.profil_url
            ? `${baseUrl}/profil_img/${user.profil_url}`
            : null;
        }
        this.user = user;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load user data.';
        this.isLoading = false;
      }
    );
}
  
  logout() {
    this.authService.logout(); // Clear token and user data
    this.router.navigate(['/back-end/login']); // Redirect to login page
  }  
}
