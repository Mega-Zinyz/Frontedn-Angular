import { Component, OnInit, AfterViewInit } from '@angular/core';
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

  // Pindahkan inisialisasi modal ke `ngAfterViewInit()`
  ngAfterViewInit(): void {
    const modalElement = document.getElementById('deleteConfirmationModal');
    if (modalElement) {
      this.modalInstance = new Modal(modalElement);
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
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  deleteRoom(): void {
    if (this.room?.id) {
      this.roomService.deleteRoom(this.room.id).subscribe(() => {
        if (this.modalInstance) {
          this.modalInstance.hide(); // Tutup modal sebelum navigasi

          const modalElement = document.getElementById('deleteConfirmationModal');
          if (modalElement) {
            modalElement.addEventListener(
              'hidden.bs.modal',
              () => {
                this.router.navigate(['/back-end/rooms']);
              },
              { once: true }
            );
          }
        }
      }, error => {
        console.error('Error deleting room:', error);
        alert('Error deleting the room. Please try again.');
      });
    }
  }
}
