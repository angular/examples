/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import all the generated components
import { RatingStarsComponent } from './rating-stars.component';
import { DestinationCardComponent } from './destination-card.component';
import { HostProfileCardComponent, Host } from './host-profile-card.component';
import { FilterChipComponent } from './filter-chip.component';
import { AlertBannerComponent, AlertStatus } from './alert-banner.component';
import { AmenityListComponent, Amenity } from './amenity-list.component';
import { ReviewCardComponent, Review } from './review-card.component';
import { PhotoGalleryGridComponent } from './photo-gallery-grid.component';
import { PropertyCardComponent } from './property-card.component';
import { BookingWidgetComponent } from './booking-widget.component';
import { ListingHeaderComponent } from './listing-header.component';
import { ListingDescriptionComponent } from './listing-description.component';
import { RulesAndPoliciesComponent, Rule, Policy } from './rules-and-policies.component';
import { LocationMapComponent, Coordinates } from './location-map.component';
import { PaginationComponent } from './pagination.component';
import { EmptyStateComponent } from './empty-state.component';
import { UserBookingCardComponent, Booking } from './user-booking-card.component';
import { SiteFooterComponent, FooterColumn, SocialLink } from './site-footer.component';

@Component({
  selector: 'app-component-showcase',
  standalone: true,
  imports: [
    CommonModule,
    RatingStarsComponent,
    DestinationCardComponent,
    HostProfileCardComponent,
    FilterChipComponent,
    AlertBannerComponent,
    AmenityListComponent,
    ReviewCardComponent,
    PhotoGalleryGridComponent,
    PropertyCardComponent,
    BookingWidgetComponent,
    ListingHeaderComponent,
    ListingDescriptionComponent,
    RulesAndPoliciesComponent,
    LocationMapComponent,
    PaginationComponent,
    EmptyStateComponent,
    UserBookingCardComponent,
    SiteFooterComponent,
  ],
  template: `<div class="showcase-container">
  <header class="showcase-header">
    <h1>Haven Component Showcase</h1>
    <p>A gallery of all available UI components, styled with the "Haven" theme.</p>
  </header>

  <!-- PropertyCardComponent -->
  <section class="component-section">
    <h2>PropertyCardComponent</h2>
    <div class="component-display grid-3">
      @for (prop of properties; track prop.title) {
        <app-property-card [imageUrls]="prop.imageUrls" [location]="prop.location" [title]="prop.title" [pricePerNight]="prop.pricePerNight" [rating]="prop.rating" [reviewCount]="prop.reviewCount" />
      }
    </div>
  </section>

  <!-- RatingStarsComponent -->
  <section class="component-section">
    <h2>RatingStarsComponent</h2>
    <div class="component-display">
      <app-rating-stars [rating]="4.5" [reviewCount]="120" />
      <app-rating-stars [rating]="3" />
      <app-rating-stars [rating]="5" [reviewCount]="88" />
    </div>
  </section>

  <!-- FilterChipComponent -->
  <section class="component-section">
    <h2>FilterChipComponent</h2>
    <div class="component-display">
      <app-filter-chip filterName="Pool" icon="pool" [isSelected]="true" />
      <app-filter-chip filterName="Pet-Friendly" icon="pets" [isSelected]="false" />
      <app-filter-chip filterName="Wifi" icon="wifi" [isSelected]="false" />
      <app-filter-chip filterName="Free parking" [isSelected]="true" />
    </div>
  </section>

  <!-- AlertBannerComponent -->
  <section class="component-section">
    <h2>AlertBannerComponent</h2>
    <div class="component-display column">
      @for (alert of alerts; track alert.status) {
        <app-alert-banner [message]="alert.message" [status]="alert.status" [isDismissible]="true" />
      }
    </div>
  </section>

  <!-- DestinationCardComponent -->
  <section class="component-section">
    <h2>DestinationCardComponent</h2>
    <div class="component-display grid-3">
      @for (dest of destinations; track dest.destinationName) {
        <app-destination-card [imageUrl]="dest.imageUrl" [destinationName]="dest.destinationName" [averagePrice]="dest.averagePrice" />
      }
    </div>
  </section>

  <!-- HostProfileCardComponent -->
  <section class="component-section">
    <h2>HostProfileCardComponent</h2>
    <div class="component-display">
      <app-host-profile-card [host]="superhost" />
    </div>
  </section>

  <!-- AmenityListComponent -->
  <section class="component-section">
    <h2>AmenityListComponent</h2>
    <div class="component-display column amenity-list-wrapper">
      <app-amenity-list [amenities]="amenities" />
    </div>
  </section>

  <!-- ReviewCardComponent -->
  <section class="component-section">
    <h2>ReviewCardComponent</h2>
    <div class="component-display column">
      @for (review of reviews; track review.author.name) {
        <app-review-card [review]="review" />
      }
    </div>
  </section>

  <!-- PhotoGalleryGridComponent -->
  <section class="component-section">
    <h2>PhotoGalleryGridComponent</h2>
    <div class="component-display">
      <app-photo-gallery-grid [imageUrls]="propertyImages" propertyTitle="Modern Mountain Cabin" />
    </div>
  </section>

  <!-- BookingWidgetComponent -->
  <section class="component-section">
    <h2>BookingWidgetComponent</h2>
    <div class="component-display booking-widget-wrapper">
      <app-booking-widget [pricePerNight]="320" [cleaningFee]="50" [serviceFeePercent]="0.1" [rating]="4.8" [reviewCount]="250" [maxGuests]="6" />
    </div>
  </section>

  <!-- ListingHeaderComponent -->
  <section class="component-section">
    <h2>ListingHeaderComponent</h2>
    <div class="component-display column">
      <app-listing-header listingTitle="Stunning Modern Cabin with Mountain Views" location="Asheville, North Carolina" [rating]="4.9" [reviewCount]="150" />
    </div>
  </section>

  <!-- ListingDescriptionComponent -->
  <section class="component-section">
    <h2>ListingDescriptionComponent</h2>
    <div class="component-display column">
      <app-listing-description [description]="listingDescription" />
    </div>
  </section>

  <!-- RulesAndPoliciesComponent -->
  <section class="component-section">
    <h2>RulesAndPoliciesComponent</h2>
    <div class="component-display column">
      <app-rules-and-policies [rules]="houseRules" [policies]="housePolicies" />
    </div>
  </section>

  <!-- LocationMapComponent -->
  <section class="component-section">
    <h2>LocationMapComponent</h2>
    <div class="component-display column">
      <app-location-map [coordinates]="mapLocation" [locationDescription]="'The cabin is located in a quiet, secluded area just 15 minutes from downtown Asheville.'" />
    </div>
  </section>

  <!-- PaginationComponent -->
  <section class="component-section">
    <h2>PaginationComponent</h2>
    <div class="component-display column">
      <app-pagination [currentPage]="3" [totalPages]="10" [itemsPerPage]="10" [totalItems]="98" />
    </div>
  </section>

  <!-- EmptyStateComponent -->
  <section class="component-section">
    <h2>EmptyStateComponent</h2>
    <div class="component-display">
      <app-empty-state icon="search_off" title="No results found" message="Try adjusting your filters or searching for a different location." actionButtonText="Clear all filters" />
    </div>
  </section>

  <!-- UserBookingCardComponent -->
  <section class="component-section">
    <h2>UserBookingCardComponent</h2>
    <div class="component-display column">
      @for (booking of userBookings; track booking.property.name) {
        <app-user-booking-card [booking]="booking" />
      }
    </div>
  </section>

</div>

<!-- SiteFooterComponent -->
<section class="component-section footer-section">
  <h2>SiteFooterComponent</h2>
  <app-site-footer [linkColumns]="footerColumns" [socialLinks]="socials" />
</section>`,
  styles: [`
:host {
  display: block;
  font-family: var(--haven-font-family, sans-serif);
  background-color: var(--haven-bg, #F9F9F9);
  color: var(--haven-text-primary, #222222);
}

.showcase-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--haven-spacing-5, 32px);
}

.showcase-header {
  text-align: center;
  margin-bottom: var(--haven-spacing-6, 48px);
  padding-bottom: var(--haven-spacing-4, 24px);
  border-bottom: var(--haven-border-default, 1px solid #EAEAEA);
}

.showcase-header h1 {
  font-size: var(--haven-text-xxl, 32px);
  font-weight: var(--haven-font-weight-semibold, 600);
  margin: 0 0 var(--haven-spacing-2, 8px) 0;
}

.showcase-header p {
  font-size: var(--haven-text-lg, 18px);
  color: var(--haven-text-secondary, #555555);
  margin: 0;
}

.component-section {
  margin-bottom: var(--haven-spacing-6, 48px);
}

.component-section h2 {
  font-size: var(--haven-text-xl, 24px);
  font-weight: var(--haven-font-weight-semibold, 600);
  margin-bottom: var(--haven-spacing-4, 24px);
  padding-bottom: var(--haven-spacing-3, 16px);
  border-bottom: var(--haven-border-default, 1px solid #EAEAEA);
}

.component-display {
  padding: var(--haven-spacing-4, 24px);
  background-color: var(--haven-surface, #FFFFFF);
  border-radius: var(--haven-border-radius-lg, 12px);
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  gap: var(--haven-spacing-4, 24px);
}

.component-display.column {
  flex-direction: column;
  align-items: stretch;
}

.component-display.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.booking-widget-wrapper {
  max-width: 380px;
  margin: 0 auto;
}

/* Target the amenity list's container specifically to adjust padding */
.amenity-list-wrapper {
  padding-bottom: 0;
}

.footer-section {
  margin-bottom: 0;
  padding: 0 var(--haven-spacing-5, 32px);
}
`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentShowcaseComponent {
  // --- Sample Data ---

  // For DestinationCardComponent
  destinations = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760c0337?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
      destinationName: 'Paris, France',
      averagePrice: 180,
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
      destinationName: 'Kyoto, Japan',
      averagePrice: 220,
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1562533282-4a60f37ba69b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
      destinationName: 'Santorini, Greece',
      averagePrice: 250,
    },
  ];

  // For HostProfileCardComponent
  superhost: Host = {
    name: 'Beatrice',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=128',
    joinDate: '2019',
    isSuperhost: true,
  };

  // For AlertBannerComponent
  alerts: { message: string; status: AlertStatus }[] = [
    { message: 'Your booking was confirmed successfully!', status: 'success' },
    { message: 'These dates are unavailable. Please select a different range.', status: 'warning' },
    { message: 'A network error occurred. Please try again.', status: 'error' },
    { message: 'A new travel advisory has been issued for this area.', status: 'info' },
  ];

  // For AmenityListComponent
  amenities: Amenity[] = [
    { name: 'Wifi', icon: 'wifi' },
    { name: 'Air conditioning', icon: 'ac_unit' },
    { name: 'Pool', icon: 'pool' },
    { name: 'Free parking', icon: 'local_parking' },
    { name: 'Kitchen', icon: 'kitchen' },
    { name: 'TV', icon: 'tv' },
    { name: 'Washer', icon: 'local_laundry_service' },
    { name: 'Pets allowed', icon: 'pets' },
  ];

  // For ReviewCardComponent
  reviews: Review[] = [
    {
      author: { name: 'John Doe', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=128' },
      date: 'October 2025',
      rating: 5,
      text: 'Absolutely stunning cabin with breathtaking views. Everything was clean, modern, and cozy. Beatrice was a fantastic host and gave us great recommendations for local hikes. We will definitely be back!',
    },
    {
      author: { name: 'Jane Smith', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=128' },
      date: 'September 2025',
      rating: 4.5,
      text: 'We had a wonderful stay. The location was perfect, just a short drive from town but felt very private. The only minor issue was the wifi being a bit slow, but it wasn\'t a big deal. Highly recommend.',
    },
  ];

  // For PhotoGalleryGridComponent & PropertyCardComponent
  propertyImages = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1200',
    'https://images.unsplash.com/photo-1600585152915-d208bec867a1?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    'https://images.unsplash.com/photo-1600585153714-e26b5b5a54a7?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
    'https://images.unsplash.com/photo-1600607686527-6fb88629f4c2?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600',
  ];

  // For PropertyCardComponent
  properties = [
    {
      imageUrls: ['https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'],
      location: 'Modern Villa in Bali, Indonesia',
      title: 'Sunset Paradise Villa with Private Pool',
      pricePerNight: 450,
      rating: 4.9,
      reviewCount: 120,
    },
    {
      imageUrls: ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'],
      location: 'Cozy Cabin in Aspen, Colorado',
      title: 'Rustic Mountain Getaway',
      pricePerNight: 320,
      rating: 4.8,
      reviewCount: 250,
    },
    {
      imageUrls: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600'],
      location: 'Urban Loft in New York, New York',
      title: 'Bright and Spacious Soho Loft',
      pricePerNight: 280,
      rating: 4.7,
      reviewCount: 88,
    },
  ];

  // For ListingDescriptionComponent
  listingDescription = `Welcome to "The Overlook," a stunning modern cabin nestled in the heart of the Blue Ridge Mountains.
  
  Enjoy breathtaking panoramic views from the expansive deck, soak in the hot tub under the stars, and cozy up by the fireplace. Our home is designed with comfort and luxury in mind, featuring a fully-equipped gourmet kitchen, high-speed internet, and three spacious bedrooms, each with its own private bathroom.
  
  Whether you're seeking a peaceful retreat or an adventurous mountain getaway, The Overlook is your perfect home base. We are just minutes away from scenic hiking trails and a short drive to the vibrant downtown of Asheville.`;

  // For RulesAndPoliciesComponent
  houseRules: Rule[] = [
    { text: 'No smoking', allowed: false },
    { text: 'Pets allowed', allowed: true },
    { text: 'No parties or events', allowed: false },
    { text: 'Quiet hours after 10:00 PM', allowed: true },
  ];
  housePolicies: Policy[] = [
    { title: 'Check-in', content: 'After 4:00 PM' },
    { title: 'Checkout', content: 'Before 11:00 AM' },
  ];

  // For LocationMapComponent
  mapLocation: Coordinates = { lat: 35.5951, lng: -82.5515 }; // Asheville, NC

  // For UserBookingCardComponent
  userBookings: Booking[] = [
    {
      property: { name: 'Cozy Cabin in Aspen, Colorado', imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600' },
      checkInDate: 'Nov 15, 2025',
      checkOutDate: 'Nov 20, 2025',
      status: 'Upcoming',
    },
    {
      property: { name: 'Sunset Paradise Villa with Private Pool', imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=600' },
      checkInDate: 'Sep 1, 2025',
      checkOutDate: 'Sep 8, 2025',
      status: 'Past',
    },
  ];

  // For SiteFooterComponent
  footerColumns: FooterColumn[] = [
    { title: 'Support', links: [{ text: 'Help Center', url: '#' }, { text: 'Cancellation options', url: '#' }, { text: 'Report a concern', url: '#' }] },
    { title: 'Hosting', links: [{ text: 'Host your home', url: '#' }, { text: 'Host resources', url: '#' }, { text: 'Community forum', url: '#' }] },
    { title: 'Haven', links: [{ text: 'About us', url: '#' }, { text: 'Careers', url: '#' }, { text: 'Newsroom', url: '#' }] },
  ];
  socials: SocialLink[] = [
    { platform: 'facebook', url: '#' },
    { platform: 'twitter', url: '#' },
    { platform: 'instagram', url: '#' },
  ];
}
