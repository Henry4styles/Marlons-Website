import { Component, OnInit,   } from '@angular/core';
import { ReactiveFormsModule, FormBuilder,FormsModule, FormGroup, Validators, NgForm } from '@angular/forms';
import { PilotService } from './pilot.service';
import { CorsOptions } from 'cors';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
 

   
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit , FormsModule{
  navbarOpen: boolean = false;

  toggleNavbar() {
  console.log("toggleNavbar")
   
     
    if (this.navbarOpen === false) {
      document.getElementById('navbarNav').classList.remove('collapse');
      this.navbarOpen = !this.navbarOpen;
    } else {
      document.getElementById('navbarNav').classList.add('collapse');
      this.navbarOpen = !this.navbarOpen;
    }
  }
  
  myForm: FormGroup;
 
  constructor(private formBuilder: FormBuilder){}
  
   
     
  

  onFormSubmit(form: NgForm) {
    console.log(form);
  }
  ngOnInit() {
    
    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }



}