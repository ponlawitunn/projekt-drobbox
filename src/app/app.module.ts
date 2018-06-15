import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { RouterModule, Routes, CanActivate } from "@angular/router";
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatIconModule} from '@angular/material';
import { MainComponent } from './main/main.component';
import { FilterPipe } from './filter.pipe';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login.service';

let links: Routes = [
  {path:'', canActivate:[LoginService], component: MainComponent},
  {path:'login', component: LoginComponent},
  {path:'**', canActivate:[LoginService], component: MainComponent}
]
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FilterPipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    FormsModule,
    RouterModule.forRoot(links)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
