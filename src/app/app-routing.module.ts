import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimulationComponent } from '@components/simulation/simulation.component';
import { EnvironmentComponent } from '@components/environment/environment.component';
import { GravityGeneralComponent } from '@components/environment/gravity-general/gravity-general.component';
import { AtmosphereGeneralComponent } from '@components/environment/atmosphere-general/atmosphere-general.component';
import { BodyGeneralComponent } from '@components/environment/body-general/body-general.component';
import { WindGeneralComponent } from '@components/environment/wind-general/wind-general.component';
import { EpochGeneralComponent } from '@components/environment/epoch-general/epoch-general.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/simulation' },
  { path: 'simulation', component: SimulationComponent },
  { path: 'environment', children: [
    { path: '', component: EnvironmentComponent },
    { path: ':id', component: EnvironmentComponent }
  ]},
  { path: 'gravity_general', component: GravityGeneralComponent, outlet: 'page' },
  { path: 'atmosphere_general', component: AtmosphereGeneralComponent, outlet: 'page' },
  { path: 'body_general', component: BodyGeneralComponent, outlet: 'page' },
  { path: 'wind_general', component: WindGeneralComponent, outlet: 'page' },
  { path: 'epoch_general', component: EpochGeneralComponent, outlet: 'page' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
