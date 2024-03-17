import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-createvendor',
  templateUrl: './createvendor.component.html',
  styleUrl: './createvendor.component.css'
})
export class CreatevendorComponent {
  
  constructor(private apiService: ApiService, private router: Router ) {}
  vname:string =""
  vaddress:string =""
  vphone:string =""

  addvendor(name:string,address:string,phone:string){
     const data={
      "vendorName": name,
      "vendorAddress": address,
      "vendorPhoneNo": phone,
      "status": "Active"
    }
    if(name!="" && address!="" && phone!="" ){

      this.apiService.addvendor(data).subscribe((data: any) => {                    
        alert("SuccessFully Created -"+ name);   
        
      
      })     
    }
    else{
      alert("fill the form")
    }        
    this.vname=""   
    this.vaddress=""
    this.vphone=""

  }

}
