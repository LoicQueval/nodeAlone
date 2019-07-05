 import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
 import {EditRoutingModule} from "./edit.routing.module";
 import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    EditRoutingModule,
    ReactiveFormsModule,
  ]
})
export class EditModule { }
