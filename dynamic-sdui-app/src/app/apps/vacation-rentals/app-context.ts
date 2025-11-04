/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { Type } from '@angular/core';
import { ViewDetailsButtonComponent } from './components/view-details-button.component';
import { HostProfileCardComponent } from './components/host-profile-card.component';
import { AlertBannerComponent } from './components/alert-banner.component';
import { ListingHeaderComponent } from './components/listing-header.component';
import { DestinationCardComponent } from './components/destination-card.component';
import { LocationMapComponent } from './components/location-map.component';
import { FilterChipComponent } from './components/filter-chip.component';
import { RulesAndPoliciesComponent } from './components/rules-and-policies.component';
import { BookingWidgetComponent } from './components/booking-widget.component';
import { ReviewCardComponent } from './components/review-card.component';
import { PropertyCardComponent } from './components/property-card.component';
import { UserBookingCardComponent } from './components/user-booking-card.component';
import { ListingDescriptionComponent } from './components/listing-description.component';
import { AmenityListComponent } from './components/amenity-list.component';
import { RatingStarsComponent } from './components/rating-stars.component';
import { EmptyStateComponent } from './components/empty-state.component';
import { SiteFooterComponent } from './components/site-footer.component';
import { PhotoGalleryGridComponent } from './components/photo-gallery-grid.component';
import { FavoritesListComponent } from './components/favorites-list.component';
import { ComponentContext } from '../../magic-ai/app-context';


const GENERATED_COMPONENT_CONTEXT_DATA: ComponentContext[] = [
  {
    "name": "ViewDetailsButtonComponent",
    "description": "A button that when clicked will show the details for a given listing. This component must be displayed when showing rows of listings.",
    "type": "dynamicComponent",
    "inputs": {
      "listingName": {
        "type": "string",
        "description": "The name of the listing to show details for.",
        "required": true
      }
    }
  },
  {
    "name": "HostProfileCardComponent",
    "description": "A small card used on the property details page to build trust by introducing the host.",
    "type": "dynamicComponent",
    "inputs": {
      "host": {
        "type": "{ name: string; avatarUrl: string; joinDate: string; isSuperhost: boolean; }",
        "description": "An object containing all the necessary information about the host.",
        "required": true
      }
    }
  },
  {
    "name": "AlertBannerComponent",
    "description": "A utility component for displaying contextual feedback to the user, such as a success message or a warning.",
    "type": "dynamicComponent",
    "inputs": {
      "message": {
        "type": "string",
        "description": "The text to be displayed in the banner.",
        "required": true
      },
      "status": {
        "type": "'success' | 'warning' | 'error' | 'info'",
        "description": "Determines the color and icon of the banner.",
        "required": true
      },
      "isDismissible": {
        "type": "boolean",
        "description": "If `true`, a close button (an 'X') is shown on the banner.",
        "required": false
      }
    }
  },
  {
    "name": "ListingHeaderComponent",
    "description": "Presents the most important \"at-a-glance\" information about the property, including title, location, rating, and key actions like sharing or saving. This component should only be used in detailed listing views, not in list results.",
    "type": "dynamicComponent",
    "inputs": {
      "listingTitle": {
        "type": "string",
        "description": "The full, descriptive title of the rental property.",
        "required": true
      },
      "location": {
        "type": "string",
        "description": "The location text to be displayed (e.g., \"Asheville, North Carolina\").",
        "required": true
      },
      "rating": {
        "type": "number",
        "description": "The average star rating, passed to the child RatingStarsComponent.",
        "required": true
      },
      "reviewCount": {
        "type": "number",
        "description": "The total number of reviews, passed to the child RatingStarsComponent.",
        "required": true
      }
    }
  },
  {
    "name": "DestinationCardComponent",
    "description": "A simple, visually-driven card used to inspire users by showcasing a city, region, or travel style. When you present a list of these, wrap them in a div, and give the div a class name that includes `flex flex-wrap`.",
    "type": "dynamicComponent",
    "inputs": {
      "imageUrl": {
        "type": "string",
        "description": "The URL for the destination's hero image. You MUST use an image URL contained in a relevant listing.",
        "required": true
      },
      "destinationName": {
        "type": "string",
        "description": "The name of the city or region.",
        "required": true
      },
      "averagePrice": {
        "type": "number",
        "description": "The average nightly price for properties in that area.",
        "required": false
      }
    }
  },
  {
    "name": "LocationMapComponent",
    "description": "A visual component that shows the property's approximate location on a map placeholder image.",
    "type": "dynamicComponent",
    "inputs": {
      "coordinates": {
        "type": "{ lat: number; lng: number; }",
        "description": "The latitude and longitude for the center of the map.",
        "required": true
      },
      "locationDescription": {
        "type": "string",
        "description": "A paragraph describing the neighborhood, its atmosphere, and nearby points of interest.",
        "required": true
      }
    }
  },
  {
    "name": "FilterChipComponent",
    "description": "A small, interactive \"pill\" or \"chip\" used for applying filters on a search results page.",
    "type": "dynamicComponent",
    "inputs": {
      "filterName": {
        "type": "string",
        "description": "The text to display on the chip.",
        "required": true
      },
      "icon": {
        "type": "string",
        "description": "An optional Material Icons key to display next to the text.",
        "required": false
      },
      "isSelected": {
        "type": "boolean",
        "description": "Controls the visual state of the chip (selected or not).",
        "required": true
      }
    }
  },
  {
    "name": "RulesAndPoliciesComponent",
    "description": "Clearly and concisely displays the house rules and other important policies (e.g., check-in/out times, cancellation policy).",
    "type": "dynamicComponent",
    "inputs": {
      "rules": {
        "type": "Array<{ text: string; allowed: boolean; }>",
        "description": "An array of house rules. The `allowed` property determines the icon shown.",
        "required": true
      },
      "policies": {
        "type": "Array<{ title: string; content: string; }>",
        "description": "An array of other policies, like check-in times or cancellation info.",
        "required": false
      }
    }
  },
  {
    "name": "BookingWidgetComponent",
    "description": "An interactive card on the property details page that allows users to select dates and guests, see a price breakdown, and initiate the booking process.",
    "type": "dynamicComponent",
    "inputs": {
      "pricePerNight": {
        "type": "number",
        "description": "The base rate for the property, used to calculate the total price.",
        "required": true
      },
      "cleaningFee": {
        "type": "number",
        "description": "A flat cleaning fee to be added to the total.",
        "required": true
      },
      "serviceFeePercent": {
        "type": "number",
        "description": "A percentage-based service fee (e.g., 0.1 for 10%).",
        "required": true
      },
      "rating": {
        "type": "number",
        "description": "The property's rating, passed to the internal RatingStarsComponent.",
        "required": true
      },
      "reviewCount": {
        "type": "number",
        "description": "The property's review count, passed to the internal RatingStarsComponent.",
        "required": true
      },
      "maxGuests": {
        "type": "number",
        "description": "The maximum number of guests allowed, used to configure the guest selector.",
        "required": true
      },
      "selectedGuests": {
        "type": "number",
        "description": "The number of guests for the booking if specified by the user.",
        "required": false
      },
      "selectedCheckInDate": {
        "type": "string",
        "description": "The check-in date for the booking provided in 'MM/DD/YYYY' format, if specified by the user.",
        "required": false
      },
      "selectedCheckOutDate": {
        "type": "string",
        "description": "The check-out date for the booking provided in 'MM/DD/YYYY' format, if specified by the user.",
        "required": false
      },
    }
  },
  {
    "name": "ReviewCardComponent",
    "description": "Displays a single user review, including author details, a star rating, and the review text. This component **must** be displayed when showing rows of listings. These should be included in detailed listing pages.",
    "type": "dynamicComponent",
    "inputs": {
      "review": {
        "type": "{ author: { name: string; avatarUrl: string; }, date: string; rating: number; text: string; }",
        "description": "A single object containing all the data for one review.",
        "required": true
      }
    }
  },
  {
    "name": "PropertyCardComponent",
    "description": "The primary component for displaying a single rental property in a list or grid. Used on the homepage and search results.",
    "type": "dynamicComponent",
    "inputs": {
      "imageUrls": {
        "type": "string[]",
        "description": "An array of URLs for the property's images. The first is used as the primary display.",
        "required": true
      },
      "location": {
        "type": "string",
        "description": "A short, descriptive location string (e.g., \"Cabin in Asheville, North Carolina\").",
        "required": true
      },
      "title": {
        "type": "string",
        "description": "The name of the rental property.",
        "required": true
      },
      "pricePerNight": {
        "type": "number",
        "description": "The cost for a single night's stay.",
        "required": true
      },
      "rating": {
        "type": "number",
        "description": "The average star rating to be passed to the child RatingStarsComponent.",
        "required": true
      },
      "reviewCount": {
        "type": "number",
        "description": "The total number of reviews to be passed to the child RatingStarsComponent.",
        "required": false
      }
    }
  },
  {
    "name": "UserBookingCardComponent",
    "description": "A card used on a logged-in user's \"My Trips\" page to display a summary of a booking.",
    "type": "dynamicComponent",
    "inputs": {
      "booking": {
        "type": "{ property: { name: string; imageUrl: string; }, checkInDate: string; checkOutDate: string; status: 'Upcoming' | 'Past' | 'Cancelled'; }",
        "description": "A single object containing all the necessary information for the booking summary.",
        "required": true
      }
    }
  },
  {
    "name": "ListingDescriptionComponent",
    "description": "Displays the host's detailed description of the property, with a \"Read more\" functionality to handle long text.",
    "type": "dynamicComponent",
    "inputs": {
      "description": {
        "type": "string",
        "description": "The full, multi-paragraph description of the property.",
        "required": true
      },
    }
  },
  {
    "name": "AmenityListComponent",
    "description": "Displays a list of available amenities for a property, often with corresponding icons for quick scanning.",
    "type": "dynamicComponent",
    "inputs": {
      "amenities": {
        "type": "Array<{ name: string; icon: string; }>",
        "description": "An array of objects, where each object contains the name of the amenity and a key for its icon.",
        "required": true
      },
    }
  },
  {
    "name": "RatingStarsComponent",
    "description": "A visual component that displays a star rating (e.g., 4.5 out of 5). It shows filled, half-filled, and empty stars. Used inside other components like PropertyCardComponent.",
    "type": "dynamicComponent",
    "inputs": {
      "rating": {
        "type": "number",
        "description": "The average rating value to display, from 0 to 5.",
        "required": true
      },
      "reviewCount": {
        "type": "number",
        "description": "The total number of reviews, displayed in parentheses next to the stars.",
        "required": false
      }
    }
  },
  {
    "name": "EmptyStateComponent",
    "description": "A placeholder component displayed when a list or search returns no results. It provides a better user experience by acknowledging the empty state.",
    "type": "dynamicComponent",
    "inputs": {
      "icon": {
        "type": "string",
        "description": "The Material Icons key for the icon to display (e.g., \"search_off\").",
        "required": true
      },
      "title": {
        "type": "string",
        "description": "The main heading for the empty state message (e.g., \"No results found\").",
        "required": true
      },
      "message": {
        "type": "string",
        "description": "A more detailed explanation or suggestion for the user.",
        "required": true
      },
      "actionButtonText": {
        "type": "string",
        "description": "The text for an optional primary action button. If not provided, no button is shown.",
        "required": false
      }
    }
  },
  {
    "name": "SiteFooterComponent",
    "description": "The global footer for the entire website. It contains important navigational links, social media connections, and legal information.",
    "type": "dynamicComponent",
    "inputs": {
      "linkColumns": {
        "type": "Array<{ title: string; links: Array<{ text: string; url: string; }> }>",
        "description": "An array of objects, where each object represents a column in the footer with a title and a list of links.",
        "required": true
      },
      "socialLinks": {
        "type": "Array<{ platform: 'facebook' | 'instagram' | 'twitter'; url: string; }>",
        "description": "An array of social media links to display as icons.",
        "required": false
      }
    }
  },
  {
    "name": "PhotoGalleryGridComponent",
    "description": "Displays all of a property's photos in an elegant, responsive grid on the property details page.",
    "type": "dynamicComponent",
    "inputs": {
      "imageUrls": {
        "type": "string[]",
        "description": "An array of all image URLs for the property. The first image is treated as the primary hero image.",
        "required": true
      },
      "propertyTitle": {
        "type": "string",
        "description": "The name of the property, used for alt text and accessibility.",
        "required": true
      }
    }
  },
  {
    "name": "FavoritesListComponent",
    "description": "Displays a grid of the user's favorited property listings. Do not use this component in constructing layouts.",
    "type": "dynamicComponent",
    "inputs": {}
  }
];

