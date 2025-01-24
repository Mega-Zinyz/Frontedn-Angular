import { Component, AfterViewInit  } from '@angular/core';

@Component({
  selector: 'app-front-end-faq',
  templateUrl: './front-end-faq.component.html',
  styleUrl: './front-end-faq.component.css'
})
export class FrontEndFaqComponent implements AfterViewInit {

  ngAfterViewInit() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      item.addEventListener('click', function () {
        item.classList.toggle('faq-active');

        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('faq-active');
          }
        });
      });
    });
  }
}