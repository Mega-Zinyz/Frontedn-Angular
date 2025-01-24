import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Correct import for animations
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MarkdownModule } from 'ngx-markdown';
import { FrontEndDashboardComponent } from './front-end/front-end-dashboard/front-end-dashboard.component';
import { FrontEndHeaderComponent } from './front-end/front-end-header/front-end-header.component';
import { FrontEndFooterComponent } from './front-end/front-end-footer/front-end-footer.component';
import { FrontEndHeroComponent } from './front-end/front-end-hero/front-end-hero.component';
import { FrontEndServiceComponent } from './front-end/front-end-service/front-end-service.component';
import { FrontEndAboutComponent } from './front-end/front-end-about/front-end-about.component';
import { FrontEndSkillComponent } from './front-end/front-end-skill/front-end-skill.component';
import { FrontEndStatComponent } from './front-end/front-end-stat/front-end-stat.component';
import { FrontEndClientComponent } from './front-end/front-end-client/front-end-client.component';
import { FrontEndPortfolioComponent } from './front-end/front-end-portfolio/front-end-portfolio.component';
import { FrontEndTestimonialsComponent } from './front-end/front-end-testimonials/front-end-testimonials.component';
import { FrontEndTeamComponent } from './front-end/front-end-team/front-end-team.component';
import { FrontEndPricingComponent } from './front-end/front-end-pricing/front-end-pricing.component';
import { FrontEndFaqComponent } from './front-end/front-end-faq/front-end-faq.component';
import { FrontEndContactComponent } from './front-end/front-end-contact/front-end-contact.component';
import { FrontEndFeaturedServicesComponent } from './front-end/front-end-featured-services/front-end-featured-services.component';
import { BackEndLoginComponent } from './back-end/back-end-login/back-end-login.component';
import { FrontEndPortfolioDetailComponent } from './front-end/front-end-portfolio-detail/front-end-portfolio-detail.component';
import { BackEndDashboardComponent } from './back-end/back-end-dashboard/back-end-dashboard.component';
import { BackEndNavbarComponent } from './back-end/back-end-navbar/back-end-navbar.component';
import { BackEndHeaderComponent } from './back-end/back-end-header/back-end-header.component';
import { BackEndFooterComponent } from './back-end/back-end-footer/back-end-footer.component';
import { BackEndProfilComponent } from './back-end/back-end-profil/back-end-profil.component';
import { BackEndRoomsComponent } from './back-end/back-end-rooms/back-end-rooms.component';
import { BackEndRoomDetailComponent } from './back-end/back-end-room-detail/back-end-room-detail.component';
import { BackEndAddRoomComponent } from './back-end/back-end-add-room/back-end-add-room.component';
import { BackEndEditRoomComponent } from './back-end/back-end-editroom/back-end-editroom.component';
import { ChatbotComponent } from './front-end/chatbot/chatbot.component';
import { RasaService } from './services/rasa.service';
import { BackEndEditUserComponent } from './back-end/back-end-edit-user/back-end-edit-user.component';
import { BackEndRegisterComponent } from './back-end/back-end-register/back-end-register.component';
import { BackEndRasaControlComponent } from './back-end/back-end-rasa-control/back-end-rasa-control.component';
import { BackEndIntentsComponent } from './back-end/back-end-intents/back-end-intents.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    FrontEndDashboardComponent,
    FrontEndHeaderComponent,
    FrontEndFooterComponent,
    FrontEndHeroComponent,
    FrontEndServiceComponent,
    FrontEndAboutComponent,
    FrontEndSkillComponent,
    FrontEndStatComponent,
    FrontEndClientComponent,
    FrontEndPortfolioComponent,
    FrontEndTestimonialsComponent,
    FrontEndTeamComponent,
    FrontEndPricingComponent,
    FrontEndFaqComponent,
    FrontEndContactComponent,
    FrontEndFeaturedServicesComponent,
    FrontEndPortfolioDetailComponent,
    BackEndLoginComponent,
    BackEndDashboardComponent,
    BackEndNavbarComponent,
    BackEndHeaderComponent,
    BackEndFooterComponent,
    BackEndProfilComponent,
    BackEndRoomsComponent,
    BackEndRoomDetailComponent,
    BackEndAddRoomComponent,
    BackEndEditRoomComponent,
    ChatbotComponent,
    BackEndEditUserComponent,
    BackEndRegisterComponent,
    BackEndRasaControlComponent,
    BackEndIntentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MarkdownModule.forRoot(),
  ],
  providers: [
    RasaService,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
