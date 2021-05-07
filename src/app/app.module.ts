import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthModule} from './auth/auth.module';
import {environment} from '../environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {RegisterEffect} from './auth/store/effects/register.effect';
import {TopBarModule} from './shared/modules/topBar/topBar.module';
import {FormsModule} from '@angular/forms';
import {PersistanceService} from './shared/services/persistance.service';
import {AuthInterceptor} from './shared/services/authInterceptor.service';
import {GlobalFeedModule} from './globalFeed/globalFeed.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, AppRoutingModule, AuthModule,
    GlobalFeedModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    TopBarModule,
    HttpClientModule,
    EffectsModule.forRoot([]), FormsModule,
  ],
  providers: [PersistanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
