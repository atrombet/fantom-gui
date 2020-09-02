import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
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
    MatSidenavModule,
    MatButtonModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
