// Module Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

// Material Imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// Component Imports
import { AppComponent } from './app.component';
import { SimulationTabComponent } from './components/simulation-tab/simulation-tab.component';
import { EnvironmentTabComponent } from './components/environment-tab/environment-tab.component';
import { EntitiesTabComponent } from './components/entities-tab/entities-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    SimulationTabComponent,
    EnvironmentTabComponent,
    EntitiesTabComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
