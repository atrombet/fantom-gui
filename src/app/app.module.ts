// Module Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

// Material Imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// Component Imports
import { AppComponent } from './app.component';
import { SimulationTabComponent } from '@components/tabs/simulation-tab/simulation-tab.component';
import { EnvironmentTabComponent } from '@components/tabs/environment-tab/environment-tab.component';
import { EntitiesTabComponent } from '@components/tabs/entities-tab/entities-tab.component';
import { SimulationComponent } from '@components/simulation/simulation.component';
import { EnvironmentComponent } from '@components/environment/environment.component';
import { EnvironmentTileComponent } from '@components/tabs/environment-tab/environment-tile/environment-tile.component';
import {
  ConfirmModalComponent,
  PageHeaderComponent,
  SectionButtonComponent,
  SubsectionBaseComponent,
  FilePathComponent
} from '@components/shared';
import { GravityGeneralComponent } from '@components/environment/gravity-general/gravity-general.component';
import { AtmosphereGeneralComponent } from '@components/environment/atmosphere-general/atmosphere-general.component';
import { BodyGeneralComponent } from '@components/environment/body-general/body-general.component';
import { WindGeneralComponent } from '@components/environment/wind-general/wind-general.component';
import { EpochGeneralComponent } from '@components/environment/epoch-general/epoch-general.component';

// Constants
import { formFieldAppearance } from './constants';

// Directives
import { DisableControlDirective } from '@directives';

@NgModule({
  declarations: [
    AppComponent,
    SimulationTabComponent,
    EnvironmentTabComponent,
    EntitiesTabComponent,
    SimulationComponent,
    EnvironmentComponent,
    EnvironmentTileComponent,
    ConfirmModalComponent,
    PageHeaderComponent,
    SectionButtonComponent,
    GravityGeneralComponent,
    AtmosphereGeneralComponent,
    BodyGeneralComponent,
    WindGeneralComponent,
    EpochGeneralComponent,
    DisableControlDirective,
    SubsectionBaseComponent,
    FilePathComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatRippleModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatNativeDateModule,
    MatDatepickerModule
  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: formFieldAppearance }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfirmModalComponent
  ]
})
export class AppModule { }
