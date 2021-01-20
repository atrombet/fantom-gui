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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';



// Component Imports
import { AppComponent } from './app.component';
import { SimulationTabComponent } from '@components/tabs/simulation-tab/simulation-tab.component';
import { EnvironmentTabComponent } from '@components/tabs/environment-tab/environment-tab.component';
import { EntitiesTabComponent } from '@components/tabs/entities-tab/entities-tab.component';
import { SimulationComponent } from '@components/simulation/simulation.component';
import { EnvironmentComponent } from '@components/environment/environment.component';
import {
  ConfirmModalComponent,
  PageHeaderComponent,
  SectionButtonComponent,
  SubsectionBaseComponent,
  FilePathComponent,
  ItemTileComponent,
  ToggleButtonGroupComponent,
  CoefficientTableComponent,
  TwoDimInputTableComponent,
  TwoDimCoefficientTableComponent,
  OneDimCoefficientTableComponent
} from '@components/shared';
import { GravityGeneralComponent } from '@components/environment/gravity-general/gravity-general.component';
import { AtmosphereGeneralComponent } from '@components/environment/atmosphere-general/atmosphere-general.component';
import { BodyGeneralComponent } from '@components/environment/body-general/body-general.component';
import { WindGeneralComponent } from '@components/environment/wind-general/wind-general.component';
import { EpochGeneralComponent } from '@components/environment/epoch-general/epoch-general.component';
import { EntityComponent } from './components/entity/entity.component';
import { ObjectComponent } from './components/object/object.component';
import { MassCgComponent } from './components/object/mass-cg/mass-cg.component';
import { InputTableComponent } from './components/shared/input-table/input-table.component';
import { MassInertiaComponent } from './components/object/mass-inertia/mass-inertia.component';
import { AeroGeneralComponent } from './components/object/aero-general/aero-general.component';
import { AeroAxiComponent } from './components/object/aero-axi/aero-axi.component';
import { AeroWindComponent } from './components/object/aero-wind/aero-wind.component';
import { AeroBodyComponent } from './components/object/aero-body/aero-body.component';

// Constants
import { formFieldAppearance } from './constants';

// Directives
import { DisableControlDirective } from '@directives';
import { PropGeneralComponent } from './components/object/prop-general/prop-general.component';
import { PropSourceComponent } from './components/object/prop-source/prop-source.component';
import { SimpleTileComponent } from './components/shared/simple-tile/simple-tile.component';
import { MetaGeneralComponent } from './components/object/meta-general/meta-general.component';
import { InitialGeneralComponent } from './components/object/initial-general/initial-general.component';
import { InitialPositionComponent } from './components/object/initial-position/initial-position.component';
import { InitialVelocityComponent } from './components/object/initial-velocity/initial-velocity.component';
import { InitialOrientationComponent } from './components/object/initial-orientation/initial-orientation.component';
import { InitialBodyratesComponent } from './components/object/initial-bodyrates/initial-bodyrates.component';
import { ScriptGeneralComponent } from './components/object/script-general/script-general.component';
import { SegmentComponent } from './components/object/segment/segment.component';
import { PropSourceTableComponent } from './components/object/prop-source-table/prop-source-table.component';
import { AeroPageComponent } from './components/object/aero-page/aero-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SimulationTabComponent,
    EnvironmentTabComponent,
    EntitiesTabComponent,
    SimulationComponent,
    EnvironmentComponent,
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
    FilePathComponent,
    EntityComponent,
    ItemTileComponent,
    ObjectComponent,
    MassCgComponent,
    InputTableComponent,
    MassInertiaComponent,
    AeroGeneralComponent,
    AeroAxiComponent,
    AeroWindComponent,
    AeroBodyComponent,
    ToggleButtonGroupComponent,
    CoefficientTableComponent,
    TwoDimInputTableComponent,
    PropGeneralComponent,
    PropSourceComponent,
    SimpleTileComponent,
    MetaGeneralComponent,
    InitialGeneralComponent,
    InitialPositionComponent,
    InitialVelocityComponent,
    InitialOrientationComponent,
    InitialBodyratesComponent,
    ScriptGeneralComponent,
    SegmentComponent,
    PropSourceTableComponent,
    TwoDimCoefficientTableComponent,
    OneDimCoefficientTableComponent,
    AeroPageComponent
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
    MatDatepickerModule,
    MatButtonToggleModule,
    MatListModule
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
