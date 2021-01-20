import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimulationComponent } from '@components/simulation/simulation.component';
import { EnvironmentComponent } from '@components/environment/environment.component';
import { GravityGeneralComponent } from '@components/environment/gravity-general/gravity-general.component';
import { AtmosphereGeneralComponent } from '@components/environment/atmosphere-general/atmosphere-general.component';
import { BodyGeneralComponent } from '@components/environment/body-general/body-general.component';
import { WindGeneralComponent } from '@components/environment/wind-general/wind-general.component';
import { EpochGeneralComponent } from '@components/environment/epoch-general/epoch-general.component';
import { FormResolver, ParentIdResolver, PropSourcesResolver } from '@resolvers';
import { EntityComponent } from '@components/entity/entity.component';
import { ItemType } from '@enums';
import { ObjectComponent } from '@components/object/object.component';
import { MassCgComponent } from '@components/object/mass-cg/mass-cg.component';
import { MassInertiaComponent } from '@components/object/mass-inertia/mass-inertia.component';
import { AeroGeneralComponent } from '@components/object/aero-general/aero-general.component';
import { AeroAxiComponent } from '@components/object/aero-axi/aero-axi.component';
import { AeroWindComponent } from '@components/object/aero-wind/aero-wind.component';
import { AeroBodyComponent } from '@components/object/aero-body/aero-body.component';
import { PropGeneralComponent } from '@components/object/prop-general/prop-general.component';
import { MetaGeneralComponent } from '@components/object/meta-general/meta-general.component';
import { InitialGeneralComponent } from '@components/object/initial-general/initial-general.component';
import { InitialPositionComponent } from '@components/object/initial-position/initial-position.component';
import { InitialVelocityComponent } from '@components/object/initial-velocity/initial-velocity.component';
import { InitialOrientationComponent } from '@components/object/initial-orientation/initial-orientation.component';
import { InitialBodyratesComponent } from '@components/object/initial-bodyrates/initial-bodyrates.component';
import { ScriptGeneralComponent } from '@components/object/script-general/script-general.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/simulation' },
  { path: 'simulation', component: SimulationComponent },
  { path: 'environment', data: { itemType: ItemType.Environment }, children: [
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
  { path: 'entity', data: { itemType: ItemType.Entity }, children: [
    { path: '', component: EntityComponent }
  ]},
  { path: 'object', data: { itemType: ItemType.Object }, children: [
    { path: '', component: ObjectComponent },
    { path: ':id', children: [
      { path: '', component: ObjectComponent },
      { path: 'meta_general', component: MetaGeneralComponent, resolve: { form: FormResolver, parentId: ParentIdResolver } },
      { path: 'mass_cg', component: MassCgComponent, resolve: { form: FormResolver } },
      { path: 'mass_inertia', component: MassInertiaComponent, resolve: { form: FormResolver } },
      { path: 'aerodynamics_general', component: AeroGeneralComponent, resolve: { form: FormResolver } },
      { path: 'aerodynamics_axisymmetric', component: AeroAxiComponent, resolve: { form: FormResolver } },
      { path: 'aerodynamics_wind', component: AeroWindComponent, resolve: { form: FormResolver } },
      { path: 'aerodynamics_bodyfixed', component: AeroBodyComponent, resolve: { form: FormResolver } },
      { path: 'propulsion_general', component: PropGeneralComponent, resolve: { form: FormResolver } },
      { path: 'initial_general', component: InitialGeneralComponent, resolve: { form: FormResolver } },
      { path: 'initial_position', component: InitialPositionComponent, resolve: { form: FormResolver } },
      { path: 'initial_velocity', component: InitialVelocityComponent, resolve: { form: FormResolver } },
      { path: 'initial_orientation', component: InitialOrientationComponent, resolve: { form: FormResolver } },
      { path: 'initial_bodyrates', component: InitialBodyratesComponent, resolve: { form: FormResolver } },
      { path: 'script_general', component: ScriptGeneralComponent, resolve: { form: FormResolver, propSources: PropSourcesResolver } }
    ]}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    FormResolver,
    PropSourcesResolver,
    ParentIdResolver
  ]
})
export class AppRoutingModule { }
