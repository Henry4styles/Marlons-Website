import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FormControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-registrieren',
  templateUrl: './registrieren.component.html',
  styleUrl: './registrieren.component.css'
})
export class RegistrierenComponent {
 
 
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      // termsAccepted: [false, Validators.requiredTrue]
    });
  }
 termsAccepted: boolean = false;
    

  checkRequiredStuff(checked: boolean): boolean {
    const agreeCheckbox = document.getElementById('agreeCheckbox') as HTMLInputElement;
    if (agreeCheckbox.checked === false) {
      console.log('false');
      return false;
    } else {
      console.log('true');
      return true;
    }
  }

   
  myForm: FormGroup;
  
  formData = {
    name: '',
    email: '',
    WettbewerbScale: false,
    Wettbewerbspeed: false,
    WettbewerbthreeD: false
  };
  showAdditionalCheckboxesFlag: boolean = true;
  participateInCompetition: boolean;


  showAdditionalCheckboxes() {
    this.showAdditionalCheckboxesFlag = !this.showAdditionalCheckboxesFlag;

    
    const additionalCheckboxes = document.getElementById('additionalCheckboxes');

    if (!this.showAdditionalCheckboxesFlag) {
      additionalCheckboxes.style.display = 'block';
    

    } else {
      additionalCheckboxes.style.display = 'none';
 
    }
  }

  deleteImage() {
    const pb = document.getElementById("registrationProfilePicture");
    pb.setAttribute("src", "assets/default.png");
    if (document.getElementById('registerPilotImageName')) {
      document.getElementById('registerPilotImageName').remove();
    }
  }

  openFileDialog() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg, image/png';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files[0];
      console.log(file);
      console.log(file.name);
      if (document.getElementById('registerPilotImageName')) {
        document.getElementById('registerPilotImageName').remove();
      }
      const fileNameText = document.createElement("p");
      fileNameText.style.whiteSpace = "nowrap";
      fileNameText.style.overflow = "hidden";
      fileNameText.style.textOverflow = "ellipsis";
      fileNameText.innerHTML = file.name;
      fileNameText.id = 'registerPilotImageName';
      document.getElementById('registerPilot').appendChild(fileNameText);

      const pb = document.getElementById("registrationProfilePicture");
      pb.setAttribute("src", URL.createObjectURL(file));

    };
    input.click();
  } 
  onSubmit(formData) {};

  Submit(formData) {
    console.log('testing');

    formData.name = (document.getElementById('name') as HTMLInputElement).value;
    formData.email = (document.getElementById('email') as HTMLInputElement)?.value;

   
    const wettbewerbScaleBox = document.getElementById('scaleCheckbox') as HTMLInputElement;
    const wettbewerbspeedBox = document.getElementById('speedCheckbox') as HTMLInputElement;
    const wettbewerbthreeDBox = document.getElementById('3dCheckbox') as HTMLInputElement;

    if (wettbewerbScaleBox && wettbewerbScaleBox.checked) {
      formData.WettbewerbScale = true;
    } else {
      formData.WettbewerbScale = false;
    }
    if (wettbewerbspeedBox && wettbewerbspeedBox.checked) {
      formData.Wettbewerbspeed = true;
    } else {
      formData.Wettbewerbspeed = false;
    }
    if (wettbewerbthreeDBox && wettbewerbthreeDBox.checked) {
      formData.WettbewerbthreeD = true;
    } else {
      formData.WettbewerbthreeD = false;
    }
 


    console.log(formData);
  try {
    



    this.http.post('https://localhost:5001/addPilot', {
      PilotName: formData.name,
      PilotEmail: formData.email,
      PilotPicExt: '',
      PilotPic: '',
      WettbewerbthreeD: formData.WettbewerbthreeD.toString(),
      WettbewerbScale: formData.WettbewerbScale.toString(),
      WettbewerbSpeed: formData.Wettbewerbspeed.toString()
    }).subscribe(
      (result: any) => { console.log('Post request successful', result) },
      (error) => { console.log('Post request error', error) }
    );
    console.log('Post request successful, Pilot:', formData);
    location.reload();
  } catch (error) {
    console.log('Post request error', error);
  }
    // console.log(formData);
    //  try {
      
    //   this.http.post('https://localhost:5001/addPilot', {
    //     name: formData.name,
    //     email: formData.email,
    //     WettbewerbScale: formData.WettbewerbScale,
    //     Wettbewerbspeed: formData.Wettbewerbspeed,
    //     WettbewerbthreeD: formData.WettbewerbthreeD
    //   }).subscribe(
    //     (result: any) => { console.log('Post request successful', result) },
    //     (error) => { console.log('Post request error', error) }
    //   );
    //   console.log('Post request successful, Pilot:', formData);
    // } catch (error) {
    //   console.log('Post request error', error);
    // }
  }
  
 
}
// Path: src/app/registrieren/registrieren.component.html

