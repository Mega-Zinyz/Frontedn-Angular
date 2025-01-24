import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Sesuaikan dengan path yang benar
import { User } from '../../models/user.model'; // Sesuaikan dengan path yang benar
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-back-end-header',
  templateUrl: './back-end-header.component.html',
  styleUrls: ['./back-end-header.component.css']
})
export class BackEndHeaderComponent implements OnInit {
  user: User | null = null;
  isLoading: boolean = false; // State loading
  errorMessage: string | null = null; // Error message jika gagal

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.authService.user$.subscribe(
      (user: User | null) => {
        this.user = user;
  
        // Periksa dan proses profil_url
        if (this.user?.profil_url) {
          // Jika profil_url tidak dimulai dengan 'http', maka tambahkan base URL
          if (!this.user.profil_url.startsWith('http')) {
            // Pastikan apiUrl diakhiri dengan '/' sebelum menambahkan path
            const baseUrl = environment.apiUrl.endsWith('/') ? environment.apiUrl : `${environment.apiUrl}/`;
            
            // Jika profil_url sudah memiliki '/profil_img/', pastikan kita tidak menambahkannya lagi
            if (this.user.profil_url.startsWith('profil_img/')) {
              this.user.profil_url = `${baseUrl}${this.user.profil_url}`;
            } else {
              this.user.profil_url = `${baseUrl}profil_img/${this.user.profil_url}`;
            }
          }
        }
           
  
        console.log('Processed Profile URL:', this.user?.profil_url);  // Debug URL
  
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Failed to load user data.';
        this.isLoading = false;
      }
    );
  }  

  logout() {
    this.authService.logout(); // Clear token dan user data
    this.router.navigate(['/back-end/login']); // Redirect ke halaman login
  }  
}
