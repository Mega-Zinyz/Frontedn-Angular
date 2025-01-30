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

  fixProfileUrl(profilUrl: string | null | undefined): string {
    const BASE_BACKEND_URL = "profil_img/";

    if (!profilUrl) {
      return "assets/profile.png"; // Gambar default jika null/undefined
    }

    return profilUrl.startsWith("http") ? profilUrl : `${BASE_BACKEND_URL}${profilUrl}`;
  }
  
  ngOnInit() {
    this.isLoading = true;
    this.authService.user$.subscribe(
      (user: User | null) => {
        this.user = user; // Set the user object from the service
        this.isLoading = false; // Stop loading when user data is received
        console.log('Current User:', user); // Log the user object
        console.log('Profile URL:', this.user?.profil_url); // Check the profile URL
      },
      (error) => {
        this.errorMessage = 'Failed to load user data.'; // Set error message if needed
        this.isLoading = false; // Stop loading on error
      }
    );
  }
  
  logout() {
    this.authService.logout(); // Clear token and user data
    this.router.navigate(['/back-end/login']); // Redirect to login page
  }  
}