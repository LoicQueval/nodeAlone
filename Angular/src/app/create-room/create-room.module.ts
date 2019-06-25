import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateRoomComponent} from "./create-room.component";
import {CreateRoomRoutingModule} from "./create-room.routing.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    CreateRoomComponent
  ],
  imports: [
    CommonModule,
    CreateRoomRoutingModule,
    ReactiveFormsModule
  ]
})
export class CreateRoomModule {
}
