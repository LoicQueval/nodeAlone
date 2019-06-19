import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListRoomsComponent} from "./list-rooms.component";
import {RouterModule} from "@angular/router";
import {ListRoomsRoutingModule} from "./list-rooms.routing.module";

@NgModule({
  declarations: [
    ListRoomsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ListRoomsRoutingModule
  ]
})
export class ListRoomsModule {
}

