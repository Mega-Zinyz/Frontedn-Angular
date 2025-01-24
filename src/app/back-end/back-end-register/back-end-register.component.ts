import { Component, AfterViewInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
declare var bootstrap: any; // Declare Bootstrap globally

@Component({
  selector: 'app-back-end-register',
  templateUrl: './back-end-register.component.html',
  styleUrls: ['./back-end-register.component.css']
})
export class BackEndRegisterComponent implements AfterViewInit {
  username: string = '';
  password: string = '';
  profil_url: File | null = null;
  imagePreview: string | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  modalInstance: any; // Store Bootstrap modal instance

  constructor(private userService: UserService, private router: Router) {}

  ngAfterViewInit() {
    const modalElement = document.getElementById('successModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement); // Initialize the Bootstrap modal
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.profil_url = input.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string; // Set image preview
      };
      reader.readAsDataURL(this.profil_url);
    }
  }

  registerUser(): void {
    this.userService.registerUser(this.username, this.password, this.profil_url!).subscribe({
      next: (response) => {
        this.successMessage = response.message;
        this.errorMessage = null;

        // Show the success modal
        if (this.modalInstance) {
          this.modalInstance.show(); // Show modal after successful registration
        }
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Registration failed. Please try again.';
        this.successMessage = null;
      }
    });
  }

  closeModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide(); // Hide the modal using Bootstrap's JS
    }
  }

  goToProfile(): void {
    this.closeModal();
    this.router.navigate(['/back-end/profil']); // Navigate to the profile page
  }
}
