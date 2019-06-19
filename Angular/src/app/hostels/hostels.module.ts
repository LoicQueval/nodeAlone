import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HostelsComponent} from "./hostels.component";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {HostelsRouting} from "./hostels.routing.module";


@NgModule({
  declarations: [
    HostelsComponent,
  ],
  imports: [
    CommonModule,
    HostelsRouting,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class HostelsModule { }
