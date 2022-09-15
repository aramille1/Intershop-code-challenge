import { Product } from '../../models/products';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items = this.cartService.getItems();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.items =  this.cartService.getItems();
  }

  removeProduct(product:Product){
    // find the index
    let index = this.items.findIndex(e => e.id === product.id);
    if (index !== -1) {
      //remove an item from array with index
      this.items.splice(index, 1);
    }
  }

}
