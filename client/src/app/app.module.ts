import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { UserService } from './components/admin-user/user.service';
import { CommonModule } from '@angular/common';
import { MongoComponent } from './components/mongo/mongo.component';
import { NotificationsModule } from './shared/notifications/notifications.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NotificationsService } from './shared/notifications/notifications.service';

@NgModule({
    declarations: [
        AppComponent,
        MongoComponent,
    ],
    exports: [],
    providers: [
        provideAnimations(),
        provideHttpClient(),
        importProvidersFrom(MatNativeDateModule),
        UserService,
        NotificationsService,
    ],
    bootstrap: [AppComponent],
    imports: [
      CommonModule,
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      MatButtonModule,
      MatInputModule,
      HttpClientModule,
      MatToolbarModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule,
      NotificationsModule,
      FlexLayoutModule,
    ]
})
export class AppModule { }
