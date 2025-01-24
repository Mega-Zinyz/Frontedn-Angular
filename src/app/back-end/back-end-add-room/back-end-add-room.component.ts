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
    image: null as File | null
  };
  loading: boolean = false;
  modalInstance: any; // Store Bootstrap modal instance

  constructor(private roomService: RoomService, public router: Router, private changeDetector: ChangeDetectorRef,) {}

  // Use AfterViewInit to ensure the modal is initialized after view is loaded
  ngAfterViewInit() {
    const modalElement = document.getElementById('successModal');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
  }

  // Handle file selection
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.newRoom.image = input.files[0]; // Store the selected file
    }
  }

  // Create room with form data
  createRoom() {
    if (this.loading) return; // Prevent multiple submissions
  
    // Trim spaces and check for empty values
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
  
    // Call the service to create a new room
    this.roomService.createRoom(formData).subscribe(
      response => {
        this.loading = false; // Reset loading state
        console.log('Room created successfully:', response);

        // Optionally append a cache-busting query to the image URL
        response.imageUrl = response.imageUrl + '?v=' + new Date().getTime();

        // Force Angular to detect changes if needed
        this.changeDetector.detectChanges();

        // Show modal after successful room creation
        if (this.modalInstance) {
          this.modalInstance.show();
        }
      },
      error => {
        console.error('Error creating room:', error);
        this.loading = false; // Reset loading state on error
      }
    );
  }
  

  // Close the modal manually
  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide(); // Hide the modal using Bootstrap's JS
    }
  }

  // Navigate to rooms list
  navigateToRooms() {
    this.closeModal(); // Close modal before navigating
    this.router.navigate(['/back-end/rooms']); // Navigate back to rooms
  }
}
