import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HostelsComponent} from "./hostels.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HostelsRoutingModule} from "./hostels.routing.module";



@NgModule({
  declarations: [
    HostelsComponent,
  ],
  imports: [
    CommonModule,
    HostelsRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class HostelsModule { }
