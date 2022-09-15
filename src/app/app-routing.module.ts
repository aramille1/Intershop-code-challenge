import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { MapComponent } from './map/map.component';

const routes: Routes = [
  {
    path: '', component: ProductListComponent
  },
  {
    path: 'products/:id', component: ProductDetailsComponent
  },
  {
    path: 'cart', component: CartComponent
  },
  {
    path: 'stores', component: MapComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
