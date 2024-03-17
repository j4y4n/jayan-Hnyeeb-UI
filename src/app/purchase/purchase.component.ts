import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrl: './purchase.component.css'
})
export class PurchaseComponent {

  constructor(private apiService: ApiService ) {}


  p_namevalue:string=""
  p_sub_namevalue:string=""
  typesvalue:string=""
  ppkgvalue:string=""
  totalkgvalue:string=""
  // notesvalue:string=""
  // mrpvalue:string=""
  pricevalue:string=""

  @ViewChild('tbody', { read: ElementRef }) tbody!: ElementRef;
  @ViewChild('vnamecombobox', { read: ElementRef }) vnamecombobox!: ElementRef;

  vendorlist: string[] = []; 

  ngOnInit() {
    this.apiService.getvendorlist().subscribe(data => {
      this.vendorlist = data;       
    })
  }



  addentry(){
    const newtr = document.createElement('tr');    
    const newtd_p_namevalue = document.createElement('td');    
    const newtd_p_sub_namevalue = document.createElement('td'); 
    const newtypesvalue = document.createElement('td'); 
    const newppkgvalue = document.createElement('td'); 
    const newtotalkgvalue = document.createElement('td'); 
    const newpricevalue = document.createElement('td'); 
    const deleteicon = document.createElement('td');    
   


    newtd_p_namevalue.textContent=this.p_namevalue;
    newtd_p_sub_namevalue.textContent=this.p_sub_namevalue;
    newtypesvalue.textContent=this.typesvalue;
    newppkgvalue.textContent=this.ppkgvalue;
    newtotalkgvalue.textContent=this.totalkgvalue;
    newpricevalue.textContent=this.pricevalue;

    deleteicon.innerHTML='<i class="fas fa-trash-alt" style="color: #e01b24;"></i>';
    deleteicon.addEventListener('click', () => this.DeleteClick(newtr)); 


    newtr.appendChild(newtd_p_namevalue);
    newtr.appendChild(newtd_p_sub_namevalue);
    newtr.appendChild(newtypesvalue);
    newtr.appendChild(newppkgvalue);
    newtr.appendChild(newtotalkgvalue);
    newtr.appendChild(newpricevalue);
    newtr.appendChild(deleteicon);

    this.tbody.nativeElement.appendChild(newtr);   
    
    
    this.p_namevalue=""
    this.p_sub_namevalue=""
    this.typesvalue=""
    this.ppkgvalue=""
    this.totalkgvalue=""
    this.pricevalue=""




  }

  savepurchase(){
    var datalist=[]; 
    var rowLength = this.tbody.nativeElement.rows.length;
    var rowsdata = this.tbody.nativeElement.rows;

    if(rowLength>0){
      for (var i=0, iLen=rowLength; i<iLen; i++) {
        var datachildlist: any[] =[];
        const row = rowsdata[i];
        for (var j=0, jLen=row.childNodes.length; j<jLen; j++) {
          datachildlist.push(row.childNodes[j].innerHTML);
        }
        datachildlist.pop();
        datachildlist.push(Date.now())
        datachildlist.push("Justin")
        datachildlist.push(this.vnamecombobox.nativeElement.value)        


        datalist.push(this.arr_to_json(datachildlist));
        console.log(datalist)
      
      }
      this.apiService.addPurchase(datalist).subscribe((data: any) => {       
      })      
      this.tbody.nativeElement.innerHTML="";    
      alert("Saved to DB")
    }
    else{
      alert("No Records")
    }    
     

  }


  arr_to_json(arr:any[]){
    const datajson = {
      "billId": "12345",
      "productName":"",
      "productSubName":"",
      "types": "",
      "ppKg":"",
      "totalKg":"",
      "totalPrice":"",
      vendor:"",
      "createdAt":"",
      "createdBy":"",
      "mrp":"200",
      "notes": "",     
    };    
    datajson.productName = arr[0];
    datajson.productSubName = arr[1];
    datajson.types = arr[2];
    datajson.ppKg = arr[3];
    datajson.totalKg = arr[4];
    datajson.totalPrice = arr[5];
    datajson.vendor=arr[8]
    datajson.createdAt = arr[6];
    datajson.createdBy = arr[7];
    
    return datajson;
  }
  DeleteClick(tr: HTMLElement) {    
    console.log('Clicked on span:', tr.textContent);   
    tr.remove();    
  }


}
