import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterComponent } from './components/register/register.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService } from './services/user.service';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from './components/logout/logout.component';
import { MeanComponent } from './components/mean/mean.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { TableComponent } from './components/reusable/table/table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { DataPropertyGetterPipe } from './components/reusable/table/data-property-getter.pipe';
import { MongoComponent } from './components/mongo/mongo.component';
import { AngularComponent } from './components/angular-js/angular-js.component';
import { MatTabsModule } from '@angular/material/tabs';
import { JavascriptComponent } from './components/javascript/javascript.component';
import { CornellComponent } from './components/reusable/cornell/cornell.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { AlternativeQuestionComponent } from './components/reusable/alternative-question/alternative-question.component';
import { CardsComponent } from './components/reusable/cards/cards.component';
import { NotificationsService } from './services/notifications.service';
import { NotificationsModule } from './shared/notifications/notifications.module';
import { ExploreComponent } from './pages/explore/explore.component';
import { CreateComponent } from './pages/create/create.component';
import { NgxEditorModule } from 'ngx-editor';
import { CreateObjectComponent } from './pages/create/create-object/create-object.component';
import { CreateItineraryComponent } from './pages/create/create-itinerary/create-itinerary.component';
import { NewCardComponent } from './components/new-card/new-card.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatStepperModule} from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        RegisterComponent,
        LogoutComponent,
        MeanComponent,
        UserDetailsComponent,
        TableComponent,
        DataPropertyGetterPipe,
        MongoComponent,
        AngularComponent,
        JavascriptComponent,
        CornellComponent,

        AlternativeQuestionComponent,
        CardsComponent,
        ExploreComponent,
        CreateComponent,
        CreateObjectComponent,
        CreateItineraryComponent,
        NewCardComponent
    ],
    exports: [
        CardsComponent,
        CornellComponent,
        AlternativeQuestionComponent,
        TableComponent
    ],
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
