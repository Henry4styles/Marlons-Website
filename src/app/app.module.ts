import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PilotComponent } from './pilot/pilot.component';
import { MemberComponent } from './member/member.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { RegistrierenComponent } from './registrieren/registrieren.component';
import { CookieComponent } from './cookie/cookie.component';
@NgModule({
  declarations: [
    AppComponent,
    MemberComponent,
    PilotComponent,
    RegistrierenComponent,
    CookieComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})  
export class AppModule { }
