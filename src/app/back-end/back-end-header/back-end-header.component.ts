import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
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
          // Pastikan profil_url tidak berulang (double URL)
          if (!this.user.profil_url.startsWith('http')) {
            // Periksa apakah profil_url sudah memiliki 'profil_img/'
            if (this.user.profil_url.startsWith('profil_img/')) {
              // Jika sudah, hanya tambahkan base URL tanpa duplikasi
              this.user.profil_url = `${environment.apiUrl}/${this.user.profil_url}`;
            } else {
              // Jika belum, tambahkan 'profil_img/' untuk URL lengkap
              this.user.profil_url = `${environment.apiUrl}/profil_img/${this.user.profil_url}`;
            }
          }
        }

        this.isLoading = false;
        console.log('Current User:', user);
        console.log('Processed Profile URL:', this.user?.profil_url);
      },
      (error) => {
        this.errorMessage = 'Failed to load user data.'; // Error handling
        this.isLoading = false;
      }
    );
  }

  logout() {
    this.authService.logout(); // Clear token dan user data
    this.router.navigate(['/back-end/login']); // Redirect ke halaman login
  }
}
