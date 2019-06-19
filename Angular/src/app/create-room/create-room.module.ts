import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateRoomComponent} from "./create-room.component";
import {CreateRoomRouting} from "./create-room.routing.module";

@NgModule({
  declarations: [
    CreateRoomComponent
  ],
  imports: [
    CommonModule,
    CreateRoomRouting
  ]
})
export class CreateRoomModule {
}
