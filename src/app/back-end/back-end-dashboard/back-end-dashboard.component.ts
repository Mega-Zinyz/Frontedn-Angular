import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service'; // Impor service
import { DashboardData } from '../../models/dashboard.mode'; // Impor model

@Component({
  selector: 'app-back-end-dashboard',
  templateUrl: './back-end-dashboard.component.html',
  styleUrls: ['./back-end-dashboard.component.css']
})
export class BackEndDashboardComponent implements OnInit {
  totalIntents: number = 0;
  availableRooms: number = 0;
  userRegistrations: number = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    // Panggil service untuk mendapatkan data dashboard
    this.dashboardService.getTotalIntents().subscribe((data) => {
      this.totalIntents = data.totalIntents;
    });

    this.dashboardService.getAvailableRooms().subscribe((data) => {
      this.availableRooms = data.availableRooms;
    });

    this.dashboardService.getUserRegistrations().subscribe((data) => {
      this.userRegistrations = data.userRegistrations;
    });
  }
}
