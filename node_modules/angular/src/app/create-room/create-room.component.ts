import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {tap} from "rxjs/operators";
import {HostelsModel, RoomsModel} from "./rooms.model";
import {AngularFirestore} from "@angular/fire/firestore";

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent {

  rooms: RoomsModel[];
  hostels: HostelsModel[];
  roomForm: FormGroup;
  isLoading = false;
  isReading = false;

  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder,
    private afs: AngularFirestore
  ) {
  }

  get name() {
    return this.roomForm.get('name')
  }

  get peopleName() {
    return this.roomForm.get('peopleName')
  }

  get size() {
    return this.roomForm.get('size')
  }

  ngOnInit(): void {
    this.initForm();
    this.getHostels();
  }

  initForm() {
    this.roomForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      peopleName: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      size: [0, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      parent: ["", [Validators.required]]
    })
  }

  submitForm() {
    console.log(this.roomForm.value);
    this.postRoom(this.roomForm.value);
    this.isLoading = !this.isLoading
  }

  getRooms() {
    this.isReading = !this.isReading;
    //Read
    return this.afs.collection<RoomsModel>("rooms").valueChanges()
      .pipe(
        tap(rooms => this.rooms = rooms)
      )
      .subscribe();
  }

  getHostels() {
    //Read
    return this.afs.collection<HostelsModel>("hostels").valueChanges()
      .pipe(
        tap(hostels => this.hostels = hostels)
      )
      .subscribe();
  }

  postRoom(room: RoomsModel) {
    this.isLoading = true;
    //CreateToNothing
    return this.afs.collection("rooms").add(room);
  }

  deleteById(room: RoomsModel) {
    //Delete
    return this.afs.collection("rooms").doc(room.uid).delete()
  }
}
