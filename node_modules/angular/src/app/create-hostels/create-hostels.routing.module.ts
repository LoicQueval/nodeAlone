import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateHostelsComponent} from "./create-hostels.component";


const routes: Routes = [
  {
    path: '',
    component: CreateHostelsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateHostelsRoutingModule { }
