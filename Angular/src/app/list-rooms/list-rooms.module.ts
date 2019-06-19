import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListRoomsComponent} from "./list-rooms.component";
import {RouterModule} from "@angular/router";
import {ListRoomsRouting} from "./list-rooms.routing.module";

@NgModule({
  declarations: [
    ListRoomsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ListRoomsRouting
  ]
})
export class ListRoomsModule {
}

