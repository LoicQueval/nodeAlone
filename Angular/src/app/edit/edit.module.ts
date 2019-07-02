 import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
 import {EditRoutingModule} from "./edit.routing.module";

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    EditRoutingModule
  ]
})
export class EditModule { }
