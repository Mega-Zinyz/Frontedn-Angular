import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { Room } from '../../models/room.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-back-end-edit-room',
  templateUrl: './back-end-editroom.component.html',
  styleUrls: ['./back-end-editroom.component.css']
})
export class BackEndEditRoomComponent implements OnInit {
  room: Room | null = null;
  updatedRoom: Room = { id: 0, name: '', description: '', imageUrl: '', available: true, created_at: new Date(), updated_at: new Date() };  // Initialize updatedRoom
  isLoading = true;
  errorMessage: string | null = null;
  selectedFile: File | null = null;
  previewUrl: string | null = null;

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const roomId = this.route.snapshot.paramMap.get('id');
    console.log('roomId from route:', roomId);  // Log the retrieved roomId
    this.loadRoom(roomId);
  }

  loadRoom(roomId: string | null) {
    if (roomId) {
      this.roomService.getRoomById(roomId).subscribe(
        (data: Room) => {
          this.room = data;
  
          // Convert available (tinyint 1 or 0) to boolean explicitly
          this.updatedRoom.available = !!this.room.available;  // Convert to boolean
  
          // Handle image URL if exists
          if (this.room.imageUrl) {
            const timestamp = new Date().getTime();  // For cache busting
            this.room.imageUrl = `${environment.apiUrl}room_img/${this.room.imageUrl}?v=${timestamp}`;
            this.previewUrl = this.room.imageUrl;  // Set image preview URL
          }
  
          // Set name and description for the form
          this.updatedRoom.name = this.room.name;
          this.updatedRoom.description = this.room.description;
  
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = 'Failed to load room details. Please try again.';
        }
      );
    } else {
      this.isLoading = false;
      this.errorMessage = 'Room ID is null.';
    }
  }  
  
  onImageLoad() {
    console.log('Image loaded successfully.');
  }

  onImageError() {
    console.error('Error loading image. Using default image.');
    this.previewUrl = 'assets/default-room.png'; // Fallback to default image
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

  updateRoom() {
    if (this.room) {
      const formData = new FormData();
  
      // Append only the updated fields to formData
      formData.append('name', this.updatedRoom.name);
      formData.append('description', this.updatedRoom.description);
  
      // Konversi nilai available ke 1 (untuk true) atau 0 (untuk false)
      formData.append('available', this.updatedRoom.available ? '1' : '0'); 
  
      // Append the new image only if selected
      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }
  
      // Call the roomService updateRoom method with all necessary arguments
      this.roomService.updateRoom(this.room.id, formData).subscribe(
        (response) => {
          console.log('Room updated successfully:', response);
          ($('#successModal') as any).modal('show'); // Show success modal
        },
        (error) => {
          console.error('Failed to update room:', error);
          this.errorMessage = 'Failed to update room. Please try again later.';
        }
      );
    }
  }  

  closeModal() {
    ($('#successModal') as any).modal('hide');  // Hide the modal using jQuery
  }

  navigateToRoomDetail() {
    if (this.room) {
      this.closeModal();  // Hide the modal
      this.router.navigate([`/back-end/rooms`]);  // Navigate to the room details page
    }
  }
}
