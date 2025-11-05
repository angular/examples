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
  template: `<footer class="footer-container">
  <div class="main-content">
    <div class="link-columns">
      @for (column of linkColumns(); track column.title) {
        <div class="link-column">
          <h3>{{ column.title }}</h3>
          <ul>
            @for (link of column.links; track link.text) {
              <li><a [href]="link.url">{{ link.text }}</a></li>
            }
          </ul>
        </div>
      }
    </div>
  </div>
  <div class="bottom-bar">
    <p class="copyright">&copy; {{ 2025 }} Haven. All rights reserved.</p>
    @if (socialLinks(); as socials) {
      <div class="social-links">
        @for (social of socials; track social.platform) {
          <a [href]="social.url" [title]="social.platform">
            <!-- This is a simple way to show icons; a real app might use an SVG icon system -->
            <img [src]="'https://' + social.platform + '.com/favicon.ico'" [alt]="social.platform" width="20" height="20">
          </a>
        }
      </div>
    }
  </div>
</footer>`,
  styles: [`
:host {
  display: block;
  font-family: var(--haven-font-family, sans-serif);
  background-color: var(--haven-text-primary, #222222);
  color: var(--haven-surface, #FFFFFF);
  padding: var(--haven-spacing-6, 48px) var(--haven-spacing-5, 32px) var(--haven-spacing-4, 24px);
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
}

.link-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--haven-spacing-5, 32px);
  padding-bottom: var(--haven-spacing-5, 32px);
}

.link-column h3 {
  font-size: var(--haven-text-base, 16px);
  font-weight: var(--haven-font-weight-semibold, 600);
  margin: 0 0 var(--haven-spacing-3, 16px) 0;
  opacity: 0.9;
}

.link-column ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--haven-spacing-3, 16px);
}

.link-column a {
  color: var(--haven-surface, #FFFFFF);
  text-decoration: none;
  opacity: 0.7;
  transition: var(--haven-transition-default, all 0.2s ease-in-out);
}

.link-column a:hover {
  opacity: 1;
  text-decoration: underline;
}

.bottom-bar {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: var(--haven-spacing-4, 24px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--haven-text-sm, 14px);
  opacity: 0.7;
}

.social-links {
  display: flex;
  align-items: center;
  gap: var(--haven-spacing-4, 24px);
}

.social-links a {
  opacity: 0.7;
  transition: var(--haven-transition-default, all 0.2s ease-in-out);
}

.social-links a:hover {
  opacity: 1;
}

.social-links img {
  filter: invert(1); /* Makes the favicons white */
}
`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SiteFooterComponent {
  linkColumns = input<FooterColumn[]>([]);
  socialLinks = input<SocialLink[]>([]);
}
