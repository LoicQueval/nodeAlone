import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http"; //Requête avec Node
import {HostelsModel} from "../hostels.model"; //Models
import {tap} from "rxjs/operators"; //Observable
import {FormBuilder, FormGroup, Validators} from "@angular/forms"; //Formulaire
import {AngularFirestore} from "@angular/fire/firestore";


@Component({
  selector: 'app-hostels',
  templateUrl: './create-hostels.component.html',
  styleUrls: ['./create-hostels.component.scss']
})
export class CreateHostelsComponent {

  hostels: HostelsModel[];
  hostelForm: FormGroup;
  isLoading = false;
  isReading = false;

  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private afs: AngularFirestore,
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

  ngOnInit(): void {
    this.initForm();
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

  getHostels() {
    this.isReading = !this.isReading;
    //Read
    return this.afs.collection<HostelsModel>("hostels").valueChanges()
      .pipe(
        tap(hostels => this.hostels = hostels)
      )
      .subscribe();
  }

  postHostel(hostel: HostelsModel) {
    //CreateToNothing
    return this.afs.collection("hostels").add(hostel)
  }

  deleteById(hostel : HostelsModel) {
    //Delete
  return this.afs.collection("hostels").doc(hostel.uid).delete()
  }

  test4(hostel: HostelsModel) {
    //Update
    return this.afs.collection("hostels").doc(hostel.uid).set(hostel)
  }

  test5(hostel: HostelsModel) {
    //CreateToSomething
    return this.afs.collection("hostels").doc(hostel.uid).update(hostel)
  }
}
