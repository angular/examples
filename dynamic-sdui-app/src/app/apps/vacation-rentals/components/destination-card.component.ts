import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ChatService } from '../../../chat/chat.service';

@Component({
  selector: 'app-destination-card',
  standalone: true,
  imports: [],
  template: `<div class="card-container" (click)="findListings()">
  <img [src]="imageUrl()" [alt]="destinationName()" class="background-image" fill priority>
  <div class="overlay"></div>
  <div class="content">
    <h3 class="destination-name">{{ destinationName() }}</h3>
    @if (averagePrice(); as price) {
      <p class="average-price">
        Average price \${{ price }}/night
      </p>
    }
  </div>
</div>`,
  styles: [`
:host {
  display: block;
  cursor: pointer;
  overflow: hidden; /* Ensures the image's corners are rounded */
  border-radius: var(--haven-border-radius-lg, 12px);
  box-shadow: var(--haven-shadow-subtle, 0px 4px 12px rgba(0, 0, 0, 0.05));
  transition: var(--haven-transition-default, all 0.2s ease-in-out);
  width: 275px;
}

:host(:hover) {
  box-shadow: var(--haven-shadow-medium, 0px 6px 16px rgba(0, 0, 0, 0.08));
}

.card-container {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4; /* Creates a portrait orientation */
  display: flex;
  align-items: flex-end; /* Aligns content to the bottom */
  padding: var(--haven-spacing-3, 16px);
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  transition: var(--haven-transition-default, all 0.2s ease-in-out);
}

:host(:hover) .background-image {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 50%);
  z-index: 2;
}

.content {
  position: relative;
  z-index: 3;
  color: var(--haven-surface, #FFFFFF);
}

.destination-name {
  font-family: var(--haven-font-family, sans-serif);
  font-size: var(--haven-text-xl, 24px);
  font-weight: var(--haven-font-weight-semibold, 600);
  line-height: var(--haven-line-height-heading, 1.2);
  margin: 0;
}

.average-price {
  font-family: var(--haven-font-family, sans-serif);
  font-size: var(--haven-text-sm, 14px);
  margin: var(--haven-spacing-1, 4px) 0 0 0;
  opacity: 0.9;
}
`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestinationCardComponent {
  chatService = inject(ChatService);
  imageUrl = input<string>('');
  destinationName = input<string>();
  averagePrice = input<number>();

  findListings(): void {
    console.log('CLICK');
    if (this.destinationName()?.length === 0) return;
    
    this.chatService.addUserPrompt(`Find listings for ${this.destinationName()}`);
  }
}
