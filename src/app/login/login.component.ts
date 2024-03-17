import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private apiService: ApiService, private router: Router ) {}

  login(name:string,password:string) {
    const data={
      "userName": name,
      "password": password         
    }

    this.apiService.login(data).subscribe(data => {
      console.log(data)
      if(data.message=="Success"){
        this.router.navigate(['/home']);
      }
    });
  }

}
