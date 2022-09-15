import { ProductsService } from './../services/products.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../../models/products';
import { CartService } from '../services/cart.service';
import { Observable } from 'rxjs';
import { find } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | any;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productsService: ProductsService
    ) { }

  ngOnInit() {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap.get('id')
    const productIdFromRoute = Number(routeParams);

    // // Retrieve products from productsService
    this.productsService.getProducts().subscribe((products: Product[]) => {
      // Find the product that correspond with the id provided in route.
      this.product = products.find(product => product.id === productIdFromRoute);
    });
  }

  addToCart = (product:Product) => {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }

}
