import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MailFeatureComposeComponentModule } from '@xstate-angular-demo/mail/feature-compose';
import { API_URL } from '@xstate-angular-demo/shared/data-access';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MailFeatureComposeComponentModule, BrowserAnimationsModule],
  providers: [{ provide: API_URL, useValue: environment.api_url }],
  bootstrap: [AppComponent],
})
export class AppModule {}
