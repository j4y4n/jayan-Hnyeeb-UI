import { Component, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent {

  //constructor
  constructor(private apiService: ApiService) { }

  @ViewChild('balanceinfo', { read: ElementRef }) balanceinfo!: ElementRef;
  @ViewChild('tbody', { read: ElementRef }) tbody!: ElementRef;


  productlist: string[] = [];
  subproductlist: string[] = [];

  ppkgvalue: string = ""
  totalkgvalue: string = ""
  pricevalue: string = ""


  ngOnInit() {
    this.apiService.getproductname().subscribe(data => {
      this.productlist = data;
      console.log(data);
    })

  }
  getsubproduct(product: string) {
    this.apiService.getsubproductname(product).subscribe(data => {
      this.subproductlist = data;
      console.log(data);
    })
  }
  gettotalkg(product: string, productsub: string) {
    this.apiService.gettotalkg(product, productsub).subscribe(data => {
      this.balanceinfo.nativeElement.innerHTML = "<h4>" + data + " - KG</h4>"
    })
  }


  addsales(product: string, subproduct: string, ppkg: string, totalkg: string, price: string) {
    const newtr = document.createElement('tr');
    const newtd_p_nameValue = document.createElement('td');
    const newtd_p_sub_nameValue = document.createElement('td');
    const newtd_pppValue = document.createElement('td');
    const newtd_kgValue = document.createElement('td');
    const newtd_price = document.createElement('td');
    const deleteIcon = document.createElement('td');

    newtd_p_nameValue.textContent = product;
    newtd_p_sub_nameValue.textContent = subproduct;
    newtd_pppValue.textContent = ppkg;
    newtd_kgValue.textContent = totalkg;
    newtd_price.textContent = price;
    deleteIcon.innerHTML = '<i class="fas fa-trash-alt" style="color: #e01b24;"></i>';
    deleteIcon.addEventListener('click', () => this.DeleteClick(newtr));


    newtr.appendChild(newtd_p_nameValue);
    newtr.appendChild(newtd_p_sub_nameValue);
    newtr.appendChild(newtd_pppValue);
    newtr.appendChild(newtd_kgValue);
    newtr.appendChild(newtd_price);
    newtr.appendChild(deleteIcon);

    this.tbody.nativeElement.appendChild(newtr);
    this.ppkgvalue=""
    this.totalkgvalue=""
    this.pricevalue=""

  }


  DeleteClick(tr: HTMLElement) {
    console.log('Clicked on span:', tr.textContent);
    tr.remove();
  }

  savesales() {
    var datalist = [];
    var rowLength = this.tbody.nativeElement.rows.length;
    var rowsdata = this.tbody.nativeElement.rows;

    if (rowLength > 0) {
      for (var i = 0, iLen = rowLength; i < iLen; i++) {
        var datachildlist: any[] = [];
        const row = rowsdata[i];
        for (var j = 0, jLen = row.childNodes.length; j < jLen; j++) {
          datachildlist.push(row.childNodes[j].innerHTML);
        }

        datachildlist.pop();
        datachildlist.push(Date.now())
        datachildlist.push("Justin")

        console.log(datachildlist)
        datalist.push(this.arr_to_json(datachildlist));

      }
      this.apiService.addsales(datalist).subscribe((data: any) => {
      })
      this.tbody.nativeElement.innerHTML = "";
      alert("Saved to DB")
    }
    else {
      alert("No Records")
    }

  }

  arr_to_json(arr: any[]) {
    const datajson = {
      "billId": "12513",
      "types": "Org",
      "productName": "",
      "productSubName": "",
      "totalKg": "",
      "ppKg": "",
      "mrp": "",
      "notes": "",
      "totalPrice": "",
      "createdBy": "John Doe",
      "createdAt": "2024-03-17T12:00:00"

    };
    datajson.productName = arr[0];
    datajson.productSubName = arr[1];
    datajson.ppKg = arr[2];
    datajson.totalKg = arr[3];
    datajson.totalPrice = arr[4];
    datajson.createdAt = arr[5];
    datajson.createdBy = arr[6];

    return datajson;
  }

}
