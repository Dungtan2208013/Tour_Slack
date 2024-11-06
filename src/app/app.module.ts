import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPayPalModule } from 'ngx-paypal';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { AllToursComponent } from './components/all-tours/all-tours.component';
import { ByCategoryComponent } from './components/by-category/by-category.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { ToursDetailComponent } from './components/tours-detail/tours-detail.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RateComponent } from './components/rate/rate.component';
import { SearchComponent } from './components/search/search.component';
import { SignFormComponent } from './components/sign-form/sign-form.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { FavoriteComponent } from './components/favorite/favorite.component';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { AuthGuard } from './guard/auth.guard';
// import { Location } from './components/location/location.component' ;

const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'all-tours', component: AllToursComponent },
  { path: 'by-category/:id', component: ByCategoryComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'contact', component: ContactComponent },
  { path : 'tours-detail/:id', component :ToursDetailComponent},
  { path: 'search/:keyword', component: SearchComponent },
  { path: 'search', component: AllToursComponent },
  { path: 'favorites', component: FavoriteComponent, canActivate: [AuthGuard] },
  { path: 'sign-form', component: SignFormComponent },
  { path: 'about', component: AboutComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomepageComponent,
    AllToursComponent, 
    ByCategoryComponent,
    CartComponent,
    CheckoutComponent,
    NotFoundComponent,
    BookDetailsComponent,
    ToursDetailComponent,
    ProfileComponent,
    RateComponent,
    SearchComponent,
    SignFormComponent,
    ForgotPasswordComponent,
    FavoriteComponent,
    ContactComponent,
    AboutComponent,
    // LocationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SlickCarouselModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    OrderModule,
    NgxPayPalModule,
    RouterModule.forRoot(routes),
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      progressAnimation: 'increasing',
      closeButton: true,
    }),
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
