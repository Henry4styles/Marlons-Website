import { Component,OnInit  } from '@angular/core';
import { PilotService } from '../pilot.service'
import { Pilot } from '../pilot.interface'
import { HttpClient } from '@angular/common/http';
 

@Component({
  selector: 'app-pilot',
  templateUrl: './pilot.component.html',
  styleUrl: './pilot.component.css'
})
export class PilotComponent {
  pilots: Pilot[] = [];
  
  constructor(private pilotService: PilotService, private http: HttpClient) {
    http.get('https://localhost:5001/getPilots').subscribe(
      (result:any) => {this.pilots = result},
      (data) => {console.log(data)},
      
    );
    console.log('Get request successful, Pilots:', this.pilots);
  }

  ngOnInit(): void {
    this.pilotService.getPilots().subscribe((pilots) => {
      if (pilots) {
        this.pilots = pilots;
        console.log('Get request successful, Pilots:', this.pilots); 
      }
    });
  }
}
 
