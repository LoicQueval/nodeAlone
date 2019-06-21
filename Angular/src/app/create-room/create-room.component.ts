import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {tap} from "rxjs/operators";
import {HostelsModel, RoomsModel} from "./rooms.model";

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
    private fb: FormBuilder
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

  get parent() {
    return this.roomForm.get('parent')
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
    return this.httpClient.get<RoomsModel[]>("http://localhost:4000 ")
      .pipe(
        tap(rooms => this.rooms = rooms)
      )
      .subscribe();
  }

  getHostels() {
    this.isReading = !this.isReading;
    //Read
    return this.httpClient.get<HostelsModel[]>("http://localhost:4000")
      .pipe(
        tap(hostels => this.hostels = hostels)
      )
      .subscribe();
  }

  /*
    getRoomsById() {
      this.isReading = !this.isReading;
      //Read
      forkJoin([
        this.httpClient.get<RoomsModel[]>("http://localhost:4000/hostels" + this._father),
        this.httpClient.get<RoomsModel[]>("http://localhost:4000/hostels" + this._father + '/rooms'),
        ])
        .pipe(
          map(([hostel, rooms]: [HostelsModel, RoomsModel[]]) => {return { ...hostel, ...rooms}}),
        )
        .subscribe()
    }
  */

  postRoom(room: RoomsModel) {
    //CreateToNothing
    this.isLoading = true;
    this.httpClient.post<RoomsModel[]>('http://localhost:4000/rooms', room)
      .pipe(
        tap(() => this.isLoading = false)
      )
      .subscribe();
  }
}
