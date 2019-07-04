import {Component, OnInit} from '@angular/core';
import {HostelsModel} from "../hostels.model";
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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

  initForm() {
    this.hostelForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      director: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      stars: [0, [Validators.required]],
      roomNumber: [0, [Validators.required]],
      pool: [false, [Validators.required]]
    })
  }

  submitForm() {
    console.log(this.hostelForm.value);
    this.postHostel(this.hostelForm.value)
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

  postHostel(hostel: HostelsModel) {
    //CreateToNothing
    return this.afs.collection("hostels").add(hostel)
  }
}
