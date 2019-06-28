import {Component, OnInit} from '@angular/core';
import {HostelsModel, RoomsModel} from "../create-room/rooms.model";
import {map, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.scss']
})
export class ListRoomsComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder
  ) {}

  rooms: RoomsModel[];
  hostels: HostelsModel[];
  roomForm: FormGroup;
  isLoading = false;
  isReading = false;

  ngOnInit(): void {
   // this.initForm();
    this.getHostels();
  }

  getHostels() {
    this.isReading = !this.isReading;
    //Read
    return this.httpClient.get<HostelsModel[]>("http://localhost:4000/hostels")
      .pipe(
        tap(hostels => this.hostels = hostels)
      )
      .subscribe();
  }

  getRooms() {
    this.isReading = !this.isReading;
    //Read
    return this.httpClient.get<RoomsModel[]>("http://localhost:4000/rooms ")
      .pipe(
        tap(rooms => this.rooms = rooms)
      )
      .subscribe();
  }

  getRoomsOfHostelById() {
    this.isReading = !this.isReading;
    //Read
    forkJoin([
      this.httpClient.get("http://localhost:4000/hostels/:id"),
      this.httpClient.get("http://localhost:4000/hostels/:id" + "/rooms"),
    ])
      .pipe(
        map(([hostel, rooms]: [HostelsModel, RoomsModel[]]) => {
          return {...hostel, ...rooms}
        }),
      )
      .subscribe()
  }

  submitForm() {
    console.log(this.roomForm.value);
  }

}
