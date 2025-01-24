import { Component, OnInit } from '@angular/core';
import { Swiper } from 'swiper'; 
import { Autoplay, Pagination } from 'swiper/modules'; // Ensure correct import path
import 'swiper/swiper-bundle.css'; // Import Swiper styles

Swiper.use([Pagination, Autoplay]);

@Component({
  selector: 'app-front-end-testimonials',
  templateUrl: './front-end-testimonials.component.html',
  styleUrl: './front-end-testimonials.component.css'
})
export class FrontEndTestimonialsComponent implements OnInit {

  ngOnInit(): void {
    const swiper = new Swiper('.init-swiper', {
      loop: true,
      speed: 600,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false // Ensures autoplay continues after interaction
      },
      slidesPerView: 1, // Show one testimonial at a time
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      navigation: true, // If you want navigation buttons (optional)
    });
  }
}