import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CartComponent } from './cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { MapComponent } from './map/map.component';
import { MapService } from './services/map.service';
import { StoresFilterPipe } from './pipes/stores-filter.pipe';
import { FormsModule } from '@angular/forms';
import { ProductsService } from './services/products.service';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailsComponent,
    NavbarComponent,
    CartComponent,
    MapComponent,
    StoresFilterPipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ProductsService, MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
