import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { Routes , RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';

const routes: Routes = [
                         //  {path:'',component: AppComponent},
                          {path:'',redirectTo: '/home', pathMatch: 'full' },
                          {path:'home',component:ContentComponent},
                          {path:'**',redirectTo: '/home'}
                        ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProfileComponent,
    FooterComponent,
    ContentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ScrollToModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
