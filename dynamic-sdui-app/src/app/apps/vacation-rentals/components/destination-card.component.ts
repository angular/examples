import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { ChatService } from '../../../chat/chat.service';

@Component({
  selector: 'app-destination-card',
  standalone: true,
  imports: [],
  templateUrl: './destination-card.component.html',
  styleUrls: ['./destination-card.component.css'],
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
