import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimulationComponent } from '@components/simulation/simulation.component';
import { EnvironmentComponent } from '@components/environment/environment.component';
import { GravityGeneralComponent } from '@components/environment/gravity-general/gravity-general.component';
import { AtmosphereGeneralComponent } from '@components/environment/atmosphere-general/atmosphere-general.component';
import { BodyGeneralComponent } from '@components/environment/body-general/body-general.component';
import { WindGeneralComponent } from '@components/environment/wind-general/wind-general.component';
import { EpochGeneralComponent } from '@components/environment/epoch-general/epoch-general.component';
import { FormResolver } from '@resolvers';
import { EntityComponent } from '@components/entity/entity.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/simulation' },
  { path: 'simulation', component: SimulationComponent },
  { path: 'environment', data: { tab: 'environment' }, children: [
    { path: '', component: EnvironmentComponent },
    { path: ':id', children: [
      { path: '', component: EnvironmentComponent },
      { path: 'gravity_general', component: GravityGeneralComponent, resolve: { form: FormResolver } },
      { path: 'atmosphere_general', component: AtmosphereGeneralComponent, resolve: { form: FormResolver } },
      { path: 'body_general', component: BodyGeneralComponent, resolve: { form: FormResolver } },
      { path: 'wind_general', component: WindGeneralComponent, resolve: { form: FormResolver } },
      { path: 'epoch_general', component: EpochGeneralComponent, resolve: { form: FormResolver } },
    ]},
  ]},
  { path: 'entity', data: { tab: 'entity' }, children: [
    { path: '', component: EntityComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    FormResolver
  ]
})
export class AppRoutingModule { }
