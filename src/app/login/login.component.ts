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

  @ViewChild('usererror', { read: ElementRef }) usererror!: ElementRef;
  @ViewChild('passworderror', { read: ElementRef }) passworderror!: ElementRef;
  @ViewChild('eye', { read: ElementRef }) eye!: ElementRef;

  fieldTextType: boolean=false;


  login(name:string,password:string) {
    this.usererror.nativeElement.innerHTML=""
    this.passworderror.nativeElement.innerHTML=""
    const data={
      "userName": name,
      "password": password         
    }

    this.apiService.login(data).subscribe(data => {
      console.log(data)
      if(data.message=="Success"){
        this.router.navigate(['/home']);
      }
      else if(data.message == "No User Found"){
        this.usererror.nativeElement.innerHTML=data.message
      }
      else{
        this.passworderror.nativeElement.innerHTML=data.message

      }
    });
  }

  showpassword(){
    this.fieldTextType = !this.fieldTextType;
    if(this.fieldTextType==true){
      
    }
  }


}
