import { ProductsService } from './services/products.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private productsService: ProductsService){}

  ngOnInit(): void {}
}
