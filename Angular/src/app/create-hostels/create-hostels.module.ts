import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CreateHostelsComponent} from "./create-hostels.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {CreateHostelsRoutingModule} from "./create-hostels.routing.module";



@NgModule({
  declarations: [
    CreateHostelsComponent,
  ],
  imports: [
    CommonModule,
    CreateHostelsRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class CreateHostelsModule { }