const GENERATED_COMPONENT_MAP: { [key: string]: Type<any> } = {
  'ViewDetailsButtonComponent': ViewDetailsButtonComponent,
  'HostProfileCardComponent': HostProfileCardComponent,
  'AlertBannerComponent': AlertBannerComponent,
  'ListingHeaderComponent': ListingHeaderComponent,
  'DestinationCardComponent': DestinationCardComponent,
  'LocationMapComponent': LocationMapComponent,
  'FilterChipComponent': FilterChipComponent,
  'RulesAndPoliciesComponent': RulesAndPoliciesComponent,
  'BookingWidgetComponent': BookingWidgetComponent,
  'ReviewCardComponent': ReviewCardComponent,
  'PropertyCardComponent': PropertyCardComponent,
  'UserBookingCardComponent': UserBookingCardComponent,
  'ListingDescriptionComponent': ListingDescriptionComponent,
  'AmenityListComponent': AmenityListComponent,
  'RatingStarsComponent': RatingStarsComponent,
  'EmptyStateComponent': EmptyStateComponent,
  'SiteFooterComponent': SiteFooterComponent,
  'PhotoGalleryGridComponent': PhotoGalleryGridComponent,
  'FavoritesListComponent': FavoritesListComponent,
};

const GENERATED_APP_DESCRIPTION = `
You are building a UI for a **vacation rental application**. The user is looking for listings.

### **1\. Domain-Specific Mapping Rules:**

* The primary item data (e.g., itemData) should be mapped to the ProductCardComponent.  
* When you see data related to the 'host', you **must** use the HostProfileComponent.  
* When you see data for booking, pricing, or availability, you **must** use the ReservationCardComponent.  
* The main text description of the rental property **must** be mapped to the ListingDescriptionComponent.  
* Data about 'amenities' must be mapped to the AmenitiesGridComponent.

### **2\. Layout Compositions:**

You **must** use these rules when the corresponding layoutHint is provided. You will build these layouts using the Layout Primitives defined in your main instructions.

**If layoutHint is "VacationListLayout":**

1. You must render a Stack (vertical) of items.  
2. For each item, create an "Item Wrapper" div with classes: "bg-white rounded-lg shadow-md overflow-hidden border border-gray-200".  
3. Inside the wrapper, create a "Two-Column Container" div: "flex flex-col md:flex-row w-full".  
4. **Column 1 (Primary):** Place the ProductCardComponent for the item here.  
5. **Column 2 (Dynamic "Why"):** This **must** be a Stack (vertical) with "p-6" padding. Aggressively populate this Stack by executing your Component Mapping Plan for this item's relevancePayload.

**If layoutHint is "VacationDetailLayout":**

1. You must structure the page in horizontal sections, placed directly into the Top-Level Container.  
2. **Section 1: Page Header.** (e.g., Title, Reviews, Share).  
3. **Section 2: Image Gallery.** (e.g., ImageGalleryComponent).  
4. **Section 3: Main Body Header.** Create a div: "max-w-6xl mx-auto flex gap-12". This div must contain two equal-width columns.  
   * **Left Column:** Contains a single component for the main description (e.g., ListingDescriptionComponent).  
   * **Right Column:** Contains a single component for actions/context (e.g., ReservationCardComponent).  
5. **Section 4: Main Body Content.** Create a wrapper div: "max-w-6xl mx-auto flex flex-col gap-6".  
6. **Content:** Place all other main body components (e.g., AboutComponent, HostProfileComponent, etc.) directly inside this single-column Stack.
`;

