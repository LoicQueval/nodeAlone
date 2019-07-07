import {Component, OnInit} from '@angular/core';
import {HostelsModel, RoomsModel} from "../create-room/rooms.model";
import {map, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {forkJoin} from "rxjs";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-list-rooms',
  templateUrl: './list-rooms.component.html',
  styleUrls: ['./list-rooms.component.scss']
})
export class ListRoomsComponent implements OnInit {

  constructor(
    private httpClient: HttpClient,
    private afs : AngularFirestore,
  ) {
  }

  rooms: RoomsModel[];
  hostels: HostelsModel;
  isReading = false;

  ngOnInit(): void {
    this.getHostels();
    this.getRoomsOfHostelById();

  }

  getHostels() {
    this.isReading = !this.isReading;
    //Read
    return this.afs.collection("hostels").valueChanges()
      .pipe(
        tap(hostels => this.hostels = hostels as HostelsModel)
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
      this.httpClient.get("http://localhost:4000/hostels/GrvlKccrCCBn8tZqT28V"),
      this.httpClient.get("http://localhost:4000/hostels/GrvlKccrCCBn8tZqT28V/rooms"),
    ])
      .pipe(
        map(([hostel, rooms]: [HostelsModel, RoomsModel[]]) => {
          return {...hostel,rooms}
        }),
        tap(x=> console.log(x)),
        tap(hostels => this.hostels = hostels as HostelsModel)
      )
      .subscribe()
  }
}
