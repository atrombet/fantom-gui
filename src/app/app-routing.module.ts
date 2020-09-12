import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimulationComponent } from './components/simulation/simulation.component';
import { EnvironmentComponent } from './components/environment/environment.component';
import { EnvironmentDetailComponent } from './components/environment-detail/environment-detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/simulation' },
  { path: 'simulation', component: SimulationComponent },
  { path: 'environment', component: EnvironmentComponent },
  { path: 'environment/:id', component: EnvironmentDetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
