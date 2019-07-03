import {Component, OnInit} from '@angular/core';
import {HostelsModel} from "../hostels.model";
import {HttpClient} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/firestore";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  isReading = false;
  hostels: HostelsModel[];

  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private afs: AngularFirestore,
  ) {
  }

  getHostels() {
    this.isReading = !this.isReading;
    //Read
    return this.afs.collection<HostelsModel>("hostels").valueChanges()
      .pipe(
        tap(x => console.log(x)),
        tap(hostels => this.hostels = hostels)
      )
      .subscribe();
  }

  ngOnInit() {
    this.getHostels()
  }
}
