import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { Autoplay } from 'swiper/modules';
import { Pagination } from 'swiper/modules';


@Component({
  selector: 'app-front-end-client',
  templateUrl: './front-end-client.component.html',
  styleUrls: ['./front-end-client.component.css']
})
export class FrontEndClientComponent implements OnInit {

  ngOnInit(): void {
    // Register the Autoplay and Pagination modules with Swiper
    Swiper.use([Autoplay, Pagination]);

    // Initialize Swiper
    const clientSwiper = new Swiper('.clients-swiper', {
      loop: true,
      speed: 600,
      autoplay: {
        delay: 5000,
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.clients-pagination',
        type: 'bullets',
        clickable: true,
      },
      breakpoints: {
        320: { slidesPerView: 2, spaceBetween: 40 },
        480: { slidesPerView: 3, spaceBetween: 60 },
        640: { slidesPerView: 4, spaceBetween: 80 },
        992: { slidesPerView: 6, spaceBetween: 120 },
      },
    });
  }
}
