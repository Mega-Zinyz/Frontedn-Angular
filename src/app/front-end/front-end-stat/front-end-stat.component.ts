import { Component, OnInit } from '@angular/core';

// Deklarasi AOS dan PureCounter sebagai variabel global
declare var AOS: any;
declare var PureCounter: any;

@Component({
  selector: 'app-front-end-stat',
  templateUrl: './front-end-stat.component.html',
  styleUrls: ['./front-end-stat.component.css']
})
export class FrontEndStatComponent implements OnInit {
  ngOnInit(): void {
    // Inisialisasi AOS
    AOS.init();

    // Inisialisasi PureCounter
    const purecounter = new PureCounter();
  }
}
