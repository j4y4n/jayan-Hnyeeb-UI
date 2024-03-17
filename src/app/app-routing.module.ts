import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VendorComponent } from './vendor/vendor.component';
import { CreatevendorComponent } from './vendor/createvendor/createvendor.component';
import { VendordetailComponent } from './vendor/vendordetail/vendordetail.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { StockComponent } from './stock/stock.component';


const routes: Routes = [

  { path: '', component: LoginComponent },
  { path: 'home', component: SidenavComponent, children: [
    {
      path:'', component: DashboardComponent
    },
    {
      path:'dashboard', component: DashboardComponent
    },
    {
      path:'vendor', component: VendorComponent , children: [
        
        {
          path:'create' ,component:CreatevendorComponent
        },
        {
          path:'' ,component:VendordetailComponent
        }
        

      
      ]
    },
    {
      path:'purchase', component: PurchaseComponent
    },
    {
      path:'stock',component:StockComponent
    }
  
  ]
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
