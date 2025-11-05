/*!
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */
import { Routes } from '@angular/router';
import { Base } from './base-components/base.component';
import { MagicAiComponent } from './magic-ai/magic-ai-container.component';
import { FavoritesListComponent } from './apps/vacation-rentals/components/favorites-list.component';
import { ShowcaseDirectoryComponent } from './showcase/showcase-directory.component'

export const routes: Routes = [
    { 
        path: '', 
        component: Base,
        children: [
            { path: '', redirectTo: '/magic/0', pathMatch: 'full' },
            { path: 'magic', redirectTo: '/magic/0', pathMatch: 'full' },
            { path: 'magic/:index', component: MagicAiComponent },
            { path: 'favorites', component: FavoritesListComponent },
        ]
    },
    { path: 'showcase', component: ShowcaseDirectoryComponent },
    { path: 'showcase/adev-docs', loadComponent:() => import('./apps/adev-docs/components/component-showcase.component').then(c => c.AdevDocsComponentShowcaseComponent) },
    { path: 'showcase/haven', loadComponent: () => import('./apps/vacation-rentals/components/component-showcase.component').then(c => c.ComponentShowcaseComponent) },
    { path: 'showcase/magic-bookstore', loadComponent: () => import('./apps/magic-bookstore/magic-bookstore-showcase.component').then(c => c.MagicBookstoreShowcaseComponent) },
];
