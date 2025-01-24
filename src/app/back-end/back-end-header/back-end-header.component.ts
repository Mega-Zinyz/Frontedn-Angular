import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Adjust the path as needed
import { User } from '../../models/user.model'; // Adjust the path as needed
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

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
        this.user = user;
  
        // Pastikan URL lengkap dibuat dengan environment.apiUrl
        if (this.user?.profil_url && !this.user.profil_url.startsWith('http')) {
          this.user.profil_url = `${environment.apiUrl}/profil_img/${this.user.profil_url}`;
        }
        console.log('Updated profil_url:', this.user?.profil_url);

        this.isLoading = false;
        console.log('Current User:', user);
        console.log('Profile URL:', this.user?.profil_url);
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
