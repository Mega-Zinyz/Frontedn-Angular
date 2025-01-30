import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { ChangeDetectorRef } from '@angular/core';
declare var bootstrap: any; // Import Bootstrap JS library

@Component({
  selector: 'app-back-end-add-room',
  templateUrl: './back-end-add-room.component.html',
  styleUrls: ['./back-end-add-room.component.css']
})
export class BackEndAddRoomComponent implements AfterViewInit {
  newRoom = {
    name: '',
    description: '',
    image: null as File | null,
    available: true
  };
  loading: boolean = false;
  modalInstance: any; // Store Bootstrap modal instance
  imagePreview: string | null = null; // For image preview

  constructor(private roomService: RoomService, public router: Router, private changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit() {
    const modalElement = document.getElementById('successModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
  }

  // Handle file selection and preview
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.newRoom.image = input.files[0]; // Store the selected file

      // Create a URL for the image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string; // Set image preview
      };
      reader.readAsDataURL(this.newRoom.image); // Read file for preview
    }
  }

  createRoom() {
    if (this.loading) return; // Prevent multiple submissions

    const roomName = this.newRoom.name.trim();
    const roomDescription = this.newRoom.description.trim();

    if (!roomName || !roomDescription) {
      alert('Room name and description are required!');
      return;
    }

    this.loading = true; // Set loading state to true
    const formData = new FormData();
    formData.append('name', roomName);
    formData.append('description', roomDescription);

    if (this.newRoom.image) {
      formData.append('image', this.newRoom.image);
    }

    formData.append('available', this.newRoom.available ? '1' : '0');

    // Call the service to create a new room
    this.roomService.createRoom(formData).subscribe(
      response => {
        this.loading = false; // Reset loading state
        console.log('Room created successfully:', response);

        response.imageUrl = response.imageUrl + '?v=' + new Date().getTime();
        this.changeDetector.detectChanges();

        if (this.modalInstance) {
          this.modalInstance.show();
        }
      },
      error => {
        this.loading = false;
        if (error.status === 400 && error.error.message === 'A room with this name already exists') {
          alert('A room with this name already exists. Please choose a different name.');
        } else {
          console.error('Error creating room:', error);
          alert('An error occurred while creating the room. Please try again later.');
        }
      }
    );
  }

  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  navigateToRooms() {
    this.closeModal();
    this.router.navigate(['/back-end/rooms']);
  }
}
