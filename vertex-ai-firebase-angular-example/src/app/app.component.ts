/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Component, effect, ElementRef, inject, signal, viewChild } from "@angular/core";
import { Product } from "./product";
import { ProductService } from "./product.service";
import { CurrencyPipe, NgOptimizedImage } from "@angular/common";
import { Message } from "./message";
import { AiService } from "./ai.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CurrencyPipe, NgOptimizedImage],
  template: `
    <header class="page-header">
      <h1>NG-STORE</h1>
      <p>
        Cart: {{ products.productCart().length }} - 
        {{ products.productCartTotal() | currency }}
      </p>
    </header>
    <section class="container">
      <section class="product-listing">
        <ul>
          @for(product of productList(); track product.name){
          <li class="product-card">
            <img class="product-image" [ngSrc]="product.image" alt="{{ product.name }}"width="150" height="214" />
            <div class="product-info">
              <p class="product-price">{{ product.price | currency }}</p>
              <p class="product-name">{{ product.name }}</p>
              <button (click)="addToCart(product)" class="add-to-cart-btn">
                Add to Cart
              </button>
            </div>
          </li>
          }
        </ul>
      </section>
      <section class="agent-window">
        <section class="chat-history" #chatHistoryContainer>
            @for(message of messageHistory(); track message){
            <p class="{{ message.sender }}-message">{{ message.text }}</p>
            }
        </section>
        <div class="control-sections">
          <label for="user-question" #scroll>
            <p class="user-question-label">Ask the shopping helper a question</p>
            <input
            id="user-question"
            class="chat-input"
            (keyup.enter)="submitMessage(questionInput)"
            type="text"
            #questionInput
            />
          </label>
            <button class="submit-btn" (click)="submitMessage(questionInput)">Send</button>
        </div>
      </section>
    </section>
  `,
  styleUrl: "./app.component.css",
})
export class AppComponent {
  private readonly ai = inject(AiService);
  readonly products = inject(ProductService);
  readonly messageHistory = signal<Message[]>([]);
  readonly productList = signal<Product[]>([]);
  
  private readonly chatHistoryContainer = viewChild<ElementRef>("chatHistoryContainer");

  private readonly scrollEffect = effect(() => {
    if (this.messageHistory().length > 0) {
      const container = this.chatHistoryContainer();

      if (container) {
        container.nativeElement.scrollTo(0, container.nativeElement.scrollHeight + 600);
      }
    }
  });
  
  constructor() {
    this.productList.set(this.products.getProducts());
  }

  addToCart(product: Product) {
    this.products.addToCart(product);
  }

  async submitMessage(msg: HTMLInputElement) {
    const question = msg.value;

    if (!question) return;

    msg.value = "";
    
    this.messageHistory.update((history) => [
      ...history,
      { sender: "user", text: question },
    ]);

    const response = await this.ai.ask(question);
    this.messageHistory.update((history) => [
        ...history,
        { sender: "agent", text: response },
    ]);
  }
}
