import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendordetail',
  templateUrl: './vendordetail.component.html',
  styleUrl: './vendordetail.component.css'
})
export class VendordetailComponent {
  vendorlist: string[] = []; 

  constructor(private apiService: ApiService, private router: Router ) {}

  @ViewChild('vdetails', { read: ElementRef }) vdetails!: ElementRef;
  @ViewChild('tbody', { read: ElementRef }) tbody!: ElementRef;


  ngOnInit() {
    this.apiService.getvendorlist().subscribe(data => {
      this.vendorlist = data; 
      
    })
  }
  
  getdetailbyname(name:string){
    this.tbody.nativeElement.innerHTML="";
    this.apiService.getvendorbyname(name).subscribe(data => {
    this.vdetails.nativeElement.innerHTML=" "+ 
          "<p>Name - <b>"+data.vendorName+"</b></p>" +
          "<p>Address - "+data.vendorAddress+"</p>" +
          "<p>Phone - "+data.vendorPhoneNo+"</p>" +
          '<p>'+data.status +' -   <i class="fas fa-circle" style="color: #7cfc00;"></i></p>' +
          "<hr>"
           })
  }

  getvendorreport(name:string){
    this.apiService.getvendorreport(name).subscribe(data => {  
      this.vdetails.nativeElement.innerHTML="";   
      if(data.length==0){        
        this.tbody.nativeElement.innerHTML="<p>No Record Found</p>";   
      }
      else{

        this.tbody.nativeElement.innerHTML="";   
        for (let temparr of data) {
          const newtr = document.createElement('tr'); 
          const newproduct_name = document.createElement('td');    
          const newproduct_sub_name = document.createElement('td'); 
          const newtotal_kg = document.createElement('td'); 
          const newtotal_price = document.createElement('td');  
          
          newproduct_name.textContent=temparr.product_name
          newproduct_sub_name.textContent=temparr.product_sub_name
          newtotal_kg.textContent=Math.trunc(parseInt(temparr.total_kg)).toString()
          newtotal_price.textContent=Math.trunc(parseInt(temparr.total_price)).toString()
          
          newtr.appendChild(newproduct_name)
          newtr.appendChild(newproduct_sub_name)
          newtr.appendChild(newtotal_kg)
          newtr.appendChild(newtotal_price)
          
          this.tbody.nativeElement.appendChild(newtr);   
          
          
          console.log(temparr.product_name)
          console.log(temparr.product_sub_name)
          console.log(temparr.total_kg)
          console.log(temparr.total_price)
        }    
      }
    })
  }
}
