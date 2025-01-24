import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { FrontEndDashboardComponent } from './front-end/front-end-dashboard/front-end-dashboard.component';
import { FrontEndHeaderComponent } from './front-end/front-end-header/front-end-header.component';
import { FrontEndFooterComponent } from './front-end/front-end-footer/front-end-footer.component';
import { FrontEndHeroComponent } from './front-end/front-end-hero/front-end-hero.component';
import { FrontEndFeaturedServicesComponent } from './front-end/front-end-featured-services/front-end-featured-services.component';
import { FrontEndAboutComponent } from './front-end/front-end-about/front-end-about.component';
import { FrontEndSkillComponent } from './front-end/front-end-skill/front-end-skill.component';
import { FrontEndStatComponent } from './front-end/front-end-stat/front-end-stat.component';
import { FrontEndClientComponent } from './front-end/front-end-client/front-end-client.component';
import { FrontEndServiceComponent } from './front-end/front-end-service/front-end-service.component';
import { FrontEndTestimonialsComponent } from './front-end/front-end-testimonials/front-end-testimonials.component';
import { FrontEndPortfolioComponent } from './front-end/front-end-portfolio/front-end-portfolio.component';
import { FrontEndPortfolioDetailComponent } from './front-end/front-end-portfolio-detail/front-end-portfolio-detail.component';
import { FrontEndTeamComponent } from './front-end/front-end-team/front-end-team.component';
import { FrontEndPricingComponent } from './front-end/front-end-pricing/front-end-pricing.component';
import { FrontEndFaqComponent } from './front-end/front-end-faq/front-end-faq.component';
import { FrontEndContactComponent } from './front-end/front-end-contact/front-end-contact.component';
import { BackEndLoginComponent } from './back-end/back-end-login/back-end-login.component';
import { BackEndDashboardComponent } from './back-end/back-end-dashboard/back-end-dashboard.component';
import { BackEndHeaderComponent } from './back-end/back-end-header/back-end-header.component';
import { BackEndNavbarComponent } from './back-end/back-end-navbar/back-end-navbar.component';
import { BackEndRoomsComponent } from './back-end/back-end-rooms/back-end-rooms.component';
import { BackEndProfilComponent } from './back-end/back-end-profil/back-end-profil.component';
import { BackEndRoomDetailComponent } from './back-end/back-end-room-detail/back-end-room-detail.component';
import { BackEndAddRoomComponent } from './back-end/back-end-add-room/back-end-add-room.component';
import { BackEndEditRoomComponent } from './back-end/back-end-editroom/back-end-editroom.component';
import { BackEndEditUserComponent } from './back-end/back-end-edit-user/back-end-edit-user.component';
import { BackEndRegisterComponent } from './back-end/back-end-register/back-end-register.component';
import { BackEndRasaControlComponent } from './back-end/back-end-rasa-control/back-end-rasa-control.component';
import { BackEndIntentsComponent } from './back-end/back-end-intents/back-end-intents.component';

const routes: Routes = [
  {
    path: 'front-end', children: [
      { path: 'dashboard', component: FrontEndDashboardComponent },
      { path: 'header', component: FrontEndHeaderComponent },
      { path: 'hero', component: FrontEndHeroComponent },
      { path: 'featured-services', component: FrontEndFeaturedServicesComponent },
      { path: 'about', component: FrontEndAboutComponent },
      { path: 'skill', component: FrontEndSkillComponent },
      { path: 'stat', component: FrontEndStatComponent },
      { path: 'client', component: FrontEndClientComponent },
      { path: 'service', component: FrontEndServiceComponent },
      { path: 'testimonials', component: FrontEndTestimonialsComponent },
      { path: 'portfolio', component: FrontEndPortfolioComponent },
      { path: 'portfolio-detail', component: FrontEndPortfolioDetailComponent },
      { path: 'team', component: FrontEndTeamComponent },
      { path: 'pricing', component: FrontEndPricingComponent },
      { path: 'faq', component: FrontEndFaqComponent },
      { path: 'contact', component: FrontEndContactComponent },
      { path: 'footer', component: FrontEndFooterComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'back-end', children: [
      { path: 'login', component: BackEndLoginComponent },
      { path: 'dashboard', component: BackEndDashboardComponent, canActivate: [AuthGuard] },
      { path: 'header', component: BackEndHeaderComponent, canActivate: [AuthGuard] },
      { path: 'navbar', component: BackEndNavbarComponent, canActivate: [AuthGuard] },
      { path: 'rooms', component: BackEndRoomsComponent, canActivate: [AuthGuard] },
      { path: 'add-room', component: BackEndAddRoomComponent, canActivate: [AuthGuard] },
      { path: 'edit-room/:id', component: BackEndEditRoomComponent, canActivate: [AuthGuard] },
      { path: 'room-detail/:id', component: BackEndRoomDetailComponent, canActivate: [AuthGuard] },
      { path: 'profil', component: BackEndProfilComponent, canActivate: [AuthGuard] },
      { path: 'edit-user/:no_user', component: BackEndEditUserComponent, canActivate: [AuthGuard] },
      { path: 'register', component: BackEndRegisterComponent, canActivate: [AuthGuard] },
      { path: 'rasa-control', component: BackEndRasaControlComponent, canActivate: [AuthGuard] },
      { path: 'intents', component: BackEndIntentsComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  { path: '', redirectTo: 'front-end/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'front-end/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
