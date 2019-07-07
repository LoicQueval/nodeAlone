import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {HostelsModel} from "../hostels.model";
import {from, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HostelService {

  constructor(
    private afs: AngularFirestore,
  ) {
  }

  getHostelById$(id: string): Observable<HostelsModel> {
    return this.afs.collection("hostels").doc<HostelsModel>(id).valueChanges()
  }

  updateHostel$(id: string, name: string, roomNumber: number, director: string, stars: number, pool: boolean): Observable<void> {
    return from(this.afs.collection("hostels").doc(id).set(
      {
        name: name,
        roomNumber: roomNumber,
        director: director,
        stars: stars,
        pool: pool,
      },
      {merge: true} // Astuce fait comme un update
    ))
  }

}
