import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';

declare var $: any; // Import jQuery

@Component({
  selector: 'app-back-end-edit-user',
  templateUrl: './back-end-edit-user.component.html',
  styleUrls: ['./back-end-edit-user.component.css']
})
export class BackEndEditUserComponent implements OnInit {
  user: User | null = null;
  isLoading = true;
  errorMessage: string | null = null;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  newPassword: string | null = null;  // New variable for the new password input

  constructor(
      private userService: UserService,
      private route: ActivatedRoute,
      private router: Router
  ) {}

  ngOnInit() {
    const no_user = this.route.snapshot.paramMap.get('no_user');
    console.log('no_user from route:', no_user); // Log the retrieved no_user
    this.loadUser(no_user);
  }

  loadUser(no_user: string | null) {
    if (no_user) {
        this.userService.getUserByNoUser(no_user).subscribe(
            (data: User) => {
                this.user = data;
                const timestamp = new Date().getTime(); // For cache busting
                
                if (this.user.profil_url) {
                    // Ensure the profil_url is a complete URL
                    if (!this.user.profil_url.startsWith('http')) {
                        this.user.profil_url = `${environment.apiUrl}/profil_img/${this.user.profil_url}`;
                    }
                    // Append timestamp for cache busting
                    this.user.profil_url += `?v=${timestamp}`;
                }

                this.isLoading = false;
            },
            (error) => {
                this.isLoading = false;
                this.errorMessage = 'Failed to load user details. Please try again.';
            }
        );
    } else {
        this.isLoading = false;
        this.errorMessage = 'User ID is null.';
    }
  }

  onImageLoad() {
    console.log('Image loaded successfully.');
  }

  onImageError() {
    console.error('Error loading image. Using default image.');
    this.previewUrl = 'assets/default-profile.png'; // Fallback to default image
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            this.previewUrl = reader.result as string;  // Update previewUrl
        };
        reader.readAsDataURL(this.selectedFile);  // Read file for preview
    } else {
        this.selectedFile = null;
        this.previewUrl = null;  // Reset preview when no file is selected
    }
  }

  updateUser() {
    console.log('Update user triggered', this.user, this.selectedFile);  // Debugging output

    if (this.user) {
        // Create a new User object to ensure we are updating with the latest values
        const updatedUser: User = {
          no_user: this.user.no_user,  // Include no_user for identification
          username: this.user.username,
          profil_url: '' // Keep this empty as it will be handled by the file upload
        };

        // Call the UserService to update the user
        this.userService.updateUser(updatedUser, this.selectedFile, this.newPassword).subscribe(
            () => {
                console.log('User updated successfully');  // Debugging output
                $('#successModal').modal('show');  // Show success modal using jQuery
            },
            (error) => {
                console.error('Failed to update user:', error);  // Log error
                this.errorMessage = 'Failed to update user. Please try again.';
            }
        );
    } else {
        console.warn('User data is null or undefined.');
    }
  }

  closeModal() {
    $('#successModal').modal('hide');  // Hide the modal using jQuery
  }

  navigateToUserList() {
    this.closeModal();  // Close the modal first
    this.router.navigate(['/back-end/profil']);  // Navigate to user list
  }
}