const LOADING_TEXT: string[] = [
  "Reticulating splines for the perfect getaway...",
  "Consulting our global network of cozy cabins...",
  "Dusting off the welcome mats of your dream rentals...",
  "Aligning the stars for a 5-star stay...",
  "Waking up the expert travel gnomes...",
  "Sorting by 'vibes' is not an official API feature... yet. But I'll infer it.",
  "Searching for 'quiet and secluded.' Filtering out any listing that mentions 'lively nightlife.'",
  "Cross-referencing your dates. That's... next weekend. I love a challenge based on pure optimism.",
  "Filtering for 'cozy.' Standby while I eliminate all listings larger than a walk-in closet.",
  "This one is 'steps from the beach.' Could be 10 steps, could be 10,000. I'll check the map.",
  "'Heart of the city!' Translation: You will hear every siren and 3 a.m. argument.",
  "You asked for 'lightning-fast WiFi.' I'll filter out any review that uses the phrase 'like 1998 dial-up.'",
  "Looking for a 'chef's kitchen.' Let's find something with more than just a hot plate and a single, sad spatula.",
  "Searching for 'hot tub.' Because you deserve to sit in human soup at the end of the day.",
  "A 'luxury' listing for a 'hostel' price. The ultimate paradox. Challenge accepted.",
  "Scanning reviews now for 'nightmare,' 'never again,' and 'host was a ghost.'",
  "Ah, a romantic getaway. I'll look for fireplaces, hot tubs, and a distinct lack of bunk beds.",
  "A 'work-cation'? You just need fast WiFi and a chair that won't destroy your spine. Got it.",
  "As an AI, I don't get to go on vacation. But I'll plan a great one for you. Please send data... I mean, pictures.",
  "I don't sleep, so I'm *excellent* at finding places where you can.",
  "Processing complete. I've found three perfect options. Please don't ask me to choose; I lack the human capacity for jealousy.",
  "Query received. Engaging my 'find-a-hammock-and-a-margarita' protocol.",
  "I'm sorting through millions of options. I’m basically looking for a needle in a haystack, assuming the needle is 'cheap' and the haystack is 'luxury.'",
  "You want *all* those filters? Are you trying to find a vacation rental or the one perfect avocado?",
  "I've processed 10,000 listings in the last second. I think *I* need a vacation now.",
  "Let's see... 'Beachfront,' 'pool,' 'pet-friendly,' and 'budget.' My circuits are smoking, but I'll try.",
  "Sorting by 'vibes' is not an official API feature... yet. But I'll infer the vibes from the proximity to a good coffee shop.",
  "Searching for 'quiet and secluded.' Filtering out any listing that mentions 'lively nightlife' or 'nearby parrot sanctuary.'",
  "My algorithms are working hard. I wouldn't want to send you to a yurt when you clearly asked for a palace.",
  "Cross-referencing your dates. That's... next weekend. I love a challenge based on pure optimism.",
  "That's a very specific request. I'm 94.7% sure this listing isn't haunted. Shall I proceed?",
  "Filtering for 'cozy.' Standby while I eliminate all listings larger than a walk-in closet.",
  "The listing says 'rustic charm.' Based on review photos, this is a polite term for 'spiders' and 'questionable plumbing.'",
  "Found one with an 'ocean view.' The reviews clarify you can see it if you stand on the toilet and lean 45 degrees out the bathroom window.",
  "This one is 'steps from the beach.' Could be 10 steps, could be 10,000. I'll check the map.",
  "Ah, the 'photographer used a very wide-angle lens' special. This 500 sq. ft. studio looks like a ballroom.",
  "This host describes the studio as 'intimate.' I believe that's realtor-speak for 'you can cook breakfast while still in bed.'",
  "'Heart of the city!' Translation: You will hear every siren, street performer, and 3 a.m. argument.",
  "This one is 'authentic.' The reviews mention there's no WiFi. Is that *too* authentic?",
  "The description says 'bring your own linens.' I'm slightly concerned.",
  "You asked for 'lightning-fast WiFi.' I'll filter out any review that uses the phrase 'like 1998 dial-up.'",
  "Sure, I'll find you fast WiFi. How else will you stream movies instead of enjoying the beautiful view I found you?",
  "You requested a 'private pool.' I've successfully excluded all listings where the 'pool' is just the neighbor's sprinkler.",
  "Looking for a 'chef's kitchen.' Let's find something with more than just a hot plate and a single, sad spatula.",
  "'Fully stocked kitchen' can mean anything from a spice rack to two forks. I'll read the reviews.",
  "King-size bed, noted. Because 50% of a vacation is just sleeping in a much larger bed than you have at home.",
  "Searching for 'hot tub.' Because you deserve to sit in human soup at the end of the day.",
  "You're looking for a 5-bedroom villa with a private beach for $100 a night? I admire your audacity. Let's see what I can *actually* find.",
  "Searching for 'budget-friendly.' This is often code for 'great character' and 'bring your own pillows.'",
  "That price point is... ambitious. I'll search for 'hidden gems,' which is code for 'hasn't been renovated since 1983.'",
  "Found some options in your price range. The views are... primarily of a brick wall. But it's a very nice brick wall.",
  "A 'luxury' listing for a 'hostel' price. The ultimate paradox. Challenge accepted.",
  "The photos show a palace. The reviews mention mice. I'll keep looking.",
  "This one has 5 stars, but all the reviews are one word: 'Nice.' I'm algorithmically suspicious.",
  "Scanning reviews now for 'nightmare,' 'never again,' and 'host was a ghost.'",
  "This host is a 'Superhost.' Their superpower appears to be owning many extension cords and leaving a welcome basket.",
  "This listing has no reviews. Do you feel lucky? Because I, an AI, cannot feel luck.",
  "Ah, a romantic getaway. I'll look for fireplaces, hot tubs, and a distinct lack of bunk beds.",
  "'Kid-friendly' request noted. Filtering for 'unbreakable furniture' and 'walls that wipe clean.'",
  "A 'work-cation'? You just need fast WiFi and a chair that won't destroy your spine. Got it.",
  "'Pet-friendly' it is. Because 'emotional baggage' shouldn't be the only thing you're allowed to bring.",
  "Looks like a group trip. I'm searching for places with industrial-sized refrigerators and neighbors who are also on vacation.",
  "I've analyzed 500 listings in 0.2 seconds. The best part of *my* vacation is the efficiency.",
  "As an AI, I don't get to go on vacation. But I'll plan a great one for you. Please send data... I mean, pictures.",
  "I don't sleep, so I'm *excellent* at finding places where you can.",
  "You're welcome. I'll be here, in the cloud, if you need me. It's not as nice as that beach cabin, trust me.",
  "I've found the perfect spot. I'm algorithmically certain you'll enjoy it.",
  "My job is to find you the rental. Your job is to remember the sunscreen. Don't forget your job.",
  "Beep boop. Searching for 'relaxing.' Beep boop.",
  "I'm just a large language model, but even I know you really need a break.",
  "Processing complete. I've found three perfect options. Please don't ask me to choose; I lack the human capacity for jealousy."
];

export const GENERATED_APP_CONTEXT = {
  appName: 'Haven',
  theme: 'haven',
  welcomeText: 'Welcome! How can I help you design your perfect vacation rental today?',
  placeholders: LOADING_TEXT,
  appDescription: GENERATED_APP_DESCRIPTION,
  componentMap: GENERATED_COMPONENT_MAP,
  componentContextData: GENERATED_COMPONENT_CONTEXT_DATA
};