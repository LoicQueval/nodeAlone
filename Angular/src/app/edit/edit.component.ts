import {Component, OnInit} from '@angular/core';
import {HostelsModel} from "../hostels.model";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/firestore";
import {tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {from} from "rxjs";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  isReading = false;
  hostels: HostelsModel;
  id: string;
  hostelForm: FormGroup;

  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
  ) {
  }

  get name() {
    return this.hostelForm.get('name')
  }

  get director() {
    return this.hostelForm.get('director')
  }

  get stars() {
    return this.hostelForm.get('stars')
  }

  get roomNumber() {
    return this.hostelForm.get('roomNumber')
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.getHostels();
    this._initForm({});
  }

  private _initForm(hostel: HostelsModel) {
    this.hostelForm = this.fb.group({
      name: [hostel.name, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      director: [hostel.director, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      stars: [hostel.stars, [Validators.required]],
      roomNumber: [hostel.roomNumber, [Validators.required]],
      pool: [hostel.pool, [Validators.required]]
    })
  }

  submitForm() {
    console.log(this.hostelForm.value);
    return this.save()
  }

  getHostels() {
    this.isReading = !this.isReading;
    //Read
    return this.afs.collection("hostels").doc<HostelsModel>(this.id).valueChanges()
      .pipe(
        tap(hostels => this.hostels = hostels),
        tap(() => this._initForm(this.hostels)),
      )
      .subscribe();
  }

  save() {
    //Modifier
    from(this.afs.collection("hostels").doc(this.id).set(
      {
        name: this.hostelForm.value.name,
        roomNumber: this.hostelForm.value.roomNumber,
        director: this.hostelForm.value.director,
        stars: this.hostelForm.value.stars,
        pool: this.hostelForm.value.pool
      },
      {merge: true} // Astuce fait comme un update
    ))
      .subscribe();
  }
}
