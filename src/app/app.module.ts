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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

// Component Imports
import { AppComponent } from './app.component';
import { SimulationTabComponent } from './components/tabs/simulation-tab/simulation-tab.component';
import { EnvironmentTabComponent } from './components/tabs/environment-tab/environment-tab.component';
import { EntitiesTabComponent } from './components/tabs/entities-tab/entities-tab.component';
import { SimulationComponent } from './components/simulation/simulation.component';
import { EnvironmentComponent } from './components/environment/environment.component';
import { EnvironmentDetailComponent } from './components/environment-detail/environment-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    SimulationTabComponent,
    EnvironmentTabComponent,
    EntitiesTabComponent,
    SimulationComponent,
    EnvironmentComponent,
    EnvironmentDetailComponent
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
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
