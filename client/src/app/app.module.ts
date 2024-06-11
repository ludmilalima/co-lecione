import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';
import { MongoComponent } from './components/mongo/mongo.component';
import { NotificationsService } from './services/notifications.service';
import { NotificationsModule } from './shared/notifications/notifications.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgxEditorModule } from 'ngx-editor';

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
      NgxEditorModule,
      BrowserAnimationsModule,
      MatButtonModule,
      MatInputModule,
      HttpClientModule,
      MatToolbarModule,
      MatSidenavModule,
      MatIconModule,
      MatListModule,
      MatDialogModule,
      MatCardModule,
      MatExpansionModule,
      MatSnackBarModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatTabsModule,
      MatGridListModule,
      MatRadioModule,
      NotificationsModule,
      FlexLayoutModule,
      MatStepperModule,
      MatFormFieldModule
    ]
})
export class AppModule { }
