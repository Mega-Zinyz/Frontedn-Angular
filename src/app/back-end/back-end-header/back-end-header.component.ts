import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-end-header',
  templateUrl: './back-end-header.component.html',
  styleUrls: ['./back-end-header.component.css']
})
export class BackEndHeaderComponent implements OnInit {
  user: User | null = null;
  isLoading: boolean = false; 
  errorMessage: string | null = null;

  constructor(
    public authService: AuthService, // ubah menjadi public
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.authService.user$.subscribe(
      (user: User | null) => {
        this.user = user;
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
    this.authService.logout();
    this.router.navigate(['/back-end/login']);
  }
}
