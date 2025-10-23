import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

const widgetId = document.body.dataset['widgetId'];
if (widgetId) {
  switch (widgetId) {
    case 'angles-widget':
      import('./app/tools/angles/angles-widget').then(({ AnglesWidget }) => {
        bootstrapApplication(AnglesWidget, appConfig).catch((err) => console.error(err));
      });
      break;

    default:
      throw new Error(`Unknown widget ID: ${widgetId}`);
  }
} else {
  bootstrapApplication(App, appConfig).catch((err) => console.error(err));
}
