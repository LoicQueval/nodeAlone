import {Component, OnInit} from '@angular/core';
import {HostelsModel} from "../hostels.model";
import {HttpClient} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/firestore";
import {tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  isReading = false;
  hostels: HostelsModel[];
  id: string;

  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.getHostels()
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
}
