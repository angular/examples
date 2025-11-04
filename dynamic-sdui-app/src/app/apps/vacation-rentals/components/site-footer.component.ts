/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type FooterLink = {
  text: string;
  url: string;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

export type SocialLink = {
  platform: 'facebook' | 'instagram' | 'twitter';
  url: string;
};

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [],
  templateUrl: './site-footer.component.html',
  styleUrls: ['./site-footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooterComponent {
  linkColumns = input<FooterColumn[]>([]);
  socialLinks = input<SocialLink[]>([]);
}
