import {Component, OnInit} from '@angular/core';
import {HostelsModel} from "../hostels.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/firestore";
import {tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {RoomsModel} from "../create-room/rooms.model";
import {HostelService} from "../services/hostel.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  hostels: HostelsModel;
  rooms: RoomsModel;
  id: string;
  hostelForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private hostelService: HostelService,
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
    //Read
    this.hostelService.getHostelById$(this.id)
      .pipe(
        tap(hostels => this.hostels = hostels),
        tap(() => this._initForm(this.hostels)),
      )
      .subscribe();
  }

  save() {
    //Modifier
    this.hostelService.updateHostel$(this.id, this.hostelForm.value.name, this.hostelForm.value.director, this.hostelForm.value.stars, this.hostelForm.value.roomNumber, this.hostelForm.value.pool)
      .subscribe();
  }
}
