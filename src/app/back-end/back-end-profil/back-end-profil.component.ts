import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-back-end-profil',
  templateUrl: './back-end-profil.component.html',
  styleUrls: ['./back-end-profil.component.css']
})
export class BackEndProfilComponent implements OnInit {
  users: User[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getUsers().subscribe(
        (data: User[]) => {
            this.users = data.map(user => {
                console.log('User:', user); // Log user object, including no_user
                return user;
            });
            this.isLoading = false;
        },
        (error) => {
            this.errorMessage = 'Failed to load users.';
            this.isLoading = false;
        }
    );
  }
  getProfileImage(profilUrl: string | null): string {
    return profilUrl ? `http://localhost:3000/profil_img/${profilUrl}` : 'assets/images/default-user.jpg';
  }  
  
  editUser(no_user: string) {
    this.router.navigate(['/back-end/edit-user', no_user]);
  } 

  deleteUser(user: User) {
    const confirmDelete = confirm(`Are you sure you want to delete user ${user.username}?`);
    if (confirmDelete) {
        this.userService.deleteUser(user.no_user).subscribe({
            next: () => {
                this.loadUsers();
            },
            error: (err) => {
                this.errorMessage = `Failed to delete user: ${err.error?.message || 'Unknown error'}`;
            }
        });
    }
  }

  createUser() {
    this.router.navigate(['/back-end/register']);
  }
}
