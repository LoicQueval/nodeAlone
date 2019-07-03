import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {map, tap} from "rxjs/operators";
import {HostelsModel, RoomsModel} from "./rooms.model";
import {forkJoin} from "rxjs";
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
    this.postRoom(this.roomForm.value)
  }

  getRooms() {
    this.isReading = !this.isReading;
    //Read
    return  this.afs.collection<HostelsModel>("rooms").valueChanges()
      .pipe(
        tap(rooms => this.rooms = rooms)
      )
      .subscribe();
  }

  getHostels() {
    this.isReading = !this.isReading;
    //Read
    return  this.afs.collection<HostelsModel>("hostels").valueChanges()
      .pipe(
        tap(hostels => this.hostels = hostels)
      )
      .subscribe();
  }

  postRoom(room: RoomsModel) {
    //CreateToNothing
    this.isLoading = true;
    this.httpClient.post<RoomsModel[]>('http://localhost:4000/rooms', room)
      .pipe(
        tap(() => this.isLoading = false)
      )
      .subscribe();
  }

  deleteById(room: RoomsModel) {
    //Delete
    return this.httpClient.delete<RoomsModel[]>('http://localhost:4000/sup2/' + room.uid)
      .pipe()
      .subscribe();
  }
}
