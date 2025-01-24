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
  isLoading: boolean = false; 
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.authService.user$.subscribe(
      (user: User | null) => {
        this.user = user;

        if (this.user?.profil_url) {
          // Cek apakah profil_url sudah lengkap (memulai dengan 'http')
          if (!this.user.profil_url.startsWith('http')) {
            // Hanya tambahkan base URL jika profil_url berupa path relatif
            // Pastikan tidak ada duplikasi 'profil_img/'
            if (this.user.profil_url.startsWith('profil_img/')) {
              this.user.profil_url = `${environment.apiUrl}/${this.user.profil_url}`;
            } else {
              this.user.profil_url = `${environment.apiUrl}/profil_img/${this.user.profil_url}`;
            }
          }
        }

        this.isLoading = false;
        console.log('Current User:', user);
        console.log('Processed Profile URL:', this.user?.profil_url);
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
