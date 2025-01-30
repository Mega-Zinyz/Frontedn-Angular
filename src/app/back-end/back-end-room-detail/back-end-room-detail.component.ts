import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
export class BackEndRoomDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('deleteModal') modalElement!: ElementRef;
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
  }

  ngAfterViewInit(): void {
    // Tunggu sampai modal siap sebelum inisialisasi
    if (this.modalElement) {
      this.modalInstance = new Modal(this.modalElement.nativeElement);
      console.log('Modal initialized successfully.');
    } else {
      console.error('Modal element is not found in ViewChild!');
    }
  }

  fetchRoomDetails(id: string): void {
    this.loading = true;
    this.roomService.getRoomById(id).subscribe(
      (data: Room) => {
        this.room = data;

        if (this.room.imageUrl) {
          if (!this.room.imageUrl.startsWith('http')) {
            this.room.imageUrl = `${environment.apiUrl}${this.room.imageUrl}`;
          }
          this.room.imageUrl += `?v=${new Date().getTime()}`;
        }

        this.loading = false;
      },
      error => {
        console.error('Error fetching room details:', error);
        this.loading = false;
      }
    );
  }

  showDeleteConfirmation(): void {
    console.log('Opening delete confirmation modal...');
    if (this.modalInstance) {
      this.modalInstance.show();
    } else {
      console.error('Modal instance is not initialized!');
    }
  }

  deleteRoom(): void {
    if (this.room?.id) {
      console.log('Deleting room with ID:', this.room.id);

      this.roomService.deleteRoom(this.room.id).subscribe(() => {
        console.log('Room deleted successfully.');

        if (this.modalInstance) {
          this.modalInstance.hide(); // Tutup modal sebelum navigasi

          // Navigasi setelah modal benar-benar tertutup
          const modalEl = this.modalElement.nativeElement;
          modalEl.addEventListener('hidden.bs.modal', () => {
            console.log('Modal hidden, navigating to rooms page...');
            this.router.navigate(['/back-end/rooms']);
          }, { once: true });
        }
      }, error => {
        console.error('Error deleting room:', error);
        alert('Error deleting the room. Please try again.');
      });
    } else {
      console.error('Room ID is undefined!');
    }
  }
}
