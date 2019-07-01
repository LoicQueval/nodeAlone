import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'create-room',
    loadChildren: './create-room/create-room.module#CreateRoomModule'
  },
  {
    path: 'create-hostel',
    loadChildren: './create-hostels/create-hostels.module#CreateHostelsModule'
  },
  {
    path: 'list-rooms',
    loadChildren: './list-rooms/list-rooms.module#ListRoomsModule'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
