import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { Room } from '../../models/room.model';
import { environment } from '../../../environments/environment';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-back-end-room-detail',
  templateUrl: './back-end-room-detail.component.html',
  styleUrls: ['./back-end-room-detail.component.css']
})
export class BackEndRoomDetailComponent implements OnInit {
  room!: Room;
  loading: boolean = false;
  modalInstance!: Modal;

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('Room Detail Component Initialized');
    const roomId = this.route.snapshot.paramMap.get('id');
    if (roomId) {
      this.loading = true;
      this.fetchRoomDetails(roomId);
    }
  
    // Inisialisasi modal instance
    const modalElement = document.getElementById('deleteConfirmationModal');
    if (modalElement) {
      this.modalInstance = new Modal(modalElement);
    }
  }
  

  fetchRoomDetails(id: string): void {
    this.loading = true; // Start loading state
    this.roomService.getRoomById(id).subscribe(
      (data: Room) => {
        this.room = data; // Assign fetched room details
        console.log('Fetched room details:', this.room); // Log the fetched room data
  
        // Append timestamp for cache busting if imageUrl exists
        if (this.room.imageUrl) {
          console.log('Original imageUrl:', this.room.imageUrl); // Log original image URL
  
          // Prepend base URL if the image URL is relative
          if (!this.room.imageUrl.startsWith('http')) {
            this.room.imageUrl = `${environment.apiUrl}${this.room.imageUrl}`; // Prepend base URL if necessary
          }
  
          // Generate timestamp to bust cache
          const timestamp = new Date().getTime();
          this.room.imageUrl += `?v=${timestamp}`; // Append timestamp
          console.log('Updated imageUrl:', this.room.imageUrl); // Log updated URL with timestamp
        }
  
        this.loading = false; // Set loading state to false
      },
      error => {
        console.error('Error fetching room details:', error);
        this.loading = false; // Set loading state to false if error occurs
      }
    );
  }  
  
  showDeleteConfirmation(): void {
    const modalElement = document.getElementById('deleteConfirmationModal');
    if (modalElement) {
      const modal = new (window as any).bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  deleteRoom(): void {
    if (this.room?.id) {
      this.roomService.deleteRoom(this.room.id).subscribe(() => {
        if (this.modalInstance) {
          // Pastikan navigasi hanya terjadi setelah modal benar-benar tertutup
          const modalElement = document.getElementById('deleteConfirmationModal');
          if (modalElement) {
            modalElement.addEventListener(
              'hidden.bs.modal',
              () => {
                this.router.navigate(['/back-end/rooms']);
              },
              { once: true } // Event listener hanya dipanggil sekali
            );
          }
          
          this.modalInstance.hide(); // Tutup modal
        }
      }, error => {
        console.error('Error deleting room:', error);
        alert('Error deleting the room. Please try again.');
      });
    }
  }  
}
