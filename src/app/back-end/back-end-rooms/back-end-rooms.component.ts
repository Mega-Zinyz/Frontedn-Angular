import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from '../../services/room.service';
import { Room } from '../../models/room.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-back-end-rooms',
  templateUrl: './back-end-rooms.component.html',
  styleUrls: ['./back-end-rooms.component.css']
})
export class BackEndRoomsComponent implements OnInit {
  rooms: Room[] = [];
  loading: boolean = false;

  constructor(private roomService: RoomService, private router: Router) {}

  ngOnInit(): void {
    this.fetchRooms();
  }

  fetchRooms(): void {
    this.loading = true;
    this.roomService.getRooms().subscribe(
        (data: Room[]) => {
            const timestamp = new Date().getTime(); // Generate a unique timestamp for cache busting
            this.rooms = data.map(room => {
                console.log('Original imageUrl:', room.imageUrl); // Log original URL
                if (room.imageUrl) {
                    // Only append the timestamp if the URL is not complete
                    if (!room.imageUrl.startsWith('http')) {
                        room.imageUrl = `${environment.apiUrl}/${room.imageUrl}`; // Prepend base URL if necessary
                    }
                    room.imageUrl += `?v=${timestamp}`; // Append timestamp
                }
                console.log('Updated imageUrl:', room.imageUrl); // Log updated URL
                return room;
            });
            this.loading = false;
        },
        error => {
            console.error('Error fetching rooms:', error);
            this.loading = false;
        }
    );
  }
}
