/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { computed, Injectable, signal } from "@angular/core";
import { Product } from "./product";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  readonly productCart = signal<Product[]>([]);

  readonly productCartTotal = computed(() => {
    return this.productCart().reduce((total, product) => {
      return total + product.price;
    }, 0);
  });

  private readonly products: Product[] = [
    { name: "Apple", price: 0.99, image: "products/apples.jpg" },
    { name: "Banana", price: 0.59, image: "products/bananas.jpg" },
    { name: "Orange", price: 0.79, image: "products/oranges.jpg" },
    { name: "Milk", price: 3.99, image: "products/milk.jpg" },
    { name: "Bread", price: 2.49, image: "products/bread.jpg" },
    { name: "Eggs", price: 4.99, image: "products/eggs.jpg" },
    { name: "Cheese", price: 5.99, image: "products/cheese.jpg" },
    { name: "Yogurt", price: 1.99, image: "products/yogurt.jpg" },
    { name: "Chicken", price: 7.99, image: "products/chicken.jpg" },
    { name: "Rice", price: 2.99, image: "products/rice.jpg" },
  ];

  getProducts(): Product[] {
    return this.products;
  }
  
  getCart(): Product[] {
    return this.productCart();
  }

  addToCart(product: Product) {
    this.productCart.update((cart) => [...cart, product]);
  }
}
